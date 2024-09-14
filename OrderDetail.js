import React from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

const OrderDetail = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{ alignItems: 'center', paddingBottom: 20, paddingTop: 0 }}>
        <Text style={styles.paragraph}>Detalle de pedido</Text>
      </View>
      <View
        style={{
          alignItems: 'left',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={styles.content}>
          <Text style={styles.orderTitle}>Pedido # tal</Text>
          <Image
            style={styles.image}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/6978/6978255.png',
            }}
          />
        </View>
      </View>
      <Text style={styles.subtitle}>Descripcion a detalle:</Text>
      <Text style={styles.subtitle}>Direccion:</Text>
      <Text style={styles.subtitle}>Total:</Text>
      <View style={styles.contenedorAtrasSiguiente}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Atrás</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    alignItems: 'left',
  },
  image: {
    width: 50,
    height: 50,
    marginVertical: 10, // Adds space between the images
  },
  subtitle: {
    margin: 10,
    fontSize: 14,
    textAlign: 'left',
    color: '#000000',
  },
  orderTitle: {
    margin: 10,
    fontSize: 18,
    textAlign: 'left',
    color: '#000000',
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Vertically center the text and image
    justifyContent: 'space-between', // Add space between text and image
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

export default OrderDetail;
