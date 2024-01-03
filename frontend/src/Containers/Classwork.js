import React, { useState ,useEffect} from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Button,StyleSheet } from 'react-native';
import { Portal, Modal, Provider, IconButton } from 'react-native-paper';
const Classwork = ({ navigation,route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState();
  const [rener, setRener] = useState(false);
  const { classsection } = route.params;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.43.226:5000/api/getclass', {
          method: 'POST',
          body: JSON.stringify({ classsection }),
          headers: {
            'Content-Type':'application/json'  ,
          },
        });

        
        if (response.status === 200) {
          const responseData = await response.json();
          setData(responseData.classcard.assignment);
          // console.log(responseData);
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [rener]);
  // console.log(data);
// console.log(classsection,'agsa'); getclass
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleSubmit =async () => {
    const response = await fetch('http://192.168.43.226:5000/api/createAssignment', {
      method: 'POST',
      body: JSON.stringify({ title,description,classsection }),
      headers: {
        'Content-Type':'application/json'  ,
      },
    });
    
    setTitle('');
    setDescription('');
    setRener(!rener)
    // You can perform any action you need with the form data
    toggleModal(); // Close the modal after submission
  };

const etails=()=>{
  if(data===undefined){

  }else{
    return data.map((i,inex)=>{
      return(<>
      <TouchableOpacity onPress={()=>navigation.navigate('submitlist',{data:i.student})}   style={styles.cardContainer}>
      <Text  style={{fontFamily: 'Bold', fontSize: 25,textAlign:'center' }}> Created Assignment</Text>
      <Text>{'\n'}</Text>
      <Text style={{fontFamily: 'Medium', fontSize: 23 }}>{i.title}</Text>
      <Text>{'\n'}</Text>
      <Text style={{fontFamily: 'Medium', fontSize: 23 }}>{i.description}</Text>
      <Text>{'\n'}</Text>
      </TouchableOpacity>
      </>)
    })
  }
}

  return (
    <Provider>
      <ScrollView>
      <Text>{'\n'}</Text>
        <Text style={{marginTop:15,fontFamily: 'Bold', fontSize: 30,marginLeft:12, }}>Classworks</Text>
        <Text>{'\n'}</Text>

        <View>
          {etails()}
        </View>
          <IconButton
          onPress={toggleModal}
            icon="plus-circle"
            size={50}
            style={{ alignSelf: 'flex-end',marginTop:"90%" }}
          />
      </ScrollView>
      <Portal>
        <Modal visible={isModalVisible} onDismiss={toggleModal} >
        <Text></Text>
          <View style={{ backgroundColor: 'white', padding: 25 }}>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text style={{fontFamily: 'Bold', fontSize: 25,textAlign:'center' }}>Create Assignment Here!</Text>
          <Text>{'\n'}</Text>
            <TextInput
              placeholder="Assignment Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Text>{'\n'}</Text>
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
            />
            <Text>{'\n'}</Text>
            <Button title="Create Classwork" onPress={handleSubmit}  />
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text></Text>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF1F7',
    alignItems: 'center',
  },
  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:100,
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
  goBackButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: '#FDD444',
    borderRadius: 8,
    padding: 26,
    margin: 10,
    marginTop:10,
    width:425,
    borderWidth: 5,
    borderColor: 'lightgray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
export default Classwork;
