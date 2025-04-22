import React from 'react';
import { View, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = () => {
  const source = { uri: 'bundle-assets://skin.pdf' }; 

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={source}
        onLoadComplete={(pages, filePath) => {
          console.log(`PDF loaded: ${pages} pages from ${filePath}`);
        }}
        onError={(error) => {
          console.log('PDF Load Error:', error);
        }}
        style={{ flex: 1, width: Dimensions.get('window').width }}
      />
    </View>
  );
};

export default PdfViewer;
