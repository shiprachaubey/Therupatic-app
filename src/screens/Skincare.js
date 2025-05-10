// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, StyleSheet, Image, TouchableOpacity,
//   ScrollView, Dimensions, Alert
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFetchBlob from 'react-native-blob-util';

// const { width } = Dimensions.get('window');

// export default function SkinCareScreen() {
//   const navigation = useNavigation();
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [reminderCardUrl, setReminderCardUrl] = useState(null);

//   const LOCAL_PDF_PATH = `${RNFetchBlob.fs.dirs.DocumentDir}/skin_care.pdf`;
//   const STORAGE_KEY = 'SKIN_CARE_PDF_URL';

//   useEffect(() => {
//     const loadPdf = async () => {
//       try {
//         const response = await axios.post(
//           'https://admin.gmtherapeutics.com/api/categories/init',
//           { page_no: '1', max_page: '1', max_per_page: '100' },
//           {
//             headers: {
//               apiToken: '$2y$10$pWdBjGrU/owXXhVOO8N6rOCo.TJESwURN39hWlpDarPLT9QDPd.ZG',
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );

//         const categories = response.data?.categories || [];
//         const skinCareCategory = categories.find(
//           (cat) => cat.category_name?.toLowerCase().includes('skin care')
//         );

//         const pdfFiles = skinCareCategory?.pdffiles?.filter(p => p.pdf_file) || [];
//         const reminderCard = skinCareCategory?.reminder_card;

//         if (reminderCard) {
//           const reminderWithTimestamp = `https://admin.gmtherapeutics.com/${reminderCard.replace(/^\/+/, '')}?t=${Date.now()}`;
//           setReminderCardUrl(reminderWithTimestamp);
//         }

//         if (pdfFiles.length === 0) {
//           Alert.alert('Not Found', 'No Skin Care PDF found on server.');
//           setLoading(false);
//           return;
//         }

//         const remotePdfPath = pdfFiles[pdfFiles.length - 1].pdf_file;
//         const baseUrl = `https://admin.gmtherapeutics.com/${remotePdfPath.replace(/^\/+/, '')}`;
//         const timestampedUrl = `${baseUrl}?t=${Date.now()}`;

//         const lastStoredUrl = await AsyncStorage.getItem(STORAGE_KEY);
//         const fileExists = await RNFetchBlob.fs.exists(LOCAL_PDF_PATH);

//         if (lastStoredUrl !== baseUrl || !fileExists) {
//           console.log('⬇️ Downloading updated Skin Care PDF...');
//           await RNFetchBlob.config({ path: LOCAL_PDF_PATH }).fetch('GET', timestampedUrl);
//           await AsyncStorage.setItem(STORAGE_KEY, baseUrl);
//         } else {
//           console.log('📁 Using cached Skin Care PDF');
//         }

//         setPdfUrl(`file://${LOCAL_PDF_PATH}`);
//       } catch (err) {
//         console.error('❌ Error loading Skin Care PDF:', err);
//         const exists = await RNFetchBlob.fs.exists(LOCAL_PDF_PATH);
//         if (exists) {
//           setPdfUrl(`file://${LOCAL_PDF_PATH}`);
//           Alert.alert('Offline Mode', 'Showing last downloaded Skin Care PDF.');
//         } else {
//           Alert.alert('Error', 'No internet and no offline file available.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPdf();
//   }, []);

//   const openPdf = async () => {
//     if (!pdfUrl) {
//       Alert.alert('Error', 'PDF is still loading or not available.');
//       return;
//     }

//     const exists = await RNFetchBlob.fs.exists(LOCAL_PDF_PATH);
//     if (exists) {
//       navigation.navigate('PdfViewer', { url: pdfUrl });
//     } else {
//       Alert.alert('Error', 'PDF file is missing.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
//         <Icon name="arrow-back" size={28} color="black" />
//       </TouchableOpacity>

//       <Text style={styles.header}>SKIN CARE</Text>

//       <TouchableOpacity
//         style={[styles.card, { backgroundColor: '#C4A340' }]}
//         onPress={openPdf}
//         disabled={loading}
//       >
//         <Image
//           source={require('../assets/images/skin.jpg')}
//           style={styles.cardImage}
//           resizeMode="cover"
//         />
//         <Text style={styles.cardLabel}>
//           {pdfUrl ? 'SKIN CARE FOLDER' : 'Loading PDF...'}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.card, { backgroundColor: '#2F3B6B' }]}
//         onPress={() => {
//           if (reminderCardUrl) {
//             navigation.navigate('Reminder', { imageUrl: reminderCardUrl });
//           } else {
//             Alert.alert('Not available', 'Reminder card is not available yet.');
//           }
//         }}
//       >
//         <Image
//           key={reminderCardUrl || 'fallback'}
//           source={
//             reminderCardUrl
//               ? { uri: reminderCardUrl }
//               : require('../assets/images/reminder.jpg')
//           }
//           style={styles.cardImage}
//           resizeMode="cover"
//         />
//         <Text style={[styles.cardLabel, { color: '#fff' }]}>REMINDER CARD</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingTop: 80,
//     backgroundColor: '#F8F8F8',
//     minHeight: '100%',
//   },
//   backIcon: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1,
//   },
//   header: {
//     fontSize: width * 0.06,
//     fontWeight: 'bold',
//     color: '#2D3B59',
//     fontFamily: 'gilroy',
//     textAlign: 'center',
//     marginBottom: 40,
//   },
//   card: {
//     flexDirection: 'row',
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 30,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     width: '100%',
//     elevation: 3,
//   },
//   cardImage: {
//     width: width * 0.25,
//     height: width * 0.25,
//     borderRadius: 15,
//     marginRight: 20,
//   },
//   cardLabel: {
//     flex: 1,
//     fontSize: width * 0.045,
//     fontWeight: '600',
//     fontStyle: 'italic',
//     color: '#000',
//   },
// });

import React, { useEffect, useState , useCallback } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  ScrollView, Dimensions, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'react-native-blob-util';
import { RefreshControl } from 'react-native';


const { width } = Dimensions.get('window'); 
export default function SkinCareScreen() {
  const navigation = useNavigation();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reminderCardUrl, setReminderCardUrl] = useState(null);

  const LOCAL_PDF_PATH = `${RNFetchBlob.fs.dirs.DocumentDir}/skin_care.pdf`;
  const STORAGE_KEY = 'SKIN_CARE_PDF_URL';

  const loadPdf = async () => {
    try {
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

      const categories = response.data?.categories || [];
      const skinCareCategory = categories.find(
        (cat) => cat.category_name?.toLowerCase().includes('skin care')
      );

      const pdfFiles = skinCareCategory?.pdffiles?.filter(p => p.pdf_file) || [];
      const reminderCard = skinCareCategory?.reminder_card;

      if (reminderCard) {
        const reminderWithTimestamp = `https://admin.gmtherapeutics.com/${reminderCard.replace(/^\/+/, '')}?t=${Date.now()}`;
        setReminderCardUrl(reminderWithTimestamp);
      }

      if (pdfFiles.length === 0) {
        Alert.alert('Not Found', 'No Skin Care PDF found on server.');
        return;
      }

      const remotePdfPath = pdfFiles[pdfFiles.length - 1].pdf_file;
      const baseUrl = `https://admin.gmtherapeutics.com/${remotePdfPath.replace(/^\/+/, '')}`;
      const timestampedUrl = `${baseUrl}?t=${Date.now()}`;

      const lastStoredUrl = await AsyncStorage.getItem(STORAGE_KEY);
      const fileExists = await RNFetchBlob.fs.exists(LOCAL_PDF_PATH);

      if (lastStoredUrl !== baseUrl || !fileExists) {
        console.log('⬇️ Downloading updated Skin Care PDF...');
        await RNFetchBlob.config({ path: LOCAL_PDF_PATH }).fetch('GET', timestampedUrl);
        await AsyncStorage.setItem(STORAGE_KEY, baseUrl);
      } else {
        console.log('📁 Using cached Skin Care PDF');
      }

      setPdfUrl(`file://${LOCAL_PDF_PATH}`);
    } catch (err) {
      console.error('❌ Error loading Skin Care PDF:', err);
      const exists = await RNFetchBlob.fs.exists(LOCAL_PDF_PATH);
      if (exists) {
        setPdfUrl(`file://${LOCAL_PDF_PATH}`);
        Alert.alert('Offline Mode', 'Showing last downloaded Skin Care PDF.');
      } else {
        Alert.alert('Error', 'No internet and no offline file available.');
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    loadPdf().finally(() => setLoading(false));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPdf().finally(() => setRefreshing(false));
  }, []);

  const openPdf = async () => {
    if (!pdfUrl) {
      Alert.alert('Error', 'PDF is still loading or not available.');
      return;
    }

    const exists = await RNFetchBlob.fs.exists(LOCAL_PDF_PATH);
    if (exists) {
      navigation.navigate('PdfViewer', { url: pdfUrl });
    } else {
      Alert.alert('Error', 'PDF file is missing.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>SKIN CARE</Text>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#C4A340' }]}
        onPress={openPdf}
        disabled={loading}
      >
        <Image
          source={require('../assets/images/skin.jpg')}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <Text style={styles.cardLabel}>
          {pdfUrl ? 'SKIN CARE FOLDER' : 'Loading PDF...'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#2F3B6B' }]}
        onPress={() => {
          if (reminderCardUrl) {
            navigation.navigate('Reminder', { imageUrl: reminderCardUrl });
          } else {
            Alert.alert('Not available', 'Reminder card is not available yet.');
          }
        }}
      >
        <Image
          key={reminderCardUrl || 'fallback'}
          source={
            reminderCardUrl
              ? { uri: reminderCardUrl }
              : require('../assets/images/reminder.jpg')
          }
          style={styles.cardImage}
          resizeMode="cover"
        />
        <Text style={[styles.cardLabel, { color: '#fff' }]}>REMINDER CARD</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: '#F8F8F8',
    minHeight: '100%',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#2D3B59',
    fontFamily: 'gilroy',
    textAlign: 'center',
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 15,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    elevation: 3,
  },
  cardImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 15,
    marginRight: 20,
  },
  cardLabel: {
    flex: 1,
    fontSize: width * 0.045,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#000',
  },
});
