
// // import React from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Image,
// //   TouchableOpacity,
// //   ScrollView,
// //   Dimensions, StatusBar
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AsyncStorage from '@react-native-async-storage/async-storage';


// // const { width, height } = Dimensions.get('window');

// // export default function HomeScreen() {
// //   const navigation = useNavigation();
// //   const handleLogout = async () => {
// //     try {
// //       await AsyncStorage.clear();
// //       navigation.replace('Splash');
// //     } catch (error) {
// //       console.error('Logout failed:', error);
// //     }
// //   };
  

// //   return (
// //     <SafeAreaView style={{flex:1}}> 
// //     <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
// //     <ScrollView contentContainerStyle={styles.container}>
// //       {/* <Text style={styles.header}>HOME</Text> */}
      
// //       <View style={styles.headerRow}>
// //   <Text style={styles.header}>HOME</Text>
// //   <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
// //     <Text style={styles.logoutText}>Logout</Text>
// //   </TouchableOpacity>
// // </View>
     

// //      <TouchableOpacity
// //         style={styles.card}
// //         onPress={() => navigation.navigate('GeneralPhysican')}
// //       >
// //         <Image
// //           source={require('../assets/images/physician.jpeg')}
// //           style={styles.image}
// //           resizeMode="cover"
// //         />
// //         <Text style={styles.label}>GENERAL PHYSICIAN & ORTHOPEDIC</Text>
// //       </TouchableOpacity> 
// //       <TouchableOpacity
// //         style={styles.card}
// //         onPress={() => navigation.navigate('Gyno')}
// //       >
// //         <Image
// //           source={require('../assets/images/gyno.jpeg')}
// //           style={styles.image}
// //           resizeMode="cover"
// //         />
// //         <Text style={styles.label}>GYNECOLOGY & OBSTETRICS</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity
// //         style={styles.card}
// //         onPress={() => navigation.navigate('Skin')}
// //       >
// //         <Image
// //           source={require('../assets/images/skin.jpg')}
// //           style={styles.image}
// //           resizeMode="cover"
// //         />
// //         <Text style={styles.label}>SKIN CARE</Text>
// //       </TouchableOpacity>

      
     
// //     </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     paddingVertical: height * 0.03,
// //     paddingHorizontal: width * 0.05,
// //     backgroundColor: '#F5F5F5',
// //     alignItems: 'center',
// //   },
// //   headerRow: {
// //     flexDirection: 'row',
// //     fontFamily: 'Gilroy',
// //     fontWeight: 'bold',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     width: '100%',
// //     marginBottom: height * 0.03,
// //   },
// //   logoutBtn: {
// //     backgroundColor: '#2D3B59',
// //     paddingVertical: 6,
// //     paddingHorizontal: 12,
// //     borderRadius: 8,
// //   },
// //   logoutText: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: width * 0.035,
// //   },
  
// //   // header: {
// //   //   fontSize: width * 0.08,
// //   //   fontWeight: 'bold',
// //   //   color: '#2D3B59',
// //   //   marginBottom: height * 0.03,
// //   //   fontFamily: 'Gilroy',
// //   // },
// //   card: {
// //     width: '100%',
// //     backgroundColor: '#fff',
// //     borderRadius: width * 0.05,
// //     borderWidth: 2,
// //     borderColor: 'black',
// //     marginBottom: height * 0.025,
// //     overflow: 'hidden',
// //     elevation: 3,
// //   },
// //   image: {
// //     width: '100%',
// //     height: height * 0.25,
// //     borderTopLeftRadius: width * 0.05,
// //     borderTopRightRadius: width * 0.05,
// //   },
// //   label: {
// //     textAlign: 'center',
// //     fontSize: width * 0.045,
// //     fontWeight: '600',
// //     paddingVertical: height * 0.015,
// //     paddingHorizontal: width * 0.03,
// //     fontStyle: 'serif',
// //   },
// // });

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   StatusBar,
//   Alert,
//   RefreshControl,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const { width, height } = Dimensions.get('window');

// export default function HomeScreen() {
//   const navigation = useNavigation();
//   const [categories, setCategories] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.clear();
//       navigation.replace('Splash');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.post(
//         'https://admin.gmtherapeutics.com/api/categories/init',
//         { page_no: '1', max_page: '1', max_per_page: '100' },
//         {
//           headers: {
//             apiToken: '$2y$10$pWdBjGrU/owXXhVOO8N6rOCo.TJESwURN39hWlpDarPLT9QDPd.ZG',
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       setCategories(response.data?.categories || []);
//     } catch (error) {
//       console.error('❌ Failed to fetch categories:', error);
//       Alert.alert('Error', 'Failed to load categories');
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchCategories().finally(() => setRefreshing(false));
//   }, []);

