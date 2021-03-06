import { cloudStore } from '@/stores/firebase.store';
import type { ShoppingItem, ShoppingList } from '@/types';
import { defineStore } from 'pinia';

export const usePlanningStore = defineStore({
  id: 'planning',
  state: () => ({
    listNames: [] as ShoppingList[],
    itemsPerList: {} as Record<string, ShoppingItem[]>,
    boughtItemsNames: [] as string[],
  }),
  getters: {
    orderedLists(state) {
      const lists: ShoppingList[] = [...state.listNames];
      lists.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
      return lists;
    },
    orderedListNames() {
      const lists: ShoppingList[] = this.orderedLists;
      return lists.map(list => list.name);
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
    setLists(listNames: ShoppingList[]) {
      this.listNames = [...listNames];
    },
    setItems(listName: string, items: ShoppingItem[]) {
      this.itemsPerList[listName] = [...items];
    },
    addItemToList(listName: string, item: ShoppingItem) {
      cloudStore.setItem(listName, item);
    },
    moveListUp(listName: string) {
      const listIndex = this.orderedLists.findIndex(
        list => list.name === listName
      );
      if (listIndex === 0) return;
      cloudStore.updateList(
        listName,
        this.orderedLists[listIndex - 1].timestamp - 1
      );
    },
    moveListDown(listName: string) {
      const listIndex = this.orderedLists.findIndex(
        list => list.name === listName
      );
      if (listIndex === this.orderedLists.length - 1) return;
      cloudStore.updateList(
        listName,
        this.orderedLists[listIndex + 1].timestamp + 1
      );
    },
    removeItemFromList(listName: string, itemName: string) {
      cloudStore.deleteItem(listName, itemName);
    },
    incrementItemQuantity(listName: string, itemName: string) {
      const item = this.itemsPerList[listName].find(i => i.name === itemName);
      if (!item) return;
      cloudStore.setItem(listName, { ...item, quantity: item.quantity + 1 });
    },
    decrementItemQuantity(listName: string, itemName: string) {
      const item = this.itemsPerList[listName].find(i => i.name === itemName);
      if (!item) return;
      cloudStore.setItem(listName, { ...item, quantity: item.quantity - 1 });
    },
    clearList(name: string) {
      this.itemsPerList[name].forEach(item => {
        cloudStore.deleteItem(name, item.name);
      });
    },
    setBoughtItems(boughtItemsNames: string[]) {
      this.boughtItemsNames = [...boughtItemsNames];
    },
    resetBuying() {
      this.boughtItemsNames.forEach(boughtItem => {
        cloudStore.undoBuyingItem(boughtItem);
      });
    },
    clearBoughtFromList(name: string) {
      this.itemsPerList[name]
        .filter(item => this.boughtItemsNames.includes(item.name))
        .forEach(item => cloudStore.deleteItem(name, item.name));
    },
  },
});
