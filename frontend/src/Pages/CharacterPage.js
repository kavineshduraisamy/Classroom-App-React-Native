import React, { useContext, useState } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import IconButtonNext from '../assets/icons/IconButtonNext';
import { useNavigation } from '@react-navigation/native';
import CharacterMrTeacherFullBody from '../assets/characters/CharacterMrTeacherFullBody'; // Update import path
import CharacterStudentFullBody from '../assets/characters/CharacterStudentFullBody'; // Update import path
import {useFonts} from 'expo-font' 
import { Fonts } from '../Constant/Fonts';
// import { AuthContext } from '../../Helper/AuthProvider';

const CharacterPage = ({ route }) => {
//   const { userName, email, avatar } = route.params;
//   const { register } = useContext(AuthContext);
//   const [role, setRole] = useState('');


//   const redirectLogin = () => {
//     return register({ userName, email, avatar, role });
//   };
const navigation = useNavigation();
let [fontsLoaded] = useFonts(Fonts);
if (!fontsLoaded) {
  return 
} else {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#BDE7FD',
      }}
    >
      <ScrollView style={{ marginHorizontal: 30 }}>
        <View style={{ marginTop: 64 }}>
          <Text style={{ fontFamily: 'Bold',fontSize: 36 , marginTop:40}}>
            One
          </Text>
          <Text style={{fontFamily: 'Bold', fontSize: 36 }}>
            more thing!
          </Text>
          <Text style={{ fontSize: 15 }}>
            We would like to know you better
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={{fontFamily: 'SemiBold', fontSize:16, marginBottom:10 }}>
            Who are you?
          </Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <TouchableOpacity onPress={() => navigation.navigate('Teacher Login')}>
                <View style={{ 
                    padding: 16,
                    borderRadius: 8,
                    backgroundColor:'#FFFFFF',
                    minHeight: 300,
                    justifyContent: 'center',
                    marginRight: 16,
                    minWidth: 180,
                    alignItems: 'center',
                   }}>
                  <CharacterMrTeacherFullBody />
                </View>
              </TouchableOpacity>
              <Text style={{
                 fontFamily: 'SemiBold', fontSize:16, marginTop:14, textAlign:'center',
              }}>
                Teacher
              </Text>
            </View>
            <View style={styles.column}>
              <TouchableOpacity onPress={() => navigation.navigate('Student Login')}>
                <View style={{ padding: 16,
                    borderRadius: 8,
                    backgroundColor:'#FFFFFF',
                    minHeight: 300,
                    justifyContent: 'center',
                    marginRight: 16,
                    minWidth: 180,
                    alignItems: 'center'}}>
                  <CharacterStudentFullBody />
                </View>
              </TouchableOpacity>
              <Text style={{
               fontFamily: 'SemiBold', fontSize: 16, marginTop: 14, textAlign: 'center',
              }}>
                Student
              </Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems:'center', marginTop: 50 }}>
          <TouchableOpacity>
            <IconButtonNext  />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );}
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  layout: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  center: {
    justifyContent: 'center',
  },
});

export default CharacterPage;
