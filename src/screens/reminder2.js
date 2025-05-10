// // screens/ReminderImageScreen.js
// import React from 'react';
// import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// export default function ReminderImageScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
//         <Icon name="arrow-back" size={30} color="#fff" />
//       </TouchableOpacity>

//       <Image
//         source={require('../assets/images/reminder2.jpg')}
//         style={styles.fullImage}
//         resizeMode="contain"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullImage: {
//     width: '100%',
//     height: '100%',
//   },
//   backIcon: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1,
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ReminderCard() {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUrl } = route.params; // Full image URL is passed directly

  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Icon name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {/* Loading Indicator */}
      {isLoading && !imageError && (
        <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
      )}

      {/* Image Display */}
      <Image
        source={
          imageError
            ? require('../assets/images/reminder.jpg') // fallback
            : { uri: imageUrl } // full valid URL
        }
        style={styles.image}
        resizeMode="contain"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: width,
    height: height * 0.8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: height / 2 - 20,
  },
});
