import { View,Text,StyleSheet } from "react-native"


export default function Submissionlist({route}){
    const { data } = route.params;
    // console.log(data,"ghghgh");
return(<>
    <View>
        {/* <Text>hihihihi</Text> */}
        <Text style={{marginTop:45,fontFamily: 'Bold', fontSize: 30,marginLeft:12, }}>Students Submission List</Text>

        {data.map((i,index)=>{
            return(
            <View   style={styles.cardContainer}>
            <Text>{'\n'}</Text>
            
            <Text  style={{fontFamily: 'Bold', fontSize: 25,textAlign:'center' }}> Assignment Submissionlist</Text>
            <Text>{'\n'}</Text>
            <Text  style={{fontFamily: 'Medium', fontSize: 23 }}>{i.id}</Text>
            <Text>{'\n'}</Text>
            <Text  style={{fontFamily: 'Medium', fontSize: 23 }}>{i.description}</Text>
            <Text>{'\n'}</Text>

            </View>)
        })}
    
    </View>
    </>)
}

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
      backgroundColor: '#9DCB37',
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
