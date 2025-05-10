
// import React, { useState } from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   ActivityIndicator
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useRoute, useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// export default function ReminderCard() {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { imageUrl } = route.params; // Full image URL is passed directly

//   const [isLoading, setIsLoading] = useState(true);
//   const [imageError, setImageError] = useState(false);

//   const handleImageLoad = () => {
//     setIsLoading(false);
//   };

//   const handleImageError = () => {
//     setImageError(true);
//     setIsLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
//         <Icon name="arrow-back" size={28} color="white" />
//       </TouchableOpacity>

//       {/* Loading Indicator */}
//       {isLoading && !imageError && (
//         <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
//       )}

//       {/* Image Display */}
//       <Image
//         source={
//           imageError
//             ? require('../assets/images/reminder.jpg') // fallback
//             : { uri: imageUrl } // full valid URL
//         }
//         style={styles.image}
//         resizeMode="contain"
//         onLoad={handleImageLoad}
//         onError={handleImageError}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#000',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backIcon: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1,
//   },
//   image: {
//     width: width,
//     height: height * 0.8,
//   },
//   loadingIndicator: {
//     position: 'absolute',
//     top: height / 2 - 20,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const { width, height } = Dimensions.get('window');

export default function ReminderCard() {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUrl } = route.params;

  const [localImagePath, setLocalImagePath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getSlug = () => {
    const parts = imageUrl.split('/');
    return parts[parts.length - 1].split('?')[0].replace(/\W/g, '_');
  };

  const CACHE_KEY = `REMINDER_${getSlug()}`;
  const LOCAL_PATH = `${RNFetchBlob.fs.dirs.DocumentDir}/${getSlug()}`;

  const loadImage = async () => {
    const net = await NetInfo.fetch();
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    const exists = await RNFetchBlob.fs.exists(LOCAL_PATH);

    // If online, fetch and cache
    if (net.isConnected) {
      try {
        await RNFetchBlob.config({ path: LOCAL_PATH }).fetch('GET', imageUrl);
        await AsyncStorage.setItem(CACHE_KEY, LOCAL_PATH);
        setLocalImagePath(`file://${LOCAL_PATH}`);
      } catch (e) {
        console.error('❌ Download error:', e);
        if (exists) {
          setLocalImagePath(`file://${LOCAL_PATH}`);
          Alert.alert('Offline Mode', 'Using saved image.');
        } else {
          setImageError(true);
        }
      }
    } else {
      // Offline: Use cache
      if (exists && cached) {
        setLocalImagePath(`file://${LOCAL_PATH}`);
        Alert.alert('Offline Mode', 'Using saved image.');
      } else {
        setImageError(true);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadImage();
  }, []);

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
            : { uri: localImagePath }
        }
        style={styles.image}
        resizeMode="contain"
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
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
