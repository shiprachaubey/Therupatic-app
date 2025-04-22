// screens/ReminderImageScreen.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function ReminderImageScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <Image
        source={require('../assets/images/reminder.jpg')}
        style={styles.fullImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});
