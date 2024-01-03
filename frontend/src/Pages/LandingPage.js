import React from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
 import VectorPageOne from '../assets/vector/VectorPageOne';
import IconButtonNext from '../assets/icons/IconButtonNext';
 import {useFonts} from 'expo-font' 
 import { Fonts } from '../Constant/Fonts';
const PageOne = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);
  if (!fontsLoaded) {
    return 
  } else {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF4CD' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={{ alignItems: 'center', marginTop: 55 }}>
        <VectorPageOne />
        </View>
        <Text style={{fontFamily: 'Bold', fontSize: 36,textAlign:'center',color:'red'}}>{'\n'}KlassBucket</Text>
        <View style={{ marginTop: 36, paddingHorizontal: 30 }}>
          <Text style={{fontFamily: 'Bold', fontSize: 36 }}>
            Be in class, {'\n'}
            anywhere
          </Text>
          <Text style={{ fontFamily: 'Regular',fontSize: 16 }}>
            <Text> {'\n'}</Text>
            Bringing the classroom to your fingertips, making learning accessible anytime, anywhere
          </Text>
        </View>
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <TouchableOpacity >
            <IconButtonNext onPress={() => navigation.navigate('PageTwo')}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  }
};

export default PageOne;
