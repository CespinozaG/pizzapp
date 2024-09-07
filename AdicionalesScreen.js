import React from 'react';
import PantallaAgregarGeneral from './pantallaAgregarGeneral';
import HomeScreen from './HomeScreen';

const AdicionalesScreen = ({ navigation }) => {
  return (
    <PantallaAgregarGeneral 
      navigation={navigation} 
      route={{ 
        params: { 
          collectionNombre: 'adicionales',
          siguientePantalla: 'Bebidas',
          titulo: 'Adicionales',
        } 
      }}
    />
  );
};

export default AdicionalesScreen;