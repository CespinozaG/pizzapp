import React from 'react';
import PantallaAgregarGeneral from './pantallaAgregarGeneral';
import { useRoute } from '@react-navigation/native';

const AdicionalesScreen = ({ navigation }) => {
  const route = useRoute();
  const { allSelectedItems = {} } = route.params || {}; // Obtener `allSelectedItems` desde los parámetros de la ruta

  return (
    <PantallaAgregarGeneral
      navigation={navigation}
      route={{
        params: {
          collectionNombre: 'adicionales',
          siguientePantalla: 'Bebidas',
          titulo: 'Seleccionar Adicionales',
          allSelectedItems: allSelectedItems, // Pasar `allSelectedItems` a `PantallaAgregarGeneral`
        }
      }}
    />
  );
};

export default AdicionalesScreen;
