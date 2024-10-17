import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, FlatList, Linking, TextInput, Modal, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, setDoc, collection, getDocs, getDoc, deleteDoc, query, where } from 'firebase/firestore';
import { auth, storage, db } from '../firebase';

const FilesScreen = ({ route, navigation }) => {
  const { moduleId, moduleName } = route.params;
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDocente, setIsDocente] = useState(false);

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
    fetchFiles();
  }, [moduleId]);

  const fetchFiles = async () => {
    const filesQuery = query(collection(db, 'files'), where('moduleId', '==', moduleId));
    const filesSnapshot = await getDocs(filesQuery);
    const filesList = filesSnapshot.docs.map(doc => doc.data());
    setFiles(filesList);
  };

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
      const fileRef = ref(storage, `modules/${moduleId}/files/${selectedFile.name}`);

      await uploadBytes(fileRef, fileBlob);
      const downloadURL = await getDownloadURL(fileRef);

      const uploadedBy = currentUser ? currentUser.displayName || 'Usuario Anónimo' : 'Usuario Anónimo';

      const fileDoc = {
        name: selectedFile.name,
        url: downloadURL,
        description: description,
        uploadedBy: uploadedBy,
        createdAt:  new Date(),
        moduleId: moduleId,
      };

      await setDoc(doc(db, 'files', `${moduleId}_${selectedFile.name}`), fileDoc);
      Alert.alert('Éxito', 'Archivo subido correctamente');

      setFiles(prevFiles => [...prevFiles, fileDoc]);
      setDescription('');
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
      const fileRef = ref(storage, `modules/${moduleId}/files/${file.name}`);
      await deleteObject(fileRef);

      await deleteDoc(doc(db, 'files', `${moduleId}_${file.name}`));

      setFiles(prevFiles => prevFiles.filter(item => item.name !== file.name));

      Alert.alert('Éxito', 'Archivo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el archivo');
    }
  };

  const renderFilePreview = (item) => {
    const isImage = item.name.endsWith('.png') || item.name.endsWith('.jpg') || item.name.endsWith('.jpeg');
  
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
        {isImage ? (
          <Image source={{ uri: item.url }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.fileName}>Vista previa no disponible para {item.name}</Text>
        )}
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
    <View style={styles.container}>
      <Text style={styles.moduleTitle}>{moduleName}</Text>
      {isDocente && (
        <Button title="Subir Archivo" onPress={handleDocumentSelection} disabled={isUploading} />
      )}
      <FlatList
        data={files}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => renderFilePreview(item)}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Descripción</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Escribe una descripción del archivo"
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.uploadButton} 
                onPress={handleUpload} 
                disabled={isUploading}
              >
                {isUploading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.uploadButtonText}>Subir Archivo</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  fileName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  uploadedBy: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  openButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  openButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  uploadButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default FilesScreen;