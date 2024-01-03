import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageOne from './src/Pages/LandingPage'; 
import CharacterPage from './src/Pages/CharacterPage';
import PageTwo from './src/Pages/PageTwo';
import StudentLogin from './src/Components/Student/StudentLogin'
import StudentDashboard from './src/Components/Student/StudentDashboard'
import StudentSignup from './src/Components/Student/StudentSignup'
import TeacherLogin from './src/Components/Teacher/TeacherLogin';
import TeacherSignup from './src/Components/Teacher/TeacherSignup';
import TeacherDashboard from './src/Components/Teacher/TeacherDashboard';
import ReactClass from './src/Containers/ReactClass'
import StudentAssignment from './src/Containers/ClassInfo';
import Submission from './src/Containers/submit';
import Submissionlist from './src/Containers/submissionlist';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={PageOne} 
     options={{
      headerShown:false
    }}
  />
            <Stack.Screen name="PageTwo" component={PageTwo} 
     options={{
      headerShown:false
    }}
        />
          <Stack.Screen name="CharacterPage" component={CharacterPage} 
        options={{
          headerShown:false
        }}
      />
        <Stack.Screen name="Student Login" component={StudentLogin} 
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} 
             options={{
              headerShown:true,
              title: 'Dashboard'
            }}
        />
            <Stack.Screen name="Student Signup" component={StudentSignup} 
             options={{
              headerShown:false
            }}
        />
          <Stack.Screen name="Teacher Login" component={TeacherLogin} 
              options={{
                headerShown:false
              }}
        /> 
          <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} 
             options={{
              headerShown:true,
              title: 'Dashboard'
            }}
        />
           <Stack.Screen name="ReactClass" component={ReactClass} 
             options={{
              headerShown:false
            }}
        />        
           <Stack.Screen name="StudentAssignment" component={StudentAssignment} 
             options={{
              headerShown:false
            }}
        />        
           <Stack.Screen name="submitlist" component={Submissionlist} 
             options={{
              headerShown:true,
              title: 'Submission List'

            }}
        />        
           <Stack.Screen name="Submit" component={Submission} 
             options={{
              headerShown:true,
              title: 'Assignment Submission'
            }}
        />        
          <Stack.Screen name="Teacher Signup" component={TeacherSignup} 
              options={{
                headerShown:false
              }}
        />

      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;
