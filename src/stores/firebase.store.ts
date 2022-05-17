import { initializeApp } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
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

export const cloudStore = {
  onBoughtSnapshot: (callback: (boughtItemsNames: string[]) => void) => {
    return onSnapshot(collection(db, 'bought'), collection => {
      callback(collection.docs.map(doc => doc.id));
    });
  },
  async buyItem(itemName: string) {
    await setDoc(doc(db, 'bought', itemName), {});
  },
  async undoBuyingItem(itemName: string) {
    await deleteDoc(doc(db, 'bought', itemName));
  },
  async resetBuying() {
    const querySnapshot = await getDocs(collection(db, 'bought'));
    querySnapshot.forEach(document => {
      deleteDoc(doc(db, 'bought', document.id));
    });
  },
};
