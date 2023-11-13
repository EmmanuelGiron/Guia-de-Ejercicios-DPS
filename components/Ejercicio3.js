import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Cambia a tu conjunto de íconos preferido
import Icons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const PlayerListScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        renderItem={renderTeamCard}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddTeamPress}
      />
    </View>
  );
}

const RegisteredTeamsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        renderItem={renderTeamCard}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddTeamPress}
      />
    </View>
  );
}

const ExitScreen = () => {
  const navigation = useNavigation();
  navigation.navigate("Menu");
}

const TeamListScreen = () => {
  const [teams, setTeams] = useState([]);
  const fetchDataFromApi = async () => {
  try {
    const response = await fetch('https://torneodps.000webhostapp.com/api/api.php', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accion': 'LeerEquipos',
      },
    });

    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    setTeams(data);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
};

// Llamada a la API cuando el componente se monta
useEffect(() => {
  fetchDataFromApi();
}, []);

  const renderTeamCard = ({ item }) => (
    <Card style={styles.card} onPress={() => handleTeamPress(item)}>
      <Card.Title title={item.name} />
      {/* Puedes agregar más información del equipo aquí */}
    </Card>
  );

  const handleTeamPress = (team) => {
    // Puedes navegar a una pantalla de detalles del equipo aquí
    console.log('Equipo seleccionado:', team);
  };

  const handleAddTeamPress = () => {
    // Puedes navegar a la pantalla de agregar equipo aquí
    console.log('Agregar equipo');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        renderItem={renderTeamCard}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddTeamPress}
      />
    </View>
  );
};

const TeamTab = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen
      name="Equipos"
      component={TeamListScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="users" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Jugadores"
      component={PlayerListScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Inscritos"
      component={RegisteredTeamsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="check" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Salir"
      component={ExitScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icons name="exit" color="#FD2525" size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Ejercicio3 = () => {
  return (
      <TeamTab />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Ejercicio3;
