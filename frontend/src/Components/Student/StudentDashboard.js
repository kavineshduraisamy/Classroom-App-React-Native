import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconLogout from '../../assets/icons/IconLogout';
import CharacterStudentFullBody from '../../assets/characters/CharacterStudentFullBody';
const StudentDashboard = ({ navigation }) => {
   const [data, setData] = useState({});
   const [rerender, setrender] = useState(false);
   const [studentToken, setStudentToken] = useState('');
   const [classcode,setClasscode]= useState('');
   const [cards, setCards] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the student token from AsyncStorage
        const token = await AsyncStorage.getItem('StudentToken');
        if (!token) {
          navigation.navigate('Student Login'); // Replace with the correct login route
        } else {
          setStudentToken(token);
          const response = await fetch('http://192.168.43.226:5000/api/student/profile', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              token: token,
            }, 
          });
          if (response.status === 200) {
            const responseData = await response.json();
            setData(responseData);
            // console.log(responseData);
            const responsed = await fetch('http://192.168.43.226:5000/api/joinedclass', {
            method: 'POST', 
            body: JSON.stringify({id:responseData._id}),
            headers: {
             'Content-Type':'application/json'  ,
             'token': studentToken,            
            },
          });
          const result = await responsed.json()
          //  console.log(result.classcard)
          if(result.message==="success" ){
            setCards(result.classcard)
            // console.log(result.classcard,'join');
            //  console.log('successfull joined the class')       
            } else {
            console.error('Error joining the class');
          }
          }  else {
            console.error('Error fetching data');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [rerender]);
  
  const handleLogOut = async () => {
    try {
      // Clear the student token from AsyncStorage
      await AsyncStorage.removeItem('StudentToken');
      navigation.navigate('CharacterPage'); // Replace with the correct login route
    } catch (error) {
      console.error(error);
    }
  };
  const joinclass=async()=>{
    // console.log(classcode)
    const response = await fetch('http://192.168.43.226:5000/api/joinclass', {
            method: 'POST',
            body: JSON.stringify({classcode,id:data}),
            headers: {
          'Content-Type':'application/json'  ,
          'token': studentToken,            
            },
          });
          const result = await response.json()
          //  console.log(result.classcard)
          if(result.message==="success" ){
            setrender(!rerender)
             console.log('successfull joined the class')       
            } else {
            console.error('Error joining the class');
          }
  }

  return (
    <SafeAreaView
          style={{
        flex: 1,
        backgroundColor: '#EDF1F7'
      }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={{
            paddingTop: 25,
            paddingBottom: 8,
            paddingHorizontal: 10,
          }}>
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

        {cards.map((card, index) => (
           <TouchableOpacity  onPress={() => {
            navigation.navigate('StudentAssignment',{class:card,id:data.Name}); // Navigate to the "Class" page
          }}>
          <View  style={styles.classCard}>
                <CharacterStudentFullBody key={index} />
            <Text style={styles.classText}>{card.content}</Text>
          </View>
          </TouchableOpacity>
        ))}
<Text>{'\n'}</Text>
<Text>{'\n'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Class Code"
          onChangeText={(text) => setClasscode(text)}
          value={classcode}
          maxLength={6}
          autoCapitalize='none'
        />
        <Text></Text>
        <Button title="join Class" onPress={joinclass} />
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
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    fontWeight: '200',
    fontSize: 26,
    marginLeft:3
  },
  card: {
    backgroundColor: '#99E1DD',
    padding: 19,
    marginTop: 20,
    borderRadius: 8,
  },
  classText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    flex: 3,
    paddingLeft:25,
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorText: {
    color: 'blue',
  },
  buttonContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 8,
    
  },
  classCard: {
    backgroundColor: '#99E1DD',
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StudentDashboard;
