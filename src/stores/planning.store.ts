import { defineStore } from 'pinia';
import type { ShoppingItem, ShoppingList } from '@/types';

function modifyList(
  lists: ShoppingList[],
  listName: string,
  mapper: (list: ShoppingList) => ShoppingList
) {
  return lists.map(list => {
    if (list.name !== listName) return list;
    return mapper(list);
  });
}

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
    lists: [
      {
        name: 'List2',
        items: [],
      },
    ] as ShoppingList[],
    boughtItemsNames: [] as string[],
  }),
  getters: {
    listItems(state) {
      return (listName: string) =>
        state.lists.find(list => list.name === listName)?.items || [];
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
      this.lists = [...this.lists, { name: name, items: [] }];
    },
    removeList(name: string) {
      this.lists = this.lists.filter(list => list.name !== name);
    },
    clearList(name: string) {
      this.lists = modifyList(this.lists, name, list => ({
        ...list,
        items: [],
      }));
    },
    addItemToList(listName: string, item: ShoppingItem) {
      this.lists = modifyList(this.lists, listName, list => {
        const items = [...list.items, item];
        items.sort((a, b) => a.name.localeCompare(b.name));
        return {
          ...list,
          items,
        };
      });
    },
    removeItemFromList(listName: string, itemName: string) {
      this.lists = modifyList(this.lists, listName, list => ({
        ...list,
        items: list.items.filter(item => item.name !== itemName),
      }));
    },
    incrementItemQuantity(listName: string, itemName: string) {
      this.lists = modifyList(this.lists, listName, list => ({
        ...list,
        items: modifyItem(list.items, itemName, item => ({
          ...item,
          quantity: item.quantity + 1,
        })),
      }));
    },
    decrementItemQuantity(listName: string, itemName: string) {
      this.lists = modifyList(this.lists, listName, list => ({
        ...list,
        items: modifyItem(list.items, itemName, item => ({
          ...item,
          quantity: item.quantity - 1,
        })),
      }));
    },
    buyItem(itemName: string) {
      this.boughtItemsNames = [...this.boughtItemsNames, itemName];
    },
    undoBuyingItem(itemName: string) {
      this.boughtItemsNames = this.boughtItemsNames.filter(
        item => item !== itemName
      );
    },
    resetBuying() {
      this.boughtItemsNames = [];
    },
  },
});
