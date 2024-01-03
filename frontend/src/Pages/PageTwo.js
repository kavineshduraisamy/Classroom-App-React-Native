import React from 'react';
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import IconButtonNext from '../assets/icons/IconButtonNext';
import VectorPageTwo from '../assets/vector/VectorPageTwo';
import { useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font' 
import { Fonts } from '../Constant/Fonts';
const PageTwo = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);
  if (!fontsLoaded) {
    return 
  } else {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2FFD7' }}>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <View style={{ alignItems:'center', marginTop: 150 }}>
          <VectorPageTwo />
        </View>
        <View style={{ marginTop: 36, paddingHorizontal: 30 }}>
        <Text style={{fontFamily: 'Bold', fontSize: 36}}>
        {'\n'}
        Study Anywhere,
          </Text>
          <Text style={{fontFamily: 'Bold', fontSize: 36}}>

          Learn Everywhere!
          </Text>
          <Text style={{fontFamily: 'Regular', fontSize: 16}}>
          {'\n'}{'\n'}
          Elevate your learning experience through our interactive classroom app.
          </Text>
        </View>
        <View style={{ alignItems:'center', paddingTop: 20 }}>
          <TouchableOpacity>
            <IconButtonNext onPress={() => navigation.navigate('CharacterPage')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  }
}

export default PageTwo;
