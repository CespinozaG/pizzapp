import React from 'react';
import PantallaAgregarGeneral from './pantallaAgregarGeneral';
import HomeScreen from './HomeScreen';

const BebidasScreen = ({ navigation }) => {
  return (
    <PantallaAgregarGeneral 
      navigation={navigation} 
      route={{ 
        params: { 
          collectionNombre: 'bebidas',
          siguientePantalla: 'pizzas',
          titulo: 'Bebidas'
        } 
      }}
    />
  );
};

export default BebidasScreen;