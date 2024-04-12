import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState('');
  const [actividadEditada, setActividadEditada] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const agregarActividad = () => {
    if (nuevaActividad.trim() !== '') {
      setActividades([...actividades, { id: Math.random().toString(), nombre: nuevaActividad }]);
      setNuevaActividad('');
    }
  };

  const editarActividad = () => {
    const nuevasActividades = actividades.map(item => {
      if (item.id === editandoId) {
        return { ...item, nombre: actividadEditada };
      }
      return item;
    });
    setActividades(nuevasActividades);
    setEditandoId(null);
  };

  const eliminarActividad = id => {
    const nuevasActividades = actividades.filter(item => item.id !== id);
    setActividades(nuevasActividades);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Actividades</Text>
      <FlatList
        data={actividades}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.actividadItem}>
            {editandoId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={actividadEditada}
                  onChangeText={text => setActividadEditada(text)}
                  placeholder="Editar Actividad"
                />
                <Button title="Guardar" onPress={editarActividad} />
              </>
            ) : (
              <>
                <Text>{item.nombre}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity onPress={() => setEditandoId(item.id)}>
                    <Text style={styles.editarButton}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => eliminarActividad(item.id)}>
                    <Text style={styles.eliminarButton}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No hay actividades registradas.</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={nuevaActividad}
          onChangeText={text => setNuevaActividad(text)}
          placeholder="Nueva Actividad"
        />
        <Button title="Agregar" onPress={agregarActividad} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actividadItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  emptyMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  editarButton: {
    color: 'blue',
    marginRight: 10,
  },
  eliminarButton: {
    color: 'red',
  },
});

export default Actividades;
