import React from 'react';
import PantallaAgregarGeneral from './pantallaAgregarGeneral';
import HomeScreen from './HomeScreen';

const PizzasScreen = ({ navigation }) => {
  return (
    <PantallaAgregarGeneral
      navigation={navigation}
      route={{
        params: {
          collectionNombre: 'pizzas',
          siguientePantalla: 'Adicionales',
          titulo: 'Seleccionar Pizzas',
          allSelectedItems: {} 
        }
      }}
    />
  );
};

export default PizzasScreen;
