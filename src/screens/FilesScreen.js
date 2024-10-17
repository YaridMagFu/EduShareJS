import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, FlatList, Linking, TextInput, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, setDoc, collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, storage, db } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import styles from './FileScreenStyles';

const FilesScreen = () => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDocente, setIsDocente] = useState(false);
  const [searchYear, setSearchYear] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    setCurrentUser(user);

    const fetchUserRole = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsDocente(userData.role === 'docente');
        } else {
          console.log('El documento no existe');
        }
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      const filesCollection = collection(db, 'files');
      const filesSnapshot = await getDocs(filesCollection);
      const filesList = filesSnapshot.docs.map(doc => doc.data());
      setFiles(filesList);
    };

    fetchFiles();
  }, []);

  const handleDocumentSelection = async () => {
    if (!isDocente) {
      Alert.alert('Permiso denegado', 'Solo los docentes pueden subir archivos');
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'cancel') return;

      const fileUri = result.assets[0].uri;
      const fileName = result.assets[0].name;

      if (!fileUri) {
        Alert.alert('Error', 'No se pudo obtener la URI del archivo');
        return;
      }

      setSelectedFile({ uri: fileUri, name: fileName });
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error al seleccionar archivo:', error);
      Alert.alert('Error', 'Hubo un problema al seleccionar el archivo');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert('Error', 'No se ha seleccionado ningún archivo');
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch(selectedFile.uri);
      const fileBlob = await response.blob();
      const fileRef = ref(storage, `files/${selectedFile.name}`);

      await uploadBytes(fileRef, fileBlob);
      const downloadURL = await getDownloadURL(fileRef);

      const uploadedBy = currentUser ? currentUser.displayName || 'Usuario Anónimo' : 'Usuario Anónimo';

      const fileDoc = {
        name: selectedFile.name,
        url: downloadURL,
        description: description,
        year: year, // Agregamos el año al documento
        uploadedBy: uploadedBy,
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'files', selectedFile.name), fileDoc);
      Alert.alert('Éxito', 'Archivo subido correctamente');

      setFiles(prevFiles => [...prevFiles, fileDoc]);
      setDescription('');
      setYear('');
      setSelectedFile(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      Alert.alert('Error', 'Hubo un problema al subir el archivo');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (file) => {
    try {
      const fileRef = ref(storage, `files/${file.name}`);
      await deleteObject(fileRef);

      await deleteDoc(doc(db, 'files', file.name));

      setFiles(prevFiles => prevFiles.filter(item => item.name !== file.name));

      Alert.alert('Éxito', 'Archivo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el archivo');
    }
  };

  // Filtrar archivos por año
  const filteredFiles = searchYear
    ? files.filter(file => file.year === searchYear)
    : files;

  const renderFilePreview = (item) => {
    const isImage = item.name.endsWith('.png') || item.name.endsWith('.jpg') || item.name.endsWith('.jpeg');
    const isPdf = item.name.endsWith('.pdf');
    const isVideo = item.name.endsWith('.mp4') || item.name.endsWith('.mov');
    const isAudio = item.name.endsWith('.mp3') || item.name.endsWith('.wav') || item.name.endsWith('.aac');
    const isWord = item.name.endsWith('.doc') || item.name.endsWith('.docx');
    const isPowerPoint = item.name.endsWith('.ppt') || item.name.endsWith('.pptx');
    const isText = item.name.endsWith('.txt');
    const isZip = item.name.endsWith('.zip');
    const isCsv = item.name.endsWith('.csv');

    const handleDelete = async () => {
      Alert.alert(
        'Confirmación',
        '¿Estás seguro de que deseas eliminar este archivo?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            onPress: () => deleteFile(item),
          },
        ]
      );
    };

    return (
      <View style={styles.card}>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.iconContainer}>
          {isImage ? (
            <Image source={{ uri: item.url }} style={styles.imagePreview} />
          ) : isPdf ? (
            <MaterialIcons name="picture-as-pdf" size={100} color="red" />
          ) : isVideo ? (
            <MaterialIcons name="videocam" size={100} color="blue" />
          ) : isAudio ? (
            <MaterialIcons name="audiotrack" size={100} color="green" />
          ) : isWord ? (
            <MaterialIcons name="description" size={100} color="purple" />
          ) : isPowerPoint ? (
            <MaterialIcons name="slideshow" size={100} color="orange" />
          ) : isText ? (
            <MaterialIcons name="text_snippet" size={100} color="blue" />
          ) : isZip ? (
            <MaterialIcons name="archive" size={100} color="brown" />
          ) : isCsv ? (
            <MaterialIcons name="table_chart" size={100} color="grey" />
          ) : (
            <Text style={styles.fileName}>Vista previa no disponible para {item.name}</Text>
          )}
        </View>

        <Text style={styles.uploadedBy}>Subido por: {item.uploadedBy}</Text>

        <TouchableOpacity 
          style={styles.openButton} 
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.openButtonText}>Abrir archivo</Text>
        </TouchableOpacity>

        {isDocente && (
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {isDocente && (
        <Button title="Subir Archivo" onPress={handleDocumentSelection} disabled={isUploading} />
      )}

      {/* Picker para filtrar por año */}
      <View>
        <Text style={styles.filterTitle}>Filtrar por Año</Text>
        <Picker
          selectedValue={searchYear}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSearchYear(itemValue)}
        >
          <Picker.Item label="Todos los años" value="" />
          <Picker.Item label="Primer Año" value="primer" />
          <Picker.Item label="Segundo Año" value="segundo" />
          <Picker.Item label="Tercer Año" value="tercer" />
        </Picker>
      </View>

      <FlatList
        data={filteredFiles}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => renderFilePreview(item)}
      />

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Subir Archivo</Text>
            <TextInput
              style={styles.input}
              placeholder="Descripción del archivo"
              value={description}
              onChangeText={setDescription}
            />
            <Text style={styles.yearLabel}>Año:</Text>
            <Picker
              selectedValue={year}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue) => setYear(itemValue)}
            >
              <Picker.Item label="Selecciona un año" value="" />
              <Picker.Item label="Primer Año" value="primer" />
              <Picker.Item label="Segundo Año" value="segundo" />
              <Picker.Item label="Tercer Año" value="tercer" />
            </Picker>

            {isUploading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Button title="Subir Archivo" onPress={handleUpload} />
                <Button title="Cancelar" onPress={() => setIsModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilesScreen;

