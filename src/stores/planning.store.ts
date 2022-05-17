import { defineStore } from 'pinia';
import type { ShoppingItem, ShoppingList } from '@/types';

function modifyItem(
  items: ShoppingItem[],
  itemName: string,
  mapper: (item: ShoppingItem) => ShoppingItem
) {
  return items.map(item => {
    if (item.name !== itemName) return item;
    return mapper(item);
  });
}

export const usePlanningStore = defineStore({
  id: 'planning',
  state: () => ({
    listNames: [] as ShoppingList[],
    itemsPerList: {} as Record<string, ShoppingItem[]>,
    boughtItemsNames: [] as string[],
  }),
  getters: {
    orderedListNames(state) {
      const listNames = [...state.listNames];
      listNames.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
      return listNames.map(ln => ln.name);
    },
    listItems(state) {
      return (listName: string) => state.itemsPerList[listName] || [];
    },
    itemsToBuy(state) {
      return (listName: string) =>
        this.listItems(listName).filter(
          item => !state.boughtItemsNames.includes(item.name)
        );
    },
    itemsBought(state) {
      return (listName: string) =>
        this.listItems(listName).filter(item =>
          state.boughtItemsNames.includes(item.name)
        );
    },
  },
  actions: {
    addList(name: string) {
      this.listNames = [
        ...this.listNames,
        { name: name, timestamp: new Date().getTime() },
      ];
      this.itemsPerList[name] = [];
    },
    removeList(name: string) {
      this.listNames = this.listNames.filter(list => list.name !== name);
      this.itemsPerList[name] = [];
    },
    clearList(name: string) {
      this.itemsPerList[name] = [];
    },
    clearBoughtFromList(name: string) {
      this.itemsPerList[name] = this.itemsPerList[name].filter(
        item => !this.boughtItemsNames.includes(item.name)
      );
    },
    addItemToList(listName: string, item: ShoppingItem) {
      this.itemsPerList[listName] = [...this.itemsPerList[listName], item];
    },
    removeItemFromList(listName: string, itemName: string) {
      this.itemsPerList[listName] = this.itemsPerList[listName].filter(
        item => item.name !== itemName
      );
    },
    incrementItemQuantity(listName: string, itemName: string) {
      this.itemsPerList[listName] = modifyItem(
        this.itemsPerList[listName],
        itemName,
        item => ({
          ...item,
          quantity: item.quantity + 1,
        })
      );
    },
    decrementItemQuantity(listName: string, itemName: string) {
      this.itemsPerList[listName] = modifyItem(
        this.itemsPerList[listName],
        itemName,
        item => ({
          ...item,
          quantity: item.quantity - 1,
        })
      );
    },
    setBoughtItems(boughtItemsNames: string[]) {
      this.boughtItemsNames = [...boughtItemsNames];
    },
  },
});
