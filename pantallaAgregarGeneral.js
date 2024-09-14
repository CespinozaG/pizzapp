import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';

export default function HomeScreen({ navigation, route }) {
  const {collectionNombre,siguientePantalla, titulo} = route.params;
  const [items, setItems] = useState([]);
  const incrementarCantidad = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item));
  };
  const decrementarCantidad = (id) => {
    setItems(items.map(item => item.id === id && item.cantidad > 0 ? { ...item, cantidad: item.cantidad - 1 } : item));
  };

const handleSiguiente = () => {
  const selectedItems = items.filter(item => item.cantidad > 0).map(item => ({
    ...item,
    collection: collectionNombre, 
  }));
  console.log("Pedido añadido : ", selectedItems);
  const allSelectedItems = route.params?.allSelectedItems || {};


  allSelectedItems[collectionNombre] = selectedItems;

  console.log("Pedido añadido : ", allSelectedItems);

  navigation.navigate(siguientePantalla, { allSelectedItems });
};



  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionNombre));
        const itemList = [];
        querySnapshot.forEach((doc) => {
          itemList.push({ id: doc.id, ...doc.data(), cantidad: 0 });
        });
        setItems(itemList);
      } catch (error) {
        console.error("Error al obtener las pizzas: ", error);
      }
    };

    fetchItems();
  }, []);

  const itemtarjeta = ({ item }) => (
    <View style={styles.itemContenedor}>
      <View>
      <View style={styles.cantidadItems}>
        <Text style={styles.textoContador}>{item.cantidad}</Text>
      </View>
      </View>
      <Text style={styles.itemTitulo}>{item.nombre}</Text>
      <Image
        style={styles.imagenItems}
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
      <Text style={styles.title}>{titulo}</Text>
      <FlatList
        data={items}
        renderItem={itemtarjeta}
        keyExtractor={item => item.id}
        numColumns={2} 
        ListEmptyComponent={<Text>Cargando...</Text>}
      />
      <View style={styles.contenedorAtrasSiguiente}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Atrás</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSiguiente}>
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
  itemContenedor: {
    flex: 1, 
    alignItems: 'center', 
    margin: 10, 
    paddingBottom:30,
    borderRadius:30,
    backgroundColor: '#f8f8f8', 

  },
  itemTitulo: {
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
  imagenItems: {
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
  cantidadItems: {
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
