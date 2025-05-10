
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
