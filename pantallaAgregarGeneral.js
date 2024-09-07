import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';

export default function HomeScreen({ navigation, route }) {
  const {collectionNombre,siguientePantalla, titulo} = route.params;
  const [pizzas, setPizzas] = useState([]);
  const [contador, setContador] = useState(0);
  const incrementarCantidad = (id) => {
    setPizzas(pizzas.map(pizza => pizza.id === id ? { ...pizza, cantidad: pizza.cantidad + 1 } : pizza));
  };
  const decrementarCantidad = (id) => {
    setPizzas(pizzas.map(pizza => pizza.id === id && pizza.cantidad > 0 ? { ...pizza, cantidad: pizza.cantidad - 1 } : pizza));
  };


  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionNombre));
        const pizzaList = [];
        querySnapshot.forEach((doc) => {
          pizzaList.push({ id: doc.id, ...doc.data(), cantidad: 0 });
        });
        setPizzas(pizzaList);
      } catch (error) {
        console.error("Error al obtener las pizzas: ", error);
      }
    };

    fetchPizzas();
  }, []);

  const pizzatarjeta = ({ item }) => (
    <View style={styles.pizzaContenedor}>
      <View>
      <View style={styles.cantidadPizzas}>
        <Text style={styles.textoContador}>{item.cantidad}</Text>
      </View>
      </View>
      <Text style={styles.pizzaTitulo}>{item.nombre}</Text>
      <Image
        style={styles.imagenPizzas}
        source={{
          uri: item.imagen,
        }}
      />
      <View style={styles.botonesContenedor}>
        <TouchableOpacity style={styles.botonSumarRestar} onPress={() => decrementarCantidad(item.id)}>
          <Text style={styles.botonSumarRestarTexto}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonSumarRestar} onPress={() => incrementarCantidad(item.id)}>
          <Text style={styles.botonSumarRestarTexto}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Pizzapp</Text>
      <FlatList
        data={pizzas}
        renderItem={pizzatarjeta}
        keyExtractor={item => item.id}
        numColumns={2} 
        ListEmptyComponent={<Text>Cargando...</Text>}
      />
      <View style={styles.contenedorAtrasSiguiente}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Atrás</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(siguientePantalla)} >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
      </View>
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
    fontSize: 25,
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
    flex: 1,
    backgroundColor: '#628df7',
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 30
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
  },
  contenedorAtrasSiguiente:{
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',  
  }
});
