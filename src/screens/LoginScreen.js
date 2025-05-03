
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet ,Alert} from 'react-native';
// import InputField from '../components/InputField';
// import CustomButton from '../components/CustomButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Missing Fields', 'Please enter both email and password');
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       const response = await fetch('https://admin.gmtherapeutics.com/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
//       console.log('Login response:', data); // Helpful for debugging
  
//       if (data.success) {
//         const user = data.user;
  
//         // Optional: Store user or token here using AsyncStorage or Context
  
//         Alert.alert('Login Successful', `Welcome ${user.user_name}!`, [
//           { text: 'OK', onPress: () => navigation.navigate('Home') },
//         ]);
//       } else {
//         Alert.alert('Login Failed', data.message || 'Invalid Email or Password');
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       Alert.alert('Error', 'Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
  


//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Login</Text>
//       <Text style={styles.label}>Welcome !!</Text>


//       <InputField
//   label="EMAIL"
//   icon="mail"
//   value={email}
//   onChangeText={setEmail}
//   variant="floating" // Floating label
// />

// <InputField
//   label="PASSWORD"
//   icon="lock-closed"
//   isPassword
//   secureTextEntry
//   value={password}
//   onChangeText={setPassword}
//   variant="filled" // Classic filled input
// />


//       <TouchableOpacity style={styles.forgot}>
//         <Text style={styles.forgotText}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <CustomButton title="Login" onPress={handleLogin} />

//       <TouchableOpacity style={styles.register}>
//         <Text style={styles.registerText}>
//           Don’t have an account yet?{' '}
//           <Text
//             style={{ color: '#2D3B59' }}
//           >
//             Register Now
//           </Text>
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//       padding: 20,
//       flex: 1,
//       justifyContent: 'center',
//       backgroundColor: '#fff',
//     },
    
//     header: {
//       textAlign: 'center',
//        fontSize: 40,
//       fontFamily: 'gilroy',
//       fontStyle: 'bold',
//       color: '#2D3B59',
//       marginTop: 20, 
//     marginBottom: 20,
//     alignSelf: 'center',
//     },
//     label: {
//       fontFamily: 'serif',
//       fontSize: 16,
//       marginLeft: 10,
//       color: '#2D3B59',
//     },
//     forgot: {
//       alignItems: 'flex-end',
//       marginBottom: 20,
//       marginTop: 5,
//     },
//     forgotText: {
//       fontFamily: 'serif',
//       color: '#2D3B59',
//     },
//     register: {
//       marginTop: 30,
//       alignItems: 'center',
//     },
//     registerText: {
//       fontFamily: 'serif',
//       color: '#000',
//     },
//   });

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://admin.gmtherapeutics.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data); // Debug

      if (data.success) {
        const user = data.user;

        // Save login state
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('user', JSON.stringify(user));

        Alert.alert('Login Successful', `Welcome ${user.user_name}!`, [
          { text: 'OK', onPress: () => navigation.replace('Home') },
        ]);
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid Email or Password');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.label}>Welcome !!</Text>

      <InputField
        label="EMAIL"
        icon="mail"
        value={email}
        onChangeText={setEmail}
        variant="floating"
      />

      <InputField
        label="PASSWORD"
        icon="lock-closed"
        isPassword
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        variant="filled"
      />

      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <CustomButton title="Login" onPress={handleLogin} loading={loading} />

      <TouchableOpacity style={styles.register}>
        <Text style={styles.registerText}>
          Don’t have an account yet?{' '}
          <Text style={{ color: '#2D3B59' }}>Register Now</Text>
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
