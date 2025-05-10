import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
 import HomeScreen from '../screens/HomeScreen'; 
import SkinCareScreen from '../screens/Skincare';
import Reminder from '../screens/Reminder';
import Reminder2 from '../screens/reminder2';
import Reminder3 from '../screens/reminder3';
import GeneralPhysican from '../screens/GeneralPhysican';
import Gyno from '../screens/Gynecology';
import PdfViewer from '../screens/PdfViewer';
import PdfViewer2 from '../screens/PdfViewer2';
import PdfViewer3 from '../screens/PdfViewer3';
import AppEntry from '../screens/AppEntry';
import CategoryScreen from '../screens/CategoryScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} /> */}
        <Stack.Navigator initialRouteName="AppEntry">
        <Stack.Screen name="AppEntry" component={AppEntry} options={{ headerShown: false }} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/> 
     <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
   <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> 
    
   <Stack.Screen name="Category" component={CategoryScreen}  options={{ headerShown: false }}/>
   <Stack.Screen name="Reminder" component={Reminder} options={{ headerShown: false }}/> 

   <Stack.Screen name="PdfViewer" component={PdfViewer} options={{ headerShown: false }}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
