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
import CharacterMrTeacher from '../../assets/characters/CharacterMrTeacher';

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
        const response = await fetch('http://192.168.43.226:5000/api/classlist', {
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

  // Function to generate random background colors for cards
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <Text style={{ fontWeight: '200', fontSize: 25 }}>Hi, {data.Name}! </Text>
            <Text></Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                handleLogOut();
              }}
            >
              <IconLogout />
            </TouchableOpacity>
          </View>
        </View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.header}>Your Classes</Text>

        {cards.map((card) => (
          <TouchableOpacity onPress={() => navigation.navigate('ReactClass')}>
            <View key={card.id} style={[styles.classCard, { backgroundColor: getRandomColor() }]}>
              <CharacterMrTeacher />
              <Text style={styles.classText}>{card.content}</Text>
              <Text style={styles.classText}>Invite code: {card.classcode}</Text>

              <TouchableOpacity onPress={() => deleteCard(card.id)} style={styles.deleteButton}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <TextInput
          style={styles.input}
          placeholder="Create Classroom"
          onChangeText={(text) => setCardName(text)}
          value={cardName}
        />
        <Text></Text>
        <Button title="Create Class" onPress={addCard} />
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
    marginLeft: 3,
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -40,
  },
  classCard: {
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  classText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
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
  },
});

export default TeacherDashboard;
