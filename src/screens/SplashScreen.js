import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SplashScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Top 40%: Product image */}
      <View style={styles.topContainer}>
        <Image
            source={require('../assets/images/product.jpg')}
          style={styles.topImage}
          resizeMode="cover"
        />
      </View>

      {/* Bottom 60%: Centered logo + text + bottom button */}
      <View style={styles.bottomContainer}>
        {/* Centered content */}
        <View style={styles.centerContent}>
          <Image
            source={require('../assets/images/logo.jpg')}
            style={styles.logo}
          />
        </View>

        {/* Button at bottom */}
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 4,
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    flex: 6,
    paddingHorizontal: 20,
    justifyContent: 'space-between', // Space between centerContent and button
    paddingBottom: 30,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#2D3B59',
  },
  button: {
    backgroundColor: '#2D3B59',
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Georgia',
  },
});
