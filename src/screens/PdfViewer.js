// // // import React from 'react';
// // // import { View, Dimensions } from 'react-native';
// // // import Pdf from 'react-native-pdf';

// // // const PdfViewer = () => {
// // //   const source = { uri: 'bundle-assets://skin.pdf' }; 

// // //   return (
// // //     <View style={{ flex: 1 }}>
// // //       <Pdf
// // //         source={source}
// // //         onLoadComplete={(pages, filePath) => {
// // //           console.log(`PDF loaded: ${pages} pages from ${filePath}`);
// // //         }}
// // //         onError={(error) => {
// // //           console.log('PDF Load Error:', error);
// // //         }}
// // //         style={{ flex: 1, width: Dimensions.get('window').width }}
// // //       />
// // //     </View>
// // //   );
// // // };

// // // export default PdfViewer;

// // // import React from 'react';
// // // import { View, Dimensions } from 'react-native';
// // // import Pdf from 'react-native-pdf';

// // // export default function PdfViewer({ route }) {
// // //   const { url } = route.params;

// // //   return (
// // //     <View style={{ flex: 1 }}>
// // //       <Pdf
// // //         source={{ uri: url, cache: true }}
// // //         style={{ flex: 1, width: Dimensions.get('window').width }}
// // //         onLoadComplete={(numberOfPages) => {
// // //           console.log(`Loaded PDF with ${numberOfPages} pages`);
// // //         }}
// // //         onError={(error) => {
// // //           console.log('PDF load error:', error);
// // //         }}
// // //       />
// // //     </View>
// // //   );
// // // }
// // import React, { useEffect } from 'react';
// // import { View, StyleSheet, ActivityIndicator } from 'react-native';
// // import { WebView } from 'react-native-webview';

// // export default function PdfViewer({ route }) {
// //   const { url } = route.params;

// //   useEffect(() => {
// //     console.log('📄 Google Docs PDF URL:', url);
// //   }, [url]);

// //   const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

// //   return (
// //     <View style={styles.container}>
// //       <WebView
// //         source={{ uri: viewerUrl }}
// //         style={styles.webview}
// //         startInLoadingState
// //         renderLoading={() => <ActivityIndicator size="large" color="#2D3B59" />}
// //         onError={(e) => console.log('WebView Load Error:', e.nativeEvent)}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   webview: {
// //     flex: 1,
// //   },
// // });

// // import React, { useEffect } from 'react';
// // import { View, StyleSheet, ActivityIndicator } from 'react-native';
// // import { WebView } from 'react-native-webview';

// // export default function PdfViewer({ route }) {
// //   const { url } = route.params;

// //   useEffect(() => {
// //     console.log('📄 Google Docs PDF URL:', url);
// //   }, [url]);

// //   const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

// //   return (
// //     <View style={styles.container}>
// //       <WebView
// //         source={{ uri: viewerUrl }}
// //         style={styles.webview}
// //         startInLoadingState
// //         renderLoading={() => <ActivityIndicator size="large" color="#2D3B59" />}
// //         onError={(e) => console.log('WebView Load Error:', e.nativeEvent)}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   webview: {
// //     flex: 1,
// //   },
// // });

// import React from 'react';
// import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
// import Pdf from 'react-native-pdf';

// export default function PdfViewer({ route }) {
//   const { url } = route.params;
//   const source = { uri: url, cache: true };

//   return (
//     <View style={styles.container}>
//       <Pdf
//         source={source}
//         onLoadComplete={(numberOfPages) => {
//           console.log(`✅ Loaded ${numberOfPages} pages`);
//         }}
//         onError={(error) => {
//           console.log('❌ PDF load error:', error);
//         }}
//         style={styles.pdf}
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
