import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase';

export default function FilesScreen() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const storage = getStorage();
    const listRef = ref(storage, `files/${auth.currentUser.uid}`);
    const res = await listAll(listRef);
    const filesData = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, url };
      })
    );
    setFiles(filesData);
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.type === 'success') {
        const storage = getStorage();
        const fileRef = ref(storage, `files/${auth.currentUser.uid}/${result.name}`);
        const response = await fetch(result.uri);
        const blob = await response.blob();
        await uploadBytes(fileRef, blob);
        Alert.alert('Éxito', 'Archivo subido correctamente');
        fetchFiles();
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo subir el archivo');
    }
  };

  return (
    <View>
      <Button title="Subir archivo" onPress={handleUpload} />
      <FlatList
        data={files}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}