// import React, { useEffect } from 'react';
// import { View, StyleSheet, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';

// export default function PdfViewer({ route }) {
//   const { url } = route.params;

//   useEffect(() => {
//     console.log('📄 Google Docs PDF URL:', url);
//   }, [url]);

//   const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

//   return (
//     <View style={styles.container}>
//       <WebView
//         source={{ uri: viewerUrl }}
//         style={styles.webview}
//         startInLoadingState
//         renderLoading={() => <ActivityIndicator size="large" color="#2D3B59" />}
//         onError={(e) => console.log('WebView Load Error:', e.nativeEvent)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
// });

// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
// import Pdf from 'react-native-pdf';
// import RNFetchBlob from 'react-native-blob-util';

// export default function PdfViewer({ route }) {
//   const { url } = route.params;
//   const [localPath, setLocalPath] = useState(null);

//   useEffect(() => {
//     const downloadPdf = async () => {
//       try {
//         const { config, fs } = RNFetchBlob;
//         const pdfPath = `${fs.dirs.DocumentDir}/temp.pdf`;

//         await config({ path: pdfPath }).fetch('GET', url);

//         setLocalPath(pdfPath);
//       } catch (error) {
//         console.log('Download error:', error);
//       }
//     };

//     downloadPdf();
//   }, [url]);

//   if (!localPath) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#2D3B59" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Pdf
//         source={{ uri: `file://${localPath}` }}
//         style={styles.pdf}
//         onLoadComplete={(pages) => console.log(`Loaded ${pages} pages`)}
//         onError={(error) => console.log('PDF render error:', error)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//   },
// });

import React from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

const { width, height } = Dimensions.get('window');

export default function PdfViewer({ route }) {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: url }}
        style={styles.pdf}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`✅ PDF loaded: ${numberOfPages} pages`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`📄 Page: ${page} / ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log('❌ PDF load error:', error);
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
});
