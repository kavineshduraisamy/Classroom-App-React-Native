import React, { useState } from 'react';
import { View, Alert, StyleSheet,TouchableOpacity ,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper'
import Background from '../../assets/styles/Background';
import TextInput from '../../assets/styles/TextInput';
import Button from '../../assets/styles/Button'
import Logo from '../../assets/styles/Logo'
import Header from '../../assets/styles/Header'
import BackButton from '../../assets/styles/BackButton'
import {theme} from '../../assets/core/theme'

const TeacherLogin = ({ navigation }) => {
  const [fromData, setFromData] = useState({
    Email: '',
    Password: '',
  });

  const userLog = async () => {
    if (fromData.Email === '' || fromData.Password === '') {
      Alert.alert('All Fields are Required');
      return;
    }

    await fetch('http://192.168.43.226:5000/api/teacher/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: fromData.Email, Password: fromData.Password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status  wee: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        if (data && data) {
          AsyncStorage.setItem('TeacherToken', data).then(() => {
            Alert.alert('Welcome');
            setTimeout(() => {
              navigation.navigate('TeacherDashboard');
            }, 100);
          });
        } else {
          Alert.alert('Invalid credentials');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('An error occurred while fetching data');
      });
  };

  return (
      <ScrollView>
        
    <Background>
    <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      <Logo/>
      <Header>TEACHER LOGIN</Header>
      <BackButton goBack={navigation.goBack} />
      {/* <Text> TEACHER LOGIN</Text>    */}
        <TextInput
          label="Email"
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setFromData({ ...fromData, Email: text })}
          value={fromData.Email}
        />    
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setFromData({ ...fromData, Password: text })}
          value={fromData.Password}
          secureTextEntry={true}
        />

<View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

     <Button mode="contained" onPress={userLog}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Teacher Signup')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text>Want to go home? </Text>
        <TouchableOpacity onPress={() => navigation.replace('CharacterPage')}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
      </View>
     <View style={styles.margin}></View>
  
    </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  margin:{
    marginBottom:190,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
export default TeacherLogin;
