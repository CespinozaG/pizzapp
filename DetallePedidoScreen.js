import React, { useState} from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig'; 

export default function DetallePedidoScreen({ route, navigation }) {
    const [user, setUser] = useState({ nombre: '', direccion: '', telefono: '' });
    const [loading, setLoading] = useState(false);

    const { allSelectedItems = {} } = route.params || {};
    const selectedItems = Object.values(allSelectedItems).flat();

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };


    const handleSave = async () => {
        setLoading(true);
        try {
            const pedido = {
                nombre: user.nombre,
                direccion: user.direccion,
                telefono: user.telefono,
                productos: selectedItems, 
                total: calculateTotal(),  
                fecha: new Date(),         
            };

          
            await addDoc(collection(db, "pedidos"), pedido);

            navigation.navigate('MainScreen');
        } catch (error) {
            console.error("Error al guardar el pedido:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nombre}: {item.cantidad} x ${item.precio} = ${item.cantidad * item.precio}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.productsContainer}>
                <Text style={styles.productsTitle}>Detalles del Pedido</Text>
                <FlatList
                    data={selectedItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.collection}-${item.id}`}
                    ListEmptyComponent={<Text>No hay productos seleccionados.</Text>}
                />
                <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={user.nombre}
                    onChangeText={(text) => setUser({ ...user, nombre: text })}
                    placeholder="Nombre"
                />
                <TextInput
                    style={styles.input}
                    value={user.direccion}
                    onChangeText={(text) => setUser({ ...user, direccion: text })}
                    placeholder="Dirección"
                />
                <TextInput
                    style={styles.input}
                    value={user.telefono}
                    onChangeText={(text) => setUser({ ...user, telefono: text })}
                    placeholder="Teléfono"
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.contenedorAtrasSiguiente}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Atrás</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
                    <Text style={styles.buttonText}>Confirmar Pedido</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    productsContainer: {
        marginBottom: 20,
    },
    productsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingTop: 50,
        textAlign: 'center',
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    formContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
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
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
