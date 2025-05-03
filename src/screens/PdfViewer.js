// // import React from 'react';
// // import { View, Dimensions } from 'react-native';
// // import Pdf from 'react-native-pdf';

// // const PdfViewer = () => {
// //   const source = { uri: 'bundle-assets://skin.pdf' }; 

// //   return (
// //     <View style={{ flex: 1 }}>
// //       <Pdf
// //         source={source}
// //         onLoadComplete={(pages, filePath) => {
// //           console.log(`PDF loaded: ${pages} pages from ${filePath}`);
// //         }}
// //         onError={(error) => {
// //           console.log('PDF Load Error:', error);
// //         }}
// //         style={{ flex: 1, width: Dimensions.get('window').width }}
// //       />
// //     </View>
// //   );
// // };

// // export default PdfViewer;

// // import React from 'react';
// // import { View, Dimensions } from 'react-native';
// // import Pdf from 'react-native-pdf';

// // export default function PdfViewer({ route }) {
// //   const { url } = route.params;

// //   return (
// //     <View style={{ flex: 1 }}>
// //       <Pdf
// //         source={{ uri: url, cache: true }}
// //         style={{ flex: 1, width: Dimensions.get('window').width }}
// //         onLoadComplete={(numberOfPages) => {
// //           console.log(`Loaded PDF with ${numberOfPages} pages`);
// //         }}
// //         onError={(error) => {
// //           console.log('PDF load error:', error);
// //         }}
// //       />
// //     </View>
// //   );
// // }
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

import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PdfViewer({ route }) {
  const { url } = route.params;

  useEffect(() => {
    console.log('📄 Google Docs PDF URL:', url);
  }, [url]);

  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: viewerUrl }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#2D3B59" />}
        onError={(e) => console.log('WebView Load Error:', e.nativeEvent)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

