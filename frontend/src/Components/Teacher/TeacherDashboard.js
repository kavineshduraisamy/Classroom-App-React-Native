import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconLogout from '../../assets/icons/IconLogout';
import CharacterMrTeacherFullBody from '../../assets/characters/CharacterMrTeacherFullBody';
const TeacherDashboard = ({ navigation }) => {
  const [data, setData] = useState({});
  const [teacherToken, setTeacherToken] = useState('');
  const [cards, setCards] = useState([]);
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('TeacherToken');

        if (!token) {
          navigation.navigate('Teacher Login'); // Replace with the correct login route
        } else {
          setTeacherToken(token);
          const response = await fetch('http://192.168.43.226:5000/api/teacher/profile', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              token: token,
            },
          });
          if (response.status === 200) {
            const responseData = await response.json();
            setData(responseData);
          } else {
            console.error('Error fetching data');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigation]);
 
  
  useEffect(() => {
    const fetchClassCards = async () => {
      try {
        // Make an API request to get class cards from your backend
        const response = await fetch('http://192.168.43.226:5000/api/classlist', 
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            // Include any required headers, such as authorization token
          },
        });

        if (response.status === 200) {
          const result = await response.json();
          setCards(result);
        } else {
          console.error('Error fetching class cards');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchClassCards();
  }, []);
const addCard = async () => {
    if (cardName.trim() !== '') {
      try {
        const response = await fetch('http://192.168.43.226:5000/api/createCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: teacherToken,
          },
          body: JSON.stringify({ content: cardName }),
        });
        if (response.status === 201) {
          const newCard = await response.json();
          setCards([...cards, newCard]);
          setCardName('');
        } else {
          console.error('Error creating card');
        }
      } catch (error) {
        console.error(error);
      }
    }   
  };
  const deleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };
  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('TeacherToken');
      navigation.navigate('CharacterPage'); // Replace with the correct login route
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView  style={{
      flex: 1,
      backgroundColor: '#EDF1F7'
    }}>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={{
            paddingTop: 25,
            paddingBottom: 8,
            paddingHorizontal: 10,
          }} >
            <Text style={{ fontWeight:800, fontSize: 25 }}>Hi, {data.Name}! </Text>
            <Text></Text>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: -40,
              }}
              onPress={() => {
                handleLogOut();
              }}
            >
              <IconLogout />
            </TouchableOpacity>
            <Text></Text>
          </View>
        </View>
        <Text></Text>
        <Text></Text>  
        <Text></Text>
        <Text></Text>
        <Text style={styles.header}>Your Classes</Text>
        {cards.map((card,i) => (
          <TouchableOpacity  onPress={() => {
            navigation.navigate('ReactClass',{class:card.content}); // Navigate to the "Class" page
          }}>
            <View  key={i}>
            <View  key={i} style={styles.classCard}>
            <CharacterMrTeacherFullBody key={i}/>
            <Text style={styles.classText} >{card.content}</Text>
            <Text style={styles.classco}>Invitecode : {card.classcode}</Text>
            </View>
            </View>
            </TouchableOpacity>
        ))}
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Create Classroom"
          onChangeText={(text) => setCardName(text)}
          value={cardName}
          autoCapitalize='none'
        />
        <Text></Text>
        <Button title="Create Classroom" onPress={addCard} />
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF1F7',
    padding: 16,
  },
  card: {
    backgroundColor: '#99E1DD',
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  headerContainer: {
    paddingTop: 25,
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
  header: {
    fontWeight: '200',
    fontSize: 26,
    marginLeft:3
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -40,
  },
  classCard: {
    backgroundColor: '#99E1DD',
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  classText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
  },
  deleteButton: {
    marginLeft: 100,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 8,
  },
  classco:{
    backgroundColor:'#142b47',
    padding:5,
    color:"white",
    borderRadius:5,
    fontSize:15
  }
});
export default TeacherDashboard;
