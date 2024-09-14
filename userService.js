import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "pedidos"), userData);
    console.log("Pedido añadido con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error añadiendo Pedido: ", e);
    throw e;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    await updateDoc(doc(db, "users", userId), userData);
    console.log("Pedido actualizado");
  } catch (e) {
    console.error("Error actualizando usuario: ", e);
    throw e;
  }
};

export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "pedidos", userId));
    console.log("Pedido eliminado");
  } catch (e) {
    console.error("Error eliminando Pedido: ", e);
    throw e;
  }
};

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pedidos"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error obteniendo pedidos: ", e);
    throw e;
  }
};