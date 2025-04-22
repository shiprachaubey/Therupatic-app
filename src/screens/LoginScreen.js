
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.label}>Welcome !!</Text>

      <InputField
  label="EMAIL"
  icon="mail"
  value={email}
  onChangeText={setEmail}
  variant="floating" // Floating label
/>

<InputField
  label="PASSWORD"
  icon="lock-closed"
  isPassword
  secureTextEntry
  value={password}
  onChangeText={setPassword}
  variant="filled" // Classic filled input
/>


      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <CustomButton
        title="Login"
        onPress={() => navigation.navigate('Home')}
      />

      <TouchableOpacity style={styles.register}>
        <Text style={styles.registerText}>
          Don’t have an account yet?{' '}
          <Text
            style={{ color: '#2D3B59' }}
            onPress={() => navigation.navigate('Register')}
          >
            Register Now
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    
    header: {
      textAlign: 'center',
       fontSize: 40,
      fontFamily: 'gilroy',
      fontStyle: 'bold',
      color: '#2D3B59',
      marginTop: 20, 
    marginBottom: 20,
    alignSelf: 'center',
    },
    label: {
      fontFamily: 'serif',
      fontSize: 16,
      marginLeft: 10,
      color: '#2D3B59',
    },
    forgot: {
      alignItems: 'flex-end',
      marginBottom: 20,
      marginTop: 5,
    },
    forgotText: {
      fontFamily: 'serif',
      color: '#2D3B59',
    },
    register: {
      marginTop: 30,
      alignItems: 'center',
    },
    registerText: {
      fontFamily: 'serif',
      color: '#000',
    },
  });