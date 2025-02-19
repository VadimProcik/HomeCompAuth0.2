import React, { useState } from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert, Image, Keyboard, TouchableWithoutFeedback, Platform, KeyboardAvoidingView,} from "react-native";
import { auth, signInWithEmailAndPassword } from "../firebase"; // Firebase auth
import { getFirestore, doc, getDoc } from "firebase/firestore";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Input Error", "Please enter both email and password");
      return;
    }

    try {
      // Firebase Authentication login
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // Firestore reference
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;
        const ProjectId = userData.ProjectId || null; // Ensure projectId is handled

        if (userRole === "admin") {
          navigation.replace("AdminHome");
        } else if (userRole === "client") {
          navigation.replace("ClientHome", { ProjectId }); // Pass projectId
        } else {
          Alert.alert("Login Failed", "User role not assigned.");
        }
      } else {
        Alert.alert("Login Failed", "User not found in Firestore.");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message || "Invalid username or password");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Image source={require("../assets/COMPANIAN.png")} style={styles.logo} />
          <Text style={styles.title}>Login</Text>
          <TextInput style={styles.input} placeholder="Email" value={username} onChangeText={setUsername} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
          <View style={styles.loginButtonContainer}>
            <Button title="Login" onPress={handleLogin} color="#fff" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    backgroundColor: "black",
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  loginButtonContainer: {
    width: "80%",
    backgroundColor: "#E200FF",
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default LoginScreen;