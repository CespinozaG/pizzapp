import React from 'react';
import PantallaAgregarGeneral from './pantallaAgregarGeneral';
import { useRoute } from '@react-navigation/native';

const BebidasScreen = ({ navigation }) => {
  const route = useRoute();
  const { allSelectedItems = {} } = route.params || {}; 

  return (
    <PantallaAgregarGeneral
      navigation={navigation}
      route={{
        params: {
          collectionNombre: 'bebidas',
          siguientePantalla: 'DetallePedido',
          titulo: 'Seleccionar Bebidas',
          allSelectedItems: allSelectedItems, 
        }
      }}
    />
  );
};

export default BebidasScreen;