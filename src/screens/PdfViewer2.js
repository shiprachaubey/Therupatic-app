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
