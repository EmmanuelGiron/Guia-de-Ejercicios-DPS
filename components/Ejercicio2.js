import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgUri from 'react-native-svg-uri';
import { useNavigation } from "@react-navigation/native";

function Ejercicio2() {
    const navigation = useNavigation();

    const handleRegresar = () =>{
        navigation.navigate("Menu")
    }

    const limpiarAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            setTipoIp('')
            setContinente('')
            setPais('')
            setCapital('')
            setCodigoPais('')
            setImgPais('')
            setHora('')
            setOrg('')
            setIsp('')
            setDomain('')
            setDatos('')
            setIp('')
            setVerResultado(!verResultado)
        } catch (error) {
            console.error('Error al limpiar AsyncStorage:', error);
        }
    };

    const [ip, setIp] = useState('');
    const [datos, setDatos] = useState('');
    const [ipValida, setIpValido] = useState(false);
    const [verResultado, setVerResultado] = useState(false);

    //Datos obtenidos por la ip
    const [tipoIp, setTipoIp] = useState('');
    const [continente, setContinente] = useState('');
    const [pais, setPais] = useState('');
    const [capital, setCapital] = useState('');
    const [codigoPais, setCodigoPais] = useState('');
    const [imgPais, setImgPais] = useState('');
    const [hora, setHora] = useState('');
    const [org, setOrg] = useState('');
    const [isp, setIsp] = useState('');
    const [domain, setDomain] = useState('');

    const ObtenerDatosDeIP = async (ip) => {
        try {
            console.log(ip)
            const response = await axios.get(`http://ipwho.is/${ip}`);
            AsyncStorage.setItem('tipoip', response.data.type);
            AsyncStorage.setItem('continenteIP', response.data.continent);
            AsyncStorage.setItem('paisIP', response.data.country);
            AsyncStorage.setItem('capitalIP', response.data.capital);
            AsyncStorage.setItem('codigoPaisIP', response.data.country_code);
            AsyncStorage.setItem('imagenIP', response.data.flag.img);
            AsyncStorage.setItem('horaIP', response.data.timezone.current_time);
            AsyncStorage.setItem('orgIP', response.data.connection.org);
            AsyncStorage.setItem('ispIP', response.data.connection.isp);
            AsyncStorage.setItem('domainIP', response.data.connection.domain);
            const tipoIp = await AsyncStorage.getItem('tipoip');
            const continente = await AsyncStorage.getItem('continenteIP');
            const pais = await AsyncStorage.getItem('paisIP');
            const capital = await AsyncStorage.getItem('capitalIP');
            const codigoPais = await AsyncStorage.getItem('codigoPaisIP');
            const imgPais = await AsyncStorage.getItem('imagenIP');
            const hora = await AsyncStorage.getItem('horaIP');
            const org = await AsyncStorage.getItem('orgIP');
            const isp = await AsyncStorage.getItem('ispIP');
            const domain = await AsyncStorage.getItem('domainIP');
            setTipoIp(tipoIp)
            setContinente(continente)
            setPais(pais)
            setCapital(capital)
            setCodigoPais(codigoPais)
            setImgPais(imgPais)
            setHora(hora)
            setOrg(org)
            setIsp(isp)
            setDomain(domain)
            setDatos('')
        } catch (error) {
            console.error('Error:', error);
        }
    }
    /*
    useEffect (() => {
        if(ipValida){
        //Obtencion de datos
       
        }
    },[ipValida])*/

    const handleObtenerDatos = () => {
        //Validaciones 
        const validaciones = []
        const esIpv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if ([ip].includes('')) {
            Alert.alert('Error', 'Todos los campos son obligatorios', [{ text: 'Ok' }])
            return
        }
        if (!esIpv4.test(ip.trim())) {
            validaciones.push('Debe ingresar una ip valida')
        }
        if (validaciones.length > 0) {
            Alert.alert('Campos incorrectos', validaciones.join('\n'), [{ text: 'Ok' }])
            return
        }
        ObtenerDatosDeIP(ip);
        setVerResultado(!verResultado)

    }


    return (
        <View>
            <Text style={styles.titulo}>Obtención de datos de una IP {''}</Text>
            <View style={styles.campo}>
                <Text style={styles.label}>IP</Text>
                <TextInput style={styles.input} placeholder='Ingrese una IP'
                    value={ip}
                    editable={!verResultado}
                    onChangeText={setIp}
                />
            </View>
            {verResultado && (
                <View>
                    <Text style={styles.titulo}>Resultados:{''}</Text>
                    <View style={styles.contenedorCard}>

                        <View style={styles.contenedorTexto}>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>Tipo IP:</Text><Text>{tipoIp}</Text>
                            </View>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>Continente: </Text><Text>{continente}</Text>
                            </View>
                        </View>

                        <View style={styles.contenedorTexto}>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>País: </Text><Text>{pais}</Text>
                            </View>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>Capital: </Text><Text>{capital}</Text>
                            </View>
                        </View>

                        <View style={styles.contenedorTexto}>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>Código País:</Text><Text>{codigoPais}</Text>
                            </View>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>Hora: </Text><Text>{domain}</Text>
                            </View>
                        </View>
                        <View style={styles.contenedorTexto}>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>Org: </Text><Text>{org}</Text>
                            </View>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>ISP: </Text><Text>{isp} </Text>
                            </View>
                        </View>
                        <View style={styles.contenedorTexto}>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>Domain: </Text><Text>{hora}</Text>
                            </View>
                        </View>
                        <View style={styles.contenedorTexto}>
                            <View style={styles.contenedorTextoFila}>
                                <Text style={styles.bold}>Imagen: </Text><Text>{imgPais}</Text>
                                <View>
                                {/*<SvgUri width="200"height="200" source={{ uri: 'https://cdn.ipwhois.io/flags/sv.svg'}}/>*/}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
            }
            <Pressable style={(verResultado) ? styles.btnLimpiar : styles.btnCalcular}
                onPress={(verResultado) ? limpiarAsyncStorage : handleObtenerDatos} >
                <Text style={styles.btnInfoTexto}>{(verResultado) ? "Limpiar" : "Obtener Datos"} </Text>
            </Pressable>
            <Pressable style={styles.btnRegresar}
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
    },btnRegresar: {
        backgroundColor: '#50FF3B',
        padding: 15,
        marginTop: 20,
        borderRadius: 10
      },

})

export default Ejercicio2