import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,SafeAreaView,ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import ParticipantScreen from './Participant'
// import Classwork from './Classwork'
const CustomTabLabel = ({ label, focused, fontSize,fontWeight}) => (
  <Text style={{ fontSize, color: focused ? 'purple' : '#000', fontWeight:"bold" }}>{label}</Text>
);
const Tab = createBottomTabNavigator();
function HomeScreen({navigation,route}) {
  const { classsection } = route.params;
  const { id } = route.params;
  // console.log(id,classsection.content);
  const [assign,setAssign]=useState(classsection.assignment)
  const detail=()=>{
   return assign.map((i,inex)=>{
    // console.log(i);
      return(<View style={{width:300,height:50}}>
      <TouchableOpacity onPress={()=>navigation.navigate('Submit',{title:i.title,description:i.description,class1:classsection.content,id:id})} style={{backgroundColor:'#FDD444',width:430,margin:10, borderRadius: 8, borderWidth: 5,
      borderColor: 'lightgray',}} >
      <Text>{'\n'}</Text>
      <Text  style={{fontFamily: 'Bold', fontSize: 25,textAlign:'center' }}> Your Assignment</Text>
      <Text>{'\n'}</Text>
      <Text style={{fontFamily: 'Medium', fontSize: 23,   paddingLeft:20 }}>{i.title}</Text>
      <Text>{'\n'}</Text>
      <Text style={{fontFamily: 'Medium', fontSize: 23,   paddingLeft:20 }}>{i.description}</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      </TouchableOpacity>
      </View>)
    })
  }
  return (
     <View style={styles.container}>
       <Text style={styles.header}>Class Information</Text>
        {detail()}
      {/* <TouchableOpacity
         onPress={() => {
           navigation.goBack();
        }}
         style={styles.goBackButton}
       >
         <Text style={styles.buttonText}>Go Back</Text>
       </TouchableOpacity> */}
     </View>
  );}
  const ParticipantScreen = ({navigation,route}) => {
    const [data, setData] = useState([]);
    const  cla  = route.params.classsection;
    const classsection= cla.content
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
        <ScrollView style={{flex: 1,backgroundColor: 'white',padding: 16,}} >
          <Text style={{fontSize: 20,fontWeight: 'bold',marginTop:40}}> Class Participant</Text>
          {data.map((item, index) => (
            <View key={index} style={{ backgroundColor: 'white',borderRadius: 10,padding: 16,margin: 10,shadowColor: '#000',shadowOffset: {width: 0,height: 2, },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,}}>
              <View style={{fontSize: 16,}}>
                <Text>{item.Name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
  
 

const StudentAssignment = ({ navigation, route }) => {
  const classsection = route.params.class
  const id = route.params.id
// console.log(classsection,id,'hisaa')
  return (
    //
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconSize=28;
        let iconColor='#000';

        if (route.name === 'ClassWork') {
          iconName = focused ? 'ios-home-outline' : 'ios-home-outline';
        } else if (route.name === 'ClassInfo') {
          iconName = focused ? 'ios-clipboard-outline' : 'ios-clipboard-outline';
        } else if (route.name === 'People') {
          iconName = focused ? 'people-outline' : 'people-outline';
        } else if (route.name === 'User') {
          iconName = focused ? 'ios-person-circle' : 'ios-person-circle';
        }
        return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
      },
      tabBarLabel: ({ focused }) => {
        const fontSize = focused ? 15 : 15; // Adjust the font size here
        return  <CustomTabLabel label={route.name} focused={focused} fontSize={fontSize} />;
      },
      // tabBarInactiveTintColor: 'indigo',
      // tabBarActiveTintColor: 'orangered',
    })}>
      <Tab.Screen
  name="ClassWork"
  component={HomeScreen}
  initialParams={{ 
    classsection: classsection,
    id: id
  }}
    options={{
    headerShown: true,
  }}
/>

      {/* <Tab.Screen name="Classwork" component={Classwork}
      initialParams={{ classsection }}
      options={{
        headerShown:true
      }} /> */}

      <Tab.Screen name="People" component={ParticipantScreen}
      initialParams={{ classsection }}
      options={{
        headerShown:true
      }} />
    </Tab.Navigator>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF1F7',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:30,
    paddingLeft:20
  },
  classInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContainer: {
    backgroundColor: '#99E1DD',
    borderRadius: 8,
    padding: 216,
    margin: 10,
    marginTop:10,
    width:425,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  goBackButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default StudentAssignment;
