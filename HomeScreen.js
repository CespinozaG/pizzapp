import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [pizzas, setPizzas] = useState([]);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pizzas"));
        const pizzaList = [];
        querySnapshot.forEach((doc) => {
          pizzaList.push({ id: doc.id, ...doc.data() });
        });
        setPizzas(pizzaList);
      } catch (error) {
        console.error("Error al obtener las pizzas: ", error);
      }
    };

    fetchPizzas();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.replace('Login');
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  const pizzatarjeta = ({ item }) => (
    <View style={styles.pizzaContenedor}>
      <View>
      <View style={styles.cantidadPizzas}>
        <Text style={styles.textoContador}>0</Text>
      </View>
      </View>
      <Text style={styles.pizzaTitulo}>{item.pizza}</Text>
      <Image
        style={styles.imagenPizzas}
        source={{
          uri: item.imagen,
        }}
      />
      <View style={styles.botonesContenedor}>
        <TouchableOpacity style={styles.botonSumarRestar} onPress={() => setContador(contador - 1)} disabled={contador===0}>
          <Text style={styles.botonSumarRestarTexto}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonSumarRestar} onPress={() => setContador(contador + 1)}>
          <Text style={styles.botonSumarRestarTexto}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la Pizeriapp</Text>
      <FlatList
        data={pizzas}
        renderItem={pizzatarjeta}
        keyExtractor={item => item.id}
        numColumns={2} 
        ListEmptyComponent={<Text>Cargando pizzas...</Text>}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
    textAlign: 'center',
  },
  pizzaContenedor: {
    flex: 1, 
    alignItems: 'center', 
    margin: 10, 
    paddingBottom:30,
    borderRadius:30,
    backgroundColor: '#f8f8f8', 

  },
  pizzaTitulo: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom:10,
  },
  button: {
    backgroundColor: '#1976d2',
    padding: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  imagenPizzas: {
    width: 100,
    height: 100,
    borderRadius: 50, 
  },
  botonesContenedor: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: 100, 
  },
  botonSumarRestar: {
    backgroundColor: '#628df7',
    padding: 5,
    borderRadius: 50,
    width: 40,
    alignItems: 'center',
  },
  botonSumarRestarTexto: {
    color: 'white',
    fontSize: 16,
  },
  cantidadPizzas: {
    position: 'absolute',
    top: -10,
    right: -90,
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#98f4e3',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  textoContador:{
    fontSize : 12,
    fontWeight: 'bold'
  }
});
