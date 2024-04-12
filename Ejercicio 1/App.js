import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import Formulario from './Formulario';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLogin = () => {
    if (!loginEmail.includes('@')) { // Validación de correo electrónico
      Alert.alert('Correo electrónico no válido.');
      return;
    }

    if (loginEmail && loginPassword) {
      console.log('Logging in...');
      setIsRegistered(false); // Reset isRegistered state
      navigation.navigate('Home');
    } else {
      Alert.alert('Todos los campos son necesario.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={loginEmail}
        onChangeText={text => setLoginEmail(text)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={loginPassword}
        onChangeText={text => setLoginPassword(text)}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={handleLogin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      {isRegistered && <Text style={styles.message}>Registered successfully! Please login.</Text>}
    </View>
  );
};

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegisterSubmit = () => {
    if (username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        console.log('Registering...');
        navigation.navigate('Login', { isRegistered: true }); // Navigate back to Login with isRegistered set to true
      } else {
        Alert.alert('Las contraseñas son diferentes revise nuevamente.');
      }
    } else {
      Alert.alert('Porfavor llenar todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegisterSubmit} />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Formulario" component={Formulario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 10,
  },
  message: {
    marginTop: 10,
    color: 'green',
  },
});

export default App;
