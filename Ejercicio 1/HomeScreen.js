import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, AsyncStorage } from 'react-native';


const HomeScreen = ({ navigation }) => {
  const handleAddActivity = () => {
    navigation.navigate('Formulario');
  };

  
  const verDatos = () => {
      Alert.alert(
        'Lo lamentamos, pero el dato no pudo ser encontrado',
        getData()
      );    
  };


  const getData = async () => {
    try {
       const jsonValue = await AsyncStorage.getItem('actividad');
      return jsonValue != null ? JSON.parse(jsonValue) : null;    
    } catch (e) {
      Alert.alert(
        'Lo lamentamos, pero el dato no pudo ser encontrado'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>RecordaTask</Text>
      <View style={styles.content}>
        <Text style={styles.emptyMessage}>No hay actividades registradas.</Text>
      </View>
        <View style={styles.homeButton}>
          <Button title="Actualizar Informacion" onPress={verDatos} />
        </View>


      <TouchableOpacity style={styles.addButton} onPress={handleAddActivity}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: 'gray',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
