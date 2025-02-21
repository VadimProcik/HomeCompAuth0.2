import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const AdminHomePage = () => {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const projectList = snapshot.docs.map((doc) => ({
        id: doc.id, 
        ProjectId: doc.data().ProjectId, 
      }));

      setProjects(projectList); // Update state with new projects
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);

  const handleProjectPress = (project) => {
    navigation.navigate("ProjectPages", { project }); // Pass correct object
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>

      <FlatList
        data={projects}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.projectButton}
            onPress={() => handleProjectPress(item)}
          >
            <Text style={styles.projectText}>{item.ProjectId}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  projectButton: {
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  projectText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default AdminHomePage;