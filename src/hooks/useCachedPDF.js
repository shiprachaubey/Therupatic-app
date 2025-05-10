import { useState, useEffect } from 'react';
import RNFetchBlob from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

export const useCachedPDF = (categoryName, storageKey, filename) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const LOCAL_PDF_PATH = `${RNFetchBlob.fs.dirs.DocumentDir}/${filename}`;

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const lastStoredUrl = await AsyncStorage.getItem(storageKey);
        const fileExists = await RNFetchBlob.fs.exists(LOCAL_PDF_PATH);

        if (lastStoredUrl && fileExists) {
          console.log(`📁 Using cached PDF for ${categoryName}`);
          setPdfUrl(`file://${LOCAL_PDF_PATH}`);
          setLoading(false);
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

        const categories = response.data?.categories || [];
        const category = categories.find(cat =>
          cat.category_name?.toLowerCase().includes(categoryName.toLowerCase())
        );

        const remotePdfPath = category?.pdffiles?.[0]?.pdf_file;
        if (!remotePdfPath) {
          Alert.alert('Not Found', `No ${categoryName} PDF found on server.`);
          setLoading(false);
          return;
        }

        const remoteUrl = `https://admin.gmtherapeutics.com/${remotePdfPath.replace(/^\/+/, '')}`;

        if (lastStoredUrl !== remoteUrl || !fileExists) {
          console.log(`📥 Downloading ${categoryName} PDF...`);
          if (fileExists) await RNFetchBlob.fs.unlink(LOCAL_PDF_PATH);

          await RNFetchBlob.config({ path: LOCAL_PDF_PATH }).fetch('GET', remoteUrl);
          await AsyncStorage.setItem(storageKey, remoteUrl);
        }

        setPdfUrl(`file://${LOCAL_PDF_PATH}`);
      } catch (err) {
        console.error(`❌ Error loading ${categoryName} PDF:`, err);

        const fallback = await RNFetchBlob.fs.exists(LOCAL_PDF_PATH);
        if (fallback) {
          setPdfUrl(`file://${LOCAL_PDF_PATH}`);
          Alert.alert('Offline Mode', `Showing last downloaded ${categoryName} PDF.`);
        } else {
          Alert.alert('Error', `No internet and no offline file for ${categoryName}.`);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, []);

  return { pdfUrl, loading };
};
