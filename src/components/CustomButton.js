import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D3B59',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'serif',
    alignItems: 'center',
    textAlign: 'center',
  },
});