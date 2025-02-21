import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Image,
} from 'react-native';

const ProjectPage = ({ route }) => {
  const job = route.params?.job; // Prevents crashing if job is undefined

  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No project data available.</Text>
      </View>
    );
  }

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');

  const addPost = () => {
    if (title && description && imageUri) {
      const newPost = { id: Date.now().toString(), title, description, imageUri };
      setPosts([...posts, newPost]);
      setTitle('');
      setDescription('');
      setImageUri('');
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Project: {job.name}, {job.location}</Text>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.postList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Post Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Post Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={imageUri}
          onChangeText={setImageUri}
        />
        <Button title="Add Post" onPress={addPost} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  postList: {
    marginBottom: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  postDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default ProjectPage;