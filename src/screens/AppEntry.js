import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppEntry({ navigation }) {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigation.replace('Home');
      } else {
        navigation.replace('Splash'); // or 'Login' if no splash screen
      }
      setChecking(false);
    };

    checkLogin();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2D3B59" />
      </View>
    );
  }

  return null;
}
