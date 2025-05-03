// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');

// export default function SkinCareScreen() {
//   const navigation = useNavigation();

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
//         <Icon name="arrow-back" size={28} color="black" />
//       </TouchableOpacity>

//       <Text style={styles.header}>GYNECOLOGY FOLDER</Text>

//       {/* Folder Card */}
//       <TouchableOpacity
//         style={[styles.card, { backgroundColor: '#C4A340' }]}
//         onPress={() => navigation.navigate('PdfViewer3')}
//       >
//         <Image
//           source={require('../assets/images/gyno.jpeg')}
//           style={styles.cardImage}
//           resizeMode="cover"
//         />
//         <Text style={styles.cardLabel}>GYNO FOLDER</Text>
//       </TouchableOpacity>

//       {/* Reminder Card */}
//       <TouchableOpacity style={[styles.card, { backgroundColor: '#2F3B6B' }]}
//      onPress={() => navigation.navigate('Reminder3')}>
//         <Image
//           source={require('../assets/images/reminder.jpg')}
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
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function GynocologyScreen() {
  const navigation = useNavigation();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.post(
          'https://admin.gmtherapeutics.com/api/categories/init',
          {
            page_no: '1',
            max_page: '1',
            max_per_page: '100',
          },
          {
            headers: {
              apiToken: '$2y$10$pWdBjGrU/owXXhVOO8N6rOCo.TJESwURN39hWlpDarPLT9QDPd.ZG',
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const categories = response.data?.categories || [];

        const gyneCategory = categories.find(
          (cat) => cat.category_name?.toLowerCase().includes('gynecology')
        );

        const pdfPath = gyneCategory?.pdffiles?.[0]?.pdf_file;

        if (pdfPath) {
          const fullUrl = `https://admin.gmtherapeutics.com/${pdfPath.replace(/^\/+/, '')}`;
          setPdfUrl(fullUrl);
        } else {
          console.warn('No PDF found for Gynecology category');
        }
      } catch (error) {
        console.error('Error fetching Gynecology PDF:', error);
      }
    };

    fetchPdf();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>GYNECOLOGY FOLDER</Text>

      {/* Folder Card */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#C4A340' }]}
        onPress={() => {
          if (pdfUrl) {
            navigation.navigate('PdfViewer3', { url: pdfUrl });
          } else {
            Alert.alert('PDF Not Found', 'No file available for Gynecology folder right now.');
          }
        }}
      >
        <Image
          source={require('../assets/images/gyno.jpeg')}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <Text style={styles.cardLabel}>GYNO FOLDER</Text>
      </TouchableOpacity>

      {/* Reminder Card */}
      <TouchableOpacity style={[styles.card, { backgroundColor: '#2F3B6B' }]}
        onPress={() => navigation.navigate('Reminder3')}>
        <Image
          source={require('../assets/images/reminder.jpg')}
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
