import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
 import HomeScreen from '../screens/HomeScreen'; 
import SkinCareScreen from '../screens/Skincare';
import ReminderImageScreen from '../screens/ReminderImageScreen';
import Reminder2 from '../screens/reminder2';
import Reminder3 from '../screens/reminder3';
import GeneralPhysican from '../screens/GeneralPhysican';
import Gyno from '../screens/Gynecology';
import PdfViewer from '../screens/PdfViewer';
import PdfViewer2 from '../screens/PdfViewer2';
import PdfViewer3 from '../screens/PdfViewer3';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
     <Stack.Screen name="Login" component={LoginScreen} />
   <Stack.Screen name="Home" component={HomeScreen} /> 
   <Stack.Screen name="Skin" component={SkinCareScreen} /> 
   <Stack.Screen name="Reminder" component={ReminderImageScreen} /> 
   <Stack.Screen name="Reminder2" component={Reminder2} /> 
   <Stack.Screen name="Reminder3" component={Reminder3} /> 
   <Stack.Screen name="GeneralPhysican" component={GeneralPhysican} /> 
   <Stack.Screen name="Gyno" component={Gyno} /> 
   <Stack.Screen name="PdfViewer" component={PdfViewer} />
   <Stack.Screen name="PdfViewer2" component={PdfViewer2} />
   <Stack.Screen name="PdfViewer3" component={PdfViewer3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
