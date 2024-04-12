import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView, AsyncStorage } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const colors = {
  BUTTON_COLOR: '#007bff', // Azul
};

// Formulario
const Formulario = ({ actividades, setActividades, guardarMostrarForm }) => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación
  
  const [nombre, guardarNombre] = useState('');
  const [materia, guardarMateria] = useState('');
  const [equipoTrabajo, guardarEquipoTrabajo] = useState('');
  const [fechaEntrega, guardarFechaEntrega] = useState('');
  const [horaEntrega, guardarHoraEntrega] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
    guardarFechaEntrega(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = hora => {
    const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
    guardarHoraEntrega(hora.toLocaleString('es-ES', opciones));
    hideTimePicker();
  };

  // Función para validar que el campo "Equipo de Trabajo" solo acepte números
  const validarEquipoTrabajo = (texto) => {
    if (/^\d+$/.test(texto)) {
      guardarEquipoTrabajo(texto);
    } else {
      Alert.alert('El campo "Equipo de Trabajo" solo acepta números.');
    }
  };

  // Función para crear una nueva actividad
  const crearNuevaActividad = async () => {
    if (
      nombre.trim() === '' ||
      materia.trim() === '' ||
      equipoTrabajo.trim() === '' ||
      fechaEntrega.trim() === '' ||
      horaEntrega.trim() === ''
    ) {
      mostrarAlerta();
      return;
    }

    const actividad = { nombre, materia, equipoTrabajo, fechaEntrega, horaEntrega };
    actividad.id = shortid();

    // Mostrar los datos en una alerta    
    guardarActividad(JSON.stringify(actividad));

    navigation.navigate('Home')
  };


  // Función para guardar la actividad en AsyncStorage y actualizar la lista de actividades
  const guardarActividad = async (actividad) => {
    // Guardar actividad en AsyncStorage
    try {
      await AsyncStorage.setItem('actividad', JSON.stringify(actividad));
      console.log('Actividad guardada correctamente en AsyncStorage');
    } catch (error) {
      console.error('Error al guardar la actividad en AsyncStorage:', error);
    }

  /*
    // Agregar actividad a la lista
    const nuevasActividades = [...actividades, actividad];
    setActividades(nuevasActividades);

    // Ocultar formulario
    guardarMostrarForm(false);

    // Limpiar campos del formulario
    guardarNombre('');
    guardarMateria('');
    guardarEquipoTrabajo('');
    guardarFechaEntrega('');
    guardarHoraEntrega('');
    */
  };

  // Función para mostrar una alerta
  const mostrarAlerta = (mensaje) => {
    Alert.alert('Error', mensaje, [{ text: 'OK' }]);
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Nombre de la actividad:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ texto => guardarNombre(texto) }
          />
        </View>
        <View>
          <Text style={styles.label}>Materia:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ texto => guardarMateria(texto) }
          />
        </View>
        <View>
          <Text style={styles.label}>Equipo de Trabajo:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ texto => validarEquipoTrabajo(texto) } // Validar el campo "Equipo de Trabajo"
            keyboardType='numeric' // Teclado numérico
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha de Entrega:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale='es_ES'
            headerTextIOS="Elige la fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fechaEntrega}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora de Entrega:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale='es_ES'
            headerTextIOS="Elige una Hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{horaEntrega}</Text>
        </View>
        <View>
          <TouchableHighlight onPress={crearNuevaActividad} style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Crear Nueva Actividad</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.homeButton}>
          <Button title="Ir a Home" onPress={() => navigation.navigate('Home')} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: colors.BUTTON_COLOR, // Aquí se utiliza el color definido
    marginVertical: 10
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  homeButton: {
    marginTop: 20
  }
});

export default Formulario;
