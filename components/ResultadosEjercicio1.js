import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
function ResultadosEjercicio1({ route }) {
    const { pacienteInfo } = route.params;
    const navigation = useNavigation();
    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha)
        const opciones = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return nuevaFecha.toLocaleDateString('es-Es', opciones)
    }
    const handleRegresar = () =>{
        navigation.navigate("Menu")
    }
    return (
        <View>

            <Text style={styles.titulo}>Resultados:{''}</Text>
            <View style={styles.contenedorCard}>
                <View style={styles.contenedorTexto}>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Nombre:</Text><Text>{pacienteInfo.nombres}</Text>
                    </View>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Apellido: </Text><Text>{pacienteInfo.apellidos}</Text>
                    </View>
                </View>
                <View style={styles.contenedorTexto}>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>NIT:</Text><Text>{pacienteInfo.nit}</Text>
                    </View>

                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>DUI: </Text><Text>{pacienteInfo.dui}</Text>
                    </View>
                </View>
                <View style={styles.contenedorTexto}>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Direccion: </Text><Text>{pacienteInfo.direccion}</Text>
                    </View>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Genero:</Text><Text>{pacienteInfo.genero}</Text>
                    </View>
                </View>

                <View style={styles.contenedorTexto}>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Fijo: </Text><Text>{pacienteInfo.numeroTelefonoCasa}</Text>
                    </View>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Móvil: </Text><Text>{pacienteInfo.numeroTelefonoMovil}</Text>
                    </View>
                </View>

                <View style={styles.contenedorTexto}>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Nacimiento:</Text><Text>{formatearFecha(pacienteInfo.fechaNacimiento)}</Text>
                    </View>
                </View>
                <View style={styles.contenedorTexto}>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Correo: </Text><Text>{pacienteInfo.correoElectronico}</Text>
                    </View>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Edad: </Text><Text>{pacienteInfo.edad}</Text>
                    </View>
                </View>
                <View style={styles.contenedorTexto}>
                    <View style={styles.contenedorTextoFila}>
                        <Text style={styles.bold}>Etapa: </Text><Text>{pacienteInfo.etapa}</Text>
                    </View>
                </View>

            </View>
            <Pressable style={styles.btnCalcular}
                onPress={() => { handleRegresar() }} >
                <Text style={styles.btnInfoTexto}>Regresar al menú</Text>
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
        padding: 15,
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
    },

})

export default ResultadosEjercicio1