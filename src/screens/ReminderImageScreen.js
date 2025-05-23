// // ReminderCard.js
// import React from 'react';
// import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useRoute, useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// export default function ReminderCard() {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { imageUrl } = route.params;

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
//         <Icon name="arrow-back" size={28} color="white" />
//       </TouchableOpacity>
//       <Image
//         source={{ uri: imageUrl }}
//         style={styles.image}
//         resizeMode="contain"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#000',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   backIcon: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1,
//   },
//   image: {
//     width: width,
//     height: height * 0.8
//   }
// });

// ReminderCard.js
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
