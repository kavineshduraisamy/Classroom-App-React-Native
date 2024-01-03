import React, { useState } from 'react';
import { StyleSheet, View, ScrollView,TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper'
import Background from '../../assets/styles/Background';
import TextInput from '../../assets/styles/TextInput';
import Button from '../../assets/styles/Button'
import Logo from '../../assets/styles/Logo'
import Header from '../../assets/styles/Header'
import BackButton from '../../assets/styles/BackButton'
import {theme} from '../../assets/core/theme'
import { RadioButton } from 'react-native-paper';

export default function StudentSignup ({ navigation })  {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    RegisterNumber: '',
    Password: '',
    Gender: '',
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const sendToBackend = () => {
    if (!formData.Name || !formData.Email || !formData.RegisterNumber || !formData.Password || !formData.Gender) {
      setErrorMsg('All fields are required');
      return;
    } else {
      fetch('http://192.168.43.226:5000/api/student/createAccount', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            alert('Account Created Successfully');
            navigation.navigate('Student Login');
          }
        });
    }
  };



  return (
    <ScrollView>
    <Background>
       <BackButton goBack={navigation.goBack} />
       <Text>{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      <Logo />
      <Header>STUDENT SIGNUP</Header>
      {/* <Text >STUDENT SIGNUP</Text> */}

          <TextInput
            label="Name"
            onChangeText={(text) => setFormData({ ...formData,Name: text })}
          />
          <TextInput
            label="Email"
            onChangeText={(text) => setFormData({ ...formData,Email: text })}
            autoCapitalize="none"
          />
          <TextInput
            label="Student ID"
            onChangeText={(text) => setFormData({ ...formData,RegisterNumber: text })}
          />
          <TextInput
            label="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => setFormData({ ...formData,Password: text })}
          />
        
        <RadioButton.Group
  onValueChange={(value) => setFormData({ ...formData, Gender: value })}
  value={formData.Gender}
>
  <View style={styles.genderOptions}>
    <View style={styles.radioButtonContainer}>
  <Text style={styles.optionText}>Gender :</Text>
      <Text style={styles.optionText}>Male</Text>
      <RadioButton value="Male" />
    </View>
    <View style={styles.radioButtonContainer}>
      <Text style={styles.optionText}>Female</Text>
      <RadioButton value="Female" />
    </View>
  </View>
</RadioButton.Group>


          <Button
        mode="contained"
        onPress={sendToBackend}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Student Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.margin}></View>
    </Background>
    </ScrollView>
  );
};


const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  margin:{
    marginBottom:190,

  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginRight: 8,
    fontSize: 16,
  },
})
