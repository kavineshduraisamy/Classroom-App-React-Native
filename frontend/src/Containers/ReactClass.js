import {useEffect,useState, React} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ParticipantScreen from './Participant';
import Classwork from './Classwork';

const CustomTabLabel = ({ label, focused, fontSize, fontWeight }) => (
  <Text style={{ fontSize, color: focused ? 'purple' : '#000', fontWeight }}>
    {label}
  </Text>
);

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, route }) {
  const { classsection } = route.params;
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update the current time every minute
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
      setCurrentTime(formattedTime);
    }, 6); // 60000 milliseconds = 1 minute

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Class Information</Text>
      <View style={styles.classInfo}>
        <Text style={styles.classInfoTitle}>Class Name: <Text style={styles.classInfoText}>{classsection}</Text></Text>  
        {/* <Text style={styles.classInfoText}>{classsection}</Text> */}
        <Text style={styles.classInfoTitle}>Date:  <Text style={styles.classInfoText}>09-Nov-23</Text></Text>
        <Text style={styles.classInfoTitle}>Time:  <Text style={styles.classInfoText}>{currentTime}</Text></Text>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.goBackButton}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const ReactClass = ({ navigation, route }) => {
  const classsection = route.params.class;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = 28;
          let iconColor = '#000';

          if (route.name === 'ClassInfo') {
            iconName = focused ? 'ios-home-outline' : 'ios-home-outline';
          } else if (route.name === 'Classwork') {
            iconName = focused ? 'ios-clipboard-outline' : 'ios-clipboard-outline';
          } else if (route.name === 'People') {
            iconName = focused ? 'people-outline' : 'people-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'ios-person-circle' : 'ios-person-circle';
          }
          return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
        },
        tabBarLabel: ({ focused }) => {
          const fontSize = focused ? 15 : 15; 
          return <CustomTabLabel label={route.name} focused={focused} fontSize={fontSize} />;
        },
      })}
    >
      <Tab.Screen
        name="ClassInfo"
        component={HomeScreen}
        initialParams={{ classsection }}
        options={{
          headerShown: true,
        }}
      />
      <Tab.Screen name="Classwork" component={Classwork} initialParams={{ classsection }} />
      <Tab.Screen name="People" component={ParticipantScreen} initialParams={{ classsection }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF1F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  classInfo: {
    backgroundColor: '#63C7FD',
    padding: 80,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  classInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 5,
  },
  classInfoText: {
    fontSize: 20,
    color: 'black',
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

export default ReactClass;
