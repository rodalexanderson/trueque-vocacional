import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  deleteField,
} from "firebase/firestore";

export const getDocRef = (col, id) => doc(db, col, id);
export const getCollectionRef = (col) => collection(db, col);

// add data
export const addData = async (col, data) => {
  const collectionRef = getCollectionRef(col);
  const docRef = await addDoc(collectionRef, data);
  return docRef;
};

//update data
export const updateData = async (col, id, data) => {
  const docRef = getDocRef(col, id);
  await updateDoc(docRef, data);
};

//get data
export const getData = async (col) => {
  const collectionRef = getCollectionRef(col);
  const snapData = await getDocs(collectionRef);
  const data = snapData.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

//get Data by ID
export const getDataById = async (col, id) => {
  const docRef = getDocRef(col, id);
  const snapData = await getDoc(docRef);
  const data = snapData.data();
  return data;
};

//dalete data
export const deleteData = async (col, id) => {
  const docRef = getDocRef(col, id);
  await deleteDoc(docRef);
};

// delete field
export const deleteFieldFromDocument = async (col, id, fieldToDelete) => {
  try {
    const docRef = doc(db, col, id);
    await updateDoc(docRef, {
      [fieldToDelete]: deleteField()
    });
    console.log(`${fieldToDelete} deleted successfully from document with ID ${id}`);
  } catch (error) {
    console.error("Error deleting field:", error);
    throw error;
  }
};


//set Document
export const setDocument = async (col, id, data) => {
  const docRef = getDocRef(col, id);
  const docSnapshot = await setDoc(docRef, data);
  return docSnapshot;
};

//subscribe to data
export const getSubscription = async (col, callback) => {
  const collectionRef = getCollectionRef(col);
  //const unsubscribe = onSnapshot(collectionRef, callback);
  const unsubscribe = await onSnapshot(collectionRef, callback);
  return unsubscribe;
};
