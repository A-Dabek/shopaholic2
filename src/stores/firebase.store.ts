import type { ShoppingItem, ShoppingList } from '@/types';
import { initializeApp } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCgY5DET3HhstK6MVtciRXAqK_c1aC6vdU',
  authDomain: 'shopaholic-199f6.firebaseapp.com',
  databaseURL: 'https://shopaholic-199f6.firebaseio.com',
  projectId: 'shopaholic-199f6',
  storageBucket: 'shopaholic-199f6.appspot.com',
  messagingSenderId: '148274201687',
  appId: '1:148274201687:web:fb5fd0eb5452b7edeccf12',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const getListName = (name: string) => `_list_${name}`;

export const cloudStore = {
  onBoughtSnapshot: (callback: (boughtItemsNames: string[]) => void) => {
    return onSnapshot(collection(db, 'bought'), collection => {
      callback(collection.docs.map(doc => doc.id));
    });
  },
  async buyItem(name: string) {
    await setDoc(doc(db, 'bought', name), {});
  },
  async undoBuyingItem(name: string) {
    await deleteDoc(doc(db, 'bought', name));
  },
  onListsSnapshot: (callback: (lists: ShoppingList[]) => void) => {
    return onSnapshot(collection(db, 'lists'), collection => {
      callback(
        collection.docs.map(doc => ({
          name: doc.id,
          timestamp: doc.data().timestamp,
        }))
      );
    });
  },
  async addList(name: string) {
    await setDoc(doc(db, 'lists', name), { timestamp: new Date().getTime() });
  },
  async updateList(name: string, timestamp: number) {
    await setDoc(doc(db, 'lists', name), { timestamp });
  },
  async removeList(name: string) {
    await deleteDoc(doc(db, 'lists', name));
  },
  onItemsSnapshot: (
    listName: string,
    callback: (items: ShoppingItem[]) => void
  ) => {
    return onSnapshot(collection(db, getListName(listName)), collection => {
      callback(
        collection.docs.map(
          doc =>
            ({
              name: doc.id,
              ...doc.data(),
            } as ShoppingItem)
        )
      );
    });
  },
  async deleteItem(listName: string, itemName: string) {
    await deleteDoc(doc(db, getListName(listName), itemName));
  },
  async setItem(listName: string, item: ShoppingItem) {
    await setDoc(doc(db, getListName(listName), item.name), item);
  },
};
