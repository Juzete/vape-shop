import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "..";

export const addLiquidInDB = async (obj) => {
  try {
    const docRef = await addDoc(collection(db, "liquids"), obj);
    console.log("Doc written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getLiquidsListFromDB = async (setState) => {
  const result = [];
  const querySnapshot = await getDocs(collection(db, "liquids"));
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });
  setState(result);
};
