
// import React from 'react';
// import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
// import Pdf from 'react-native-pdf';

// const { width, height } = Dimensions.get('window');

// export default function PdfViewer({ route }) {
//   const { url } = route.params;

//   return (
//     <View style={styles.container}>
//       <Pdf
//         source={{ uri: url }}
//         style={styles.pdf}
//         onLoadComplete={(numberOfPages, filePath) => {
//           console.log(`✅ PDF loaded: ${numberOfPages} pages`);
//         }}
//         onPageChanged={(page, numberOfPages) => {
//           console.log(`📄 Page: ${page} / ${numberOfPages}`);
//         }}
//         onError={(error) => {
//           console.log('❌ PDF load error:', error);
//         }}
//         activityIndicator={<ActivityIndicator size="large" color="#2D3B59" />}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   pdf: {
//     flex: 1,
//     width,
//     height,
//   },
// });

import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, Text, Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';

const { width, height } = Dimensions.get('window');

export default function PdfViewer({ route }) {
  const { url } = route.params;
  const [error, setError] = useState(false);

  const validateFile = async () => {
    if (!url || !url.startsWith('file://')) {
      setError(true);
      return;
    }

    const filePath = url.replace('file://', '');
    const exists = await RNFetchBlob.fs.exists(filePath);
    if (!exists) {
      setError(true);
      Alert.alert('Error', 'PDF file not found. Try refreshing when online.');
    }
  };

  React.useEffect(() => {
    validateFile();
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ PDF not found or cannot be loaded.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: url }}
        style={styles.pdf}
        onLoadComplete={(pages) => {
          console.log(`✅ Loaded PDF: ${pages} pages`);
        }}
        onPageChanged={(page, total) => {
          console.log(`📄 Page: ${page}/${total}`);
        }}
        onError={(err) => {
          console.log('❌ PDF load error:', err);
          setError(true);
        }}
        activityIndicator={<ActivityIndicator size="large" color="#2D3B59" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width,
    height,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#CC0000',
    textAlign: 'center',
  },
});
