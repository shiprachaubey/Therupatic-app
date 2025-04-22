// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function HomeScreen() {
//   const navigation = useNavigation(); // ✅ This should be INSIDE the component

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>HOME</Text>

//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => navigation.navigate('Skin')}
//       >
//         <Image
//           source={require('../assets/images/skin.jpg')}
//           style={styles.image}
//         />
//         <Text style={styles.label}>SKIN CARE</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card}
//        onPress={() => navigation.navigate('GeneralPhysican')}>
//         <Image
//           source={require('../assets/images/physican.jpeg')}
//           style={styles.image}
//         />
//         <Text style={styles.label}>GENERAL PHYSICIAN & ORTHOPEDIC</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card}
//        onPress={() => navigation.navigate('Gyno')}>
//         <Image
//           source={require('../assets/images/gyno.jpeg')}
//           style={styles.image}
//         />
//         <Text style={styles.label}>GYNECOLOGY & OBSTETRICS</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#F5F5F5',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#2D3B59',
//     marginBottom: 20,
//     fontFamily: 'cursive',
//   },
//   card: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: 'black', // Updated border color to black
//     marginBottom: 20,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   label: {
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '600',
//     padding: 10,
//     fontStyle: 'italic',
//   },
// });
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>HOME</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Skin')}
      >
        <Image
          source={require('../assets/images/skin.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.label}>SKIN CARE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('GeneralPhysican')}
      >
        <Image
          source={require('../assets/images/physican.jpeg')}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.label}>GENERAL PHYSICIAN & ORTHOPEDIC</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Gyno')}
      >
        <Image
          source={require('../assets/images/gyno.jpeg')}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.label}>GYNECOLOGY & OBSTETRICS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  header: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#2D3B59',
    marginBottom: height * 0.03,
    fontFamily: 'Gilroy',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: width * 0.05,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: height * 0.025,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: height * 0.25,
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
  },
  label: {
    textAlign: 'center',
    fontSize: width * 0.045,
    fontWeight: '600',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    fontStyle: 'serif',
  },
});
