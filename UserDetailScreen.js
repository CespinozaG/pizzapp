import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { updateUser, addUser, deleteUser } from './userService';

export default function UserDetailScreen({ route, navigation }) {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const userId = route.params?.userId;

  useEffect(() => {
    if (userId) {
      setLoading(true);
      const loadUser = async () => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUser(docSnap.data());
          } else {
            console.log("No se encontró el usuario!");
            // Aquí podrías manejar el caso de usuario no encontrado
          }
        } catch (error) {
          console.error("Error al cargar el usuario:", error);
          // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        } finally {
          setLoading(false);
        }
      };

      loadUser();
    }
  }, [userId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (userId) {
        await updateUser(userId, user);
      } else {
        await addUser(user);
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (userId) {
        await deleteUser(userId);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) => setUser({...user, name: text})}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={user.email}
        onChangeText={(text) => setUser({...user, email: text})}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={user.phone}
        onChangeText={(text) => setUser({...user, phone: text})}
        placeholder="Teléfono"
        keyboardType="phone-pad"
      />
      <Button title="Guardar" onPress={handleSave} disabled={loading} />
      {userId && <Button title="Eliminar" onPress={handleDelete} color="red" disabled={loading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});