import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';

export default function Submission({ route,navigation }) {
  const {title, description,class1,id} = route.params;

  const [text, setText] = useState(''); // State to store text in the text area

const submitass=async()=>{
  console.log(text);
    const response = await fetch('http://192.168.43.226:5000/api/submitAssignment', {
      method: 'POST',
      body: JSON.stringify({ title,description,text,class1,id}),
      headers: {
        'Content-Type':'application/json'  ,
      },
    });
    if(response.status===200){
      console.log("data saved success");
      navigation.goBack()
      
    }else{
      console.log(response.data.message);

    }

}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <TextInput
        multiline={true} // This makes the TextInput a text area
        numberOfLines={4} // Adjust the number of lines as needed
        placeholder="Enter your submission here"
        value={text}
        onChangeText={(newText) => setText(newText)}
        style={styles.textArea}
      />

      <Button title="Submit" onPress={() => submitass()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop:40
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',

  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    minHeight: 100,
  },
});
