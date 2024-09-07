import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    console.log("Usuario añadido con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error añadiendo usuario: ", e);
    throw e;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    await updateDoc(doc(db, "users", userId), userData);
    console.log("Usuario actualizado");
  } catch (e) {
    console.error("Error actualizando usuario: ", e);
    throw e;
  }
};

export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log("Usuario eliminado");
  } catch (e) {
    console.error("Error eliminando usuario: ", e);
    throw e;
  }
};

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error obteniendo usuarios: ", e);
    throw e;
  }
};