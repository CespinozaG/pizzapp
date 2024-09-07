
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import { auth } from './firebaseConfig'; // Importa auth desde firebaseConfig
import AdicionalesScreen from './AdicionalesScreen';
import PizzasScreen from './PizzasScreen';
import BebidasScreen from './BebidasScreen';
import PruebaRealScreen from './PruebaRealScreen';
import UserListScreen from './UserListScreen';
import UserDetailScreen from './UserDetailScreen';


const Stack = createStackNavigator();

export default function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Adicionales" component={AdicionalesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Pizzas" component={PizzasScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Bebidas" component={BebidasScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Prueba" component={PruebaRealScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserList" component={UserListScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="UserDetail" component={UserDetailScreen} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

