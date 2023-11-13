import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";

function Login() {
    const navigation = useNavigation();
    const handleMenu = () => {
        navigation.navigate("Menu")
    }
    return (
        <View style={styles.contenedorBotonesGrandes}>
            <View style={styles.imagenContenedor}>
                <Image style={styles.imagen} source={require('../imagenes/logo2.png')}/>
            </View>
            <Text style={styles.titulo}>DPS02L Guía de Ejericicios{''}</Text>
            <View style={styles.campo}>
                <Text style={styles.label}>Correo Eléctronico</Text>
                <TextInput style={styles.input} placeholder='Correo electronico'
                /* value={apellidos}
                 onChangeText={setApellidos}*/
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput style={styles.input} placeholder='Contraseña del usuario'
                /* value={apellidos}
                 onChangeText={setApellidos}*/
                />
            </View>

            <Pressable style={styles.btnCalcular}
                onPress={() => { handleMenu() }} >
                <Text style={styles.btnInfoTexto}>Ingresar</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    label: {
        color: 'black',
        marginHorizontal: 3,
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginHorizontal: 1,
        padding: 15,
        marginBottom: 10
    },

    btnCalcular: {
        backgroundColor: 'gold',
        padding: 20,
        marginTop: 20,
        borderRadius: 10
    },
    btnLimpiar: {
        backgroundColor: 'green',
        padding: 15,
        marginTop: 20,
        borderRadius: 10
    },

    btnAtras: {
        backgroundColor: 'transparent',
        padding: 2,
        marginTop: 20,
        borderRadius: 10,
        marginRight: 290
    },
    btnInfoTexto: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase'

    },
    titulo: {
        textAlign: 'center',
        color: 'red',
        fontSize: 20,
        marginBottom: 20,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginTop: 15,
    }, contenedor: {
        marginTop: 32,
        paddingHorizontal: 24,
    }, listadoEmpleados: {
        marginTop: 50,
        marginHorizontal: 30,
    }, listaEmpleados: {
        marginTop: 20,
        textAlign: 'center',
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'blue',
        fontSize: 20,
    }, btnText: {
        padding: 0
    }, imagen: {
        width: 35,
        height: 35,
    },
    contenedorCard: {
        backgroundColor: '#F0F583',
        padding: 20,
        borderBottomColor: '#94A3B8',
        borderBottomWidth: 1,
        marginVertical: 5,
        justifyContent: 'space-between'
    }, contenedorTexto: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    }, bold: {
        fontWeight: 'bold',
    }, contenedorTextoFila: {
        flexDirection: 'row',
    },
    imgini: {
        width: "100%",
        height: 200,
        marginVertical: 5,
        borderRadius: 15,
    }, contenedorBotonesGrandes: {
        flex: 1,
        justifyContent: 'center',
    },imagen: {
        padding: 100,
        width: 100,
        height: 50
    }, imagenContenedor: {
        alignItems: 'center',
        justifyContent: 'center',
      },

})

export default Login