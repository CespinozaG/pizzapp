import React from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';


const MainScreen= ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{ alignItems: 'center', paddingBottom: 20, paddingTop: 50 }}>
        <Text style={styles.paragraph}>Bienvenido a PizzApp</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={styles.card}>
          <TouchableOpacity  onPress={() => navigation.navigate('Pizzas')}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://web.didiglobal.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2Fn7hs0hadu6ro%2F7cYJRDYk9p5kcLDzodLAtD%2F99866aedbbfc44cede440507e7d3ee20%2FPizza_de_pepperoni_al_horno.png&w=3840&q=75',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.subtitle}>Hacer un pedido</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={styles.card}>
          <TouchableOpacity  onPress={() => navigation.navigate('OrderScreen')}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaHSlyntYRpH0x1r0swNHaSm32DQForIWGlQ&s',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.subtitle}>Ver mis pedidos</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 200,
    marginVertical: 10, 
  },
  paragraph: {
    margin: 24,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e74c3c',
  },
  subtitle: {
    margin: 10,
    fontSize: 26,
    textAlign: 'center',
    color: '#000000',
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
  
});

export default MainScreen;
