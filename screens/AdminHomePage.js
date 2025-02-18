import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminHomePage = () => {
  const [jobs, setJobs] = useState([
    { id: '1', name: 'Tara Gorby', location: 'Monkstown' },
    { id: '2', name: 'Paul Keenan', location: 'Kilmacud' },
    { id: '3', name: 'Brendan Jennings', location: 'Summerhill' },
  ]);

  const [newJobName, setNewJobName] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('');

  const navigation = useNavigation();

  const addNewJob = () => {
    if (newJobName && newJobLocation) {
      const newJob = {
        id: (jobs.length + 1).toString(),
        name: newJobName,
        location: newJobLocation,
      };
      setJobs([...jobs, newJob]);
      setNewJobName('');
      setNewJobLocation('');
    }
  };

  const handleJobPress = (job) => {
    navigation.navigate('ProjectPages', { job });
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobItem} onPress={() => handleJobPress(item)}>
      <Text style={styles.jobText}>{item.name}, {item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Jobs List</Text>

      {/* Job List */}
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.jobList}
      />

      {/* Add New Project Section */}
      <View style={styles.addProjectContainer}>
        <Text style={styles.addProjectTitle}>Add New Project</Text>
        <TextInput
          style={styles.input}
          placeholder="Client Name"
          value={newJobName}
          onChangeText={setNewJobName}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={newJobLocation}
          onChangeText={setNewJobLocation}
        />
        <Button title="Add Project" onPress={addNewJob} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  jobList: {
    marginBottom: 20,
  },
  jobItem: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  addProjectContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  addProjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fefefe',
  },
});

export default AdminHomePage;