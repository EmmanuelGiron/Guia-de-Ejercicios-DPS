import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import Ejercicio2 from './components/Ejercicio2';
import Ejercicio1 from './components/Ejercicio1';
import Login from './components/Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import ResultadosEjercicio1 from './components/ResultadosEjercicio1';
import Menu from './components/Menu';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'Menu'} component={Menu} option={{ headerShown: false }} />
          <Stack.Screen name={'Ejercicio1'} component={Ejercicio1} option={{ headerShown: false }} />
          <Stack.Screen name={'Ejercicio2'} component={Ejercicio2} option={{ headerShown: false }} />
          <Stack.Screen name={'Login'} component={Login} option={{ headerShown: false }} />
          <Stack.Screen name="ResultadosEjercicio1" component={ResultadosEjercicio1}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  },
});

export default App;
