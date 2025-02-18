import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebase'; // Import Firebase Auth functions

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if username and password are entered
    if (username && password) {
      // Firebase Authentication login
      signInWithEmailAndPassword(auth, username, password) 
        .then((userCredential) => {
          // Signed in successfully
          const user = userCredential.user;

          // You can add role-based navigation logic here
          if (user.email === 'admin@gmail.com') {
            navigation.replace('AdminHome');
          } else if (user.email === 'client@gmail.com') {
            navigation.replace('ClientHome');
          } else {
            Alert.alert('Login Failed', 'User role not assigned.');
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert('Login Failed', errorMessage || 'Invalid username or password');
        });
    } else {
      Alert.alert('Input Error', 'Please enter both username and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;


//https://youtu.be/0_mRcoypaKk?si=H7TtesryivM2w2g1