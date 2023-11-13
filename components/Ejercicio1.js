import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TextInput, Pressable, Modal, Alert, FlatList, ScrollView, Image, Button } from 'react-native'
import DatePicker from 'react-native-date-picker';
import { useNavigation } from "@react-navigation/native";




function Formulario() {
  //Hook para almacenar los empleados
  const [paciente, setPaciente] = useState([])
  //Hooks con informacion del empleado
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [genero, setGenero] = useState('Seleccionar')
  const [dui, setDui] = useState('')
  const [nit, setNit] = useState('')
  const [direccion, setDireccion] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date())
  const [fechaHoy, setFechaHoy] = useState(new Date())
  const [numeroTelefonoMovil, setNumeroTelefonoMovil] = useState('')
  const [numeroTelefonoCasa, setNumeroTelefonoCasa] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')
  const [edad, setEdad] = useState(0)
  const [etapa, setEtapa] = useState('Primera infancia')
  const [open, setOpen] = useState(false)
  const navigation = useNavigation();
  const [fill, setFill] = useState(false);

  const handleRegresar = () =>{
    navigation.navigate("Menu")
  }

  const handleOpcion = (value) => {
    setGenero(value)
    
  }
  const handleEdad = (date) => {
    const yearSelected = date.getFullYear();
    const monthSelected = date.getMonth() + 1;
    const daySelected = date.getDate();

    const yearNow = fechaHoy.getFullYear();
    const monthNow = fechaHoy.getMonth() + 1;
    const dayNow = fechaHoy.getDate();

    if(monthSelected === monthNow){
      if(daySelected <= dayNow){
      const edad=yearNow-yearSelected
      setEdad(edad)
      if(edad<=5){
        setEtapa('Primera Infancia')
      }else if(edad>5 && edad<=11){
        setEtapa('Infancia')
      }else if(edad>11 && edad<=18){
        setEtapa('Adolescencia')
      }else if(edad>19 && edad<=26){
        setEtapa('Juventud')
      }else if(edad>26 && edad<=59){
        setEtapa('Adultez')
      }else if(edad>59){
        setEtapa('Persona mayor')
      }
      } else{
        const edad=yearNow-yearSelected-1
        setEdad(edad)
        if(edad<=5){
          setEtapa('Primera Infancia')
        }else if(edad>5 && edad<=11){
          setEtapa('Infancia')
        }else if(edad>11 && edad<=18){
          setEtapa('Adolescencia')
        }else if(edad>19 && edad<=26){
          setEtapa('Juventud')
        }else if(edad>26 && edad<=59){
          setEtapa('Adultez')
        }else if(edad>59){
          setEtapa('Persona mayor')
        }
      }
    }else if(monthSelected > monthNow){ 
      const edad=yearNow-yearSelected-1
      setEdad(edad)
      if(edad<=5){
        setEtapa('Primera Infancia')
      }else if(edad>5 && edad<=11){
        setEtapa('Infancia')
      }else if(edad>11 && edad<=18){
        setEtapa('Adolescencia')
      }else if(edad>19 && edad<=26){
        setEtapa('Juventud')
      }else if(edad>26 && edad<=59){
        setEtapa('Adultez')
      }else if(edad>59){
        setEtapa('Persona mayor')
      }
    }else{
      const edad=yearNow-yearSelected
      setEdad(edad)
      if(edad<=5){
        setEtapa('Primera Infancia')
      }else if(edad>5 && edad<=11){
        setEtapa('Infancia')
      }else if(edad>11 && edad<=18){
        setEtapa('Adolescencia')
      }else if(edad>19 && edad<=26){
        setEtapa('Juventud')
      }else if(edad>26 && edad<=59){
        setEtapa('Adultez')
      }else if(edad>59){
        setEtapa('Persona mayor')
      }
    }
  


  }

  const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha)
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return nuevaFecha.toLocaleDateString('es-Es', opciones)
  }

  useEffect(() => {
     const nuevoPaciente = {
      id: Date.now(),
      nombres,
      apellidos,
      genero,
      dui,
      nit,
      direccion,
      fechaNacimiento,
      numeroTelefonoMovil,
      numeroTelefonoCasa,
      correoElectronico,
      edad,
      etapa
    }
    setPaciente(nuevoPaciente)
  }, [nombres,setNombres,apellidos,setApellidos,genero,setGenero,dui,setDui,direccion,setDireccion,fechaNacimiento,numeroTelefonoCasa,setNumeroTelefonoCasa,numeroTelefonoMovil,setNumeroTelefonoMovil,correoElectronico,setCorreoElectronico]);

  useEffect(()=>{
    setApellidos('')
    setGenero('Seleccionar')
    setDui('')
    setNit('')
    setDireccion('')
    setFechaNacimiento(new Date())
    setNumeroTelefonoMovil('')
    setNumeroTelefonoCasa('')
    setCorreoElectronico('')
  },[])

  const handleCalcular = () => {
    //Arreglo de errores
    const validaciones = []
    //Expresiones regulares
    //const esDecimal = /^-?\d*\.?\d+$/
    //const esEntero = /^-?\d+$/ 
    const esTexto = /^[a-zA-Z]+$/
    const esEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const esDui = /^\d{8}-\d$/;
    const esNit = /^\d{4}-\d{6}-\d{3}-\d$/;
    const esTelefonoMovil = /^[67]\d{7}$/;
    const esTelefonoCasa = /^[2]\d{7}$/;

    if ([nombres, apellidos, genero, dui, nit, direccion, fechaNacimiento, numeroTelefonoMovil, numeroTelefonoCasa, correoElectronico].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [{ text: 'Ok' }])
      return
    }

    if (!esTexto.test(nombres.trim())) {
      validaciones.push('El campo de nombre/s debe ser texto')
    }
    if (!esTexto.test(apellidos.trim())) {
      validaciones.push('El campo de apellido/s debe ser texto')
    }
    if (genero === 'Seleccionar') {
      validaciones.push('Debe seleccionar un genero')
    }
    if (!esDui.test(dui.trim())) {
      validaciones.push('Debe de ingresar el DUI en formato correcto')
    }
    if (!esNit.test(nit.trim())) {
      validaciones.push('Debe de ingresar el NIT en formato correcto')
    }
    //if (!esTexto.test(direccion.trimEnd())) {
    //validaciones.push('Debe de ingresar una dirección correcta')
    //}
    if (!esTelefonoMovil.test(numeroTelefonoMovil.trim())) {
      validaciones.push('Debe de ingresar un numero de telefono movil valido')
    }
    if (!esTelefonoCasa.test(numeroTelefonoCasa.trim())) {
      validaciones.push('Debe de ingresar un numero de telefono de casa con formato correcto')
    }
    if (!esEmail.test(correoElectronico.trim())) {
      validaciones.push('Debe de ingresar un correo valido')
    }
    const yearNow = fechaHoy.getFullYear();
    const monthNow = fechaHoy.getMonth() + 1;
    const dayNow = fechaHoy.getDate();

    const yearSelected = fechaNacimiento.getFullYear();
    const monthSelected = fechaNacimiento.getMonth() + 1;
    const daySelected = fechaNacimiento.getDate();

    if (yearSelected > yearNow) {
      validaciones.push('Debe de ingresar un año valido')
    } else {
      if (monthSelected > monthNow) {
        validaciones.push('Debes seleccionar un mes valido')
      } else {
        if (daySelected > dayNow) {
          validaciones.push('Debes seleccionar un dia valido')
        }
      }
    }
    if (validaciones.length > 0) {
      Alert.alert('Campos incorrectos', validaciones.join('\n'), [{ text: 'Ok' }])
      return
    }

    navigation.navigate("ResultadosEjercicio1",{pacienteInfo:paciente})


    //Limpiando formulario
    /*setNombres('')
    setApellidos('')
    setGenero('Seleccionar')
    setDui('')
    setNit('')
    setDireccion('')
    setFechaNacimiento(new Date())
    setNumeroTelefonoMovil('')
    setNumeroTelefonoCasa('')
    setCorreoElectronico('')*/
  };

  return (<>
    <ScrollView>
      <Text style={styles.titulo}>Clínica Dr.Amaya {''}</Text>
      <View style={styles.campo}>
        <Text style={styles.label}>Nombres</Text>
        <TextInput style={styles.input} placeholder='Nombres Paciente'
          value={nombres}
          onChangeText={setNombres}
        />
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Apellidos</Text>
        <TextInput style={styles.input} placeholder='Apellidos Paciente'
          value={apellidos}
          onChangeText={setApellidos}
        />
      </View>
      <View>
        <Text style={styles.label}>Seleccione su género</Text>
        <Picker
          selectedValue={genero}
          onValueChange={(value) => { handleOpcion(value) }}
          style={styles.input}
        >
          <Picker.Item label='Seleccionar' value="Seleccionar" />
          <Picker.Item label='Masculino' value="masculino" />
          <Picker.Item label='Femenino' value="femenino" />
        </Picker>
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>DUI</Text>
        <TextInput style={styles.input} placeholder='DUI Paciente'
          value={dui}
          onChangeText={setDui}
        />
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>NIT</Text>
        <TextInput style={styles.input} placeholder='NIT Paciente'
          value={nit}
          onChangeText={setNit}
        />
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Dirreción</Text>
        <TextInput style={styles.input} placeholder='Direccion Paciente'
          value={direccion}
          onChangeText={setDireccion}
        />
      </View>


      <View style={styles.campo}>
        <Text style={styles.label}>Fecha Nacimiento</Text>
        <View style={styles.fechaContenedor}>
          <Button title="Selccionar fecha" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            open={open}
            mode='date'
            date={fechaNacimiento}
            onConfirm={(date) => {
              setOpen(false)
              setFechaNacimiento(date)
              handleEdad(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </View>


      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Telélfo Móvil</Text>
        <TextInput style={styles.input} placeholder='Móvil Paciente'
          value={numeroTelefonoMovil}
          onChangeText={setNumeroTelefonoMovil}
        />
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Teléfono Casa</Text>
        <TextInput style={styles.input} placeholder='Télefono Fijo Paciente'
          value={numeroTelefonoCasa}
          onChangeText={setNumeroTelefonoCasa}
        />
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput style={styles.input} placeholder='Correo Paciente'
          value={correoElectronico}
          onChangeText={setCorreoElectronico}
        />
      </View>

      <Pressable style={styles.btnCalcular}
        onPress={() =>{handleCalcular()}} >
        <Text style={styles.btnInfoTexto}>Agregar paciente</Text>
      </Pressable>
      <Pressable style={styles.btnRegresar}
                onPress={() => { handleRegresar() }} >
                <Text style={styles.btnInfoTexto}>Regresar al menú</Text>
      </Pressable>
    </ScrollView>
  </>
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
    backgroundColor: 'green',
    padding: 15,
    marginTop: 20,
    borderRadius: 10
  }, btnRegresar: {
    backgroundColor: 'gold',
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
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'

  },
  titulo: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
    marginBottom: 20,
    textTransform: 'uppercase',
    fontWeight: '600'
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
  }, fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  }

})

export default Formulario