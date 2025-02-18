import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, signInWithEmailAndPassword} from '../firebase'; // Import Firebase Auth and Firestore functions
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Check if username and password are entered
    if (username && password) {
      try {
        // Firebase Authentication login
        const userCredential = await signInWithEmailAndPassword(auth, username, password); // Use Firebase Auth to sign in
        const user = userCredential.user;

        // Now, retrieve the user data from Firestore to get the role
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid); // Access the 'users' collection, using the user uid
        const userDoc = await getDoc(userDocRef); // Get the document

        if (userDoc.exists()) {
          const userData = userDoc.data(); // Get the user data from Firestore
          const userRole = userData.role; // Assuming 'role' is a field in your Firestore user document

          // Now you can navigate based on the role
          if (userRole === 'admin') {
            navigation.replace('AdminHome');
          } else if (userRole === 'client') {
            navigation.replace('ClientHome');
          } else {
            Alert.alert('Login Failed', 'User role not assigned.');
          }
        } else {
          Alert.alert('Login Failed', 'User not found in Firestore.');
        }
      } catch (error) {
        const errorMessage = error.message;
        Alert.alert('Login Failed', errorMessage || 'Invalid username or password');
      }
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