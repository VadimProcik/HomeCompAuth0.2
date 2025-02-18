import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const ClientHomePage = () => {
  // Example data for the progress section
  const progressImages = [
    { 
      id: '1', 
      image: 'https://tse2.mm.bing.net/th?id=OIP.5Dflb10Mm8WfJVO0fSOFEAHaFj&pid=Api&P=0&h=180', 
      caption: 'Foundation completed', 
      description: 'The foundation has been laid successfully. Next, we will start with the walls.' 
    },
    { 
      id: '2', 
      image: 'https://tse2.mm.bing.net/th?id=OIP.eaZtd_qYDam3UYgxppqdnwHaE0&pid=Api&P=0&h=180', 
      caption: 'Walls being erected', 
      description: 'The walls are being erected using high-quality materials. Completion expected next week.' 
    },
    { 
      id: '3', 
      image: 'https://tse4.mm.bing.net/th?id=OIP.yl_55exsn1BnX6b61TbZ2wHaE8&pid=Api&P=0&h=180', 
      caption: 'Roof installation in progress', 
      description: 'The roofing process is underway and will be finalized by Friday.' 
    },
  ];

  const renderImage = ({ item }) => (
    <View style={styles.imageCard}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.caption}>{item.caption}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Tara to Your Homeology Home</Text>
      </View>

      {/* Vertical Scroll Section */}
      <View style={styles.scrollerContainer}>
        <FlatList
          data={progressImages}
          renderItem={renderImage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollerContent}
        />
      </View>

      {/* Urgent Alerts Section */}
      <View style={styles.alertsContainer}>
        <Text style={styles.alertsTitle}>Urgent Alerts</Text>
        {['ESB Disconnections', 'Bathroom Drawings', 'Kitchen Drawings', 'Gas Disconnections'].map((alert, index) => (
          <TouchableOpacity key={index} style={styles.alertBox}>
            <Text style={styles.alertText}>{alert}</Text>
          </TouchableOpacity>
        ))}
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
  welcomeContainer: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  scrollerContainer: {
    flex: 2,
    marginBottom: 20,
  },
  scrollerContent: {
    paddingBottom: 10,
  },
  imageCard: {
    marginBottom: 15,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  caption: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  alertsContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d9534f',
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 10,
  },
  alertBox: {
    backgroundColor: '#f8d7da',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  alertText: {
    fontSize: 16,
    color: '#721c24',
  },
});

export default ClientHomePage;