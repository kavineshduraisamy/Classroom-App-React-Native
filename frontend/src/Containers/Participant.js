import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const ParticipantScreen = ({navigation,route}) => {
  const [data, setData] = useState([]);
  const { classsection } = route.params;
  // console.log("Parant")
  // console.log("Participant",classsection)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.43.226:5000/api/getallstudents', {
          method: 'POST',
          body: JSON.stringify({ classsection }),
          headers: {
            'Content-Type':'application/json'  ,
          },
        });

        
        if (response.status === 200) {
          const responseData = await response.json();
          setData(responseData);
          // console.log(responseData);
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#EDF1F7'
      }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.detailsHeader}> Class Participant</Text>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardText}>
              <Text>{item.Name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:40
  },
  studentList: {
    marginTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
  },
});

export default ParticipantScreen;
