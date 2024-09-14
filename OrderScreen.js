import React, { useState, useEffect } from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebaseConfig'; 

const OrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pedidos'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error('Error obteniendo pedidos: ', e);
      throw e;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders(); 
        setOrders(ordersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const renderProducts = (productos) => {
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return <Text style={styles.productText}>No hay productos.</Text>;
    }

    return productos.map((producto, index) => (
      <Text key={index} style={styles.productText}>
        {producto.nombre}: {producto.cantidad} x ${producto.precio} = ${producto.cantidad * producto.precio}
      </Text>
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity >
        <View style={styles.content}>
          <Text style={styles.orderTitle}>Pedido</Text>
          <Image
            style={styles.image}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/6978/6978255.png',
            }}
          />
        </View>
        <Text style={styles.subtitle}>Nombre: {item.nombre}</Text>
        <Text style={styles.subtitle}>Dirección: {item.direccion}</Text>
        <Text style={styles.subtitle}>Teléfono: {item.telefono}</Text>
        <Text style={styles.subtitle}>Total: {item.total}</Text>
        
     <Text style={styles.subtitle}>Productos:</Text>
        {renderProducts(item.productos)}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', paddingBottom: 20, paddingTop: 0 }}>
        <Text style={styles.paragraph}>Lista de pedidos</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
      <View style={styles.contenedorAtrasSiguiente}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Atrás</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  subtitle: {
    margin: 10,
    fontSize: 14,
    textAlign: 'left',
    color: '#000000',
  },
  productText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
  },
  orderTitle: {
    margin: 10,
    fontSize: 18,
    textAlign: 'left',
    color: '#000000',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contenedorAtrasSiguiente: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#628df7',
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  paragraph: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e74c3c',
  },
});

export default OrderScreen;