//   const getStaticImage = (name) => {
//     const lower = name.toLowerCase();
//     if (lower.includes('physician')) return require('../assets/images/physician.jpeg');
//     if (lower.includes('gyn')) return require('../assets/images/gyno.jpeg');
//     if (lower.includes('skin')) return require('../assets/images/skin.jpg');
//    return require('../assets/images/fallback.jpeg'); // Default static fallback
//   };

//   const handleCardPress = (name) => {
//     const lower = name.toLowerCase();
//     if (lower.includes('physician')) navigation.navigate('GeneralPhysican');
//     else if (lower.includes('gyn')) navigation.navigate('Gyno');
//     else if (lower.includes('skin')) navigation.navigate('Skin');
//     else Alert.alert('Navigation not set', `No screen mapped for ${name}`);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
//       <ScrollView
//         contentContainerStyle={styles.container}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         <View style={styles.headerRow}>
//           <Text style={styles.header}>HOME</Text>
//           <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
//             <Text style={styles.logoutText}>Logout</Text>
//           </TouchableOpacity>
//         </View>

//         {categories.map((cat) => (
//           <TouchableOpacity
//             key={cat.id}
//             style={styles.card}
//             onPress={() => navigation.navigate('Category', { categoryName: cat.category_name })}
//           >
//             <Image
//               source={getStaticImage(cat.category_name)}
//               style={styles.image}
//               resizeMode="cover"
//             />
//             <Text style={styles.label}>{cat.category_name}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: height * 0.03,
//     paddingHorizontal: width * 0.05,
//     backgroundColor: '#F5F5F5',
//     alignItems: 'center',
//   },
//   headerRow: {
//     flexDirection: 'row',
//     fontFamily: 'Gilroy',
//     fontWeight: 'bold',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: height * 0.03,
//   },
//   header: {
//     fontSize: width * 0.08,
//     fontWeight: 'bold',
//     color: '#2D3B59',
//   },
//   logoutBtn: {
//     backgroundColor: '#2D3B59',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: width * 0.035,
//   },
//   card: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: width * 0.05,
//     borderWidth: 2,
//     borderColor: 'black',
//     marginBottom: height * 0.025,
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: height * 0.25,
//     borderTopLeftRadius: width * 0.05,
//     borderTopRightRadius: width * 0.05,
//   },
//   label: {
//     textAlign: 'center',
//     fontSize: width * 0.045,
//     fontWeight: '600',
//     paddingVertical: height * 0.015,
//     paddingHorizontal: width * 0.03,
//     fontStyle: 'serif',
//   },
// });
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
  RefreshControl,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Splash');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const saveCategoriesToCache = async (data) => {
    try {
      await AsyncStorage.setItem('categories_cache', JSON.stringify(data));
    } catch (e) {
      console.warn('⚠️ Failed to save cache:', e);
    }
  };

  const loadCategoriesFromCache = async () => {
    try {
      const cached = await AsyncStorage.getItem('categories_cache');
      if (cached) {
        setCategories(JSON.parse(cached));
      }
    } catch (e) {
      console.warn('⚠️ Failed to load cache:', e);
    }
  };

  const fetchCategories = async () => {
    try {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        Alert.alert('Offline', 'No internet connection. Showing saved data.');
        await loadCategoriesFromCache();
        return;
      }

      const response = await axios.post(
        'https://admin.gmtherapeutics.com/api/categories/init',
        { page_no: '1', max_page: '1', max_per_page: '100' },
        {
          headers: {
            apiToken: '$2y$10$pWdBjGrU/owXXhVOO8N6rOCo.TJESwURN39hWlpDarPLT9QDPd.ZG',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const data = response.data?.categories || [];
      setCategories(data);
      await saveCategoriesToCache(data);
    } catch (error) {
      console.error('❌ Fetch failed, loading cache instead:', error);
      Alert.alert('Fetch failed', 'Loading saved categories...');
      await loadCategoriesFromCache();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCategories().finally(() => setRefreshing(false));
  }, []);

  const getStaticImage = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('physician')) return require('../assets/images/physician.jpeg');
    if (lower.includes('gyn')) return require('../assets/images/gyno.jpeg');
    if (lower.includes('skin')) return require('../assets/images/skin.jpg');
    return require('../assets/images/fallback.jpeg');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.headerRow}>
          <Text style={styles.header}>HOME</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.card}
            onPress={() => navigation.navigate('Category', { categoryName: cat.category_name })}
          >
            <Image
              source={getStaticImage(cat.category_name)}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.label}>{cat.category_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ... Keep the same styles as before
const styles = StyleSheet.create({
  container: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.03,
  },
  header: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#2D3B59',
  },
  logoutBtn: {
    backgroundColor: '#2D3B59',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.035,
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
