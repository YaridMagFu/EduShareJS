import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { canManageFilesInModule } from '../utils/permissions'; // Import permission check function

export default function FilesScreen({ route }) {
  const { moduleId, moduleName } = route.params;
  const [files, setFiles] = useState([]);
  const [canManageFiles, setCanManageFiles] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      const filesCollection = collection(db, `modules/${moduleId}/files`);
      const filesSnapshot = await getDocs(filesCollection);
      const filesList = filesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFiles(filesList);
    };

    const checkFilePermissions = async () => {
      const canManage = await canManageFilesInModule(moduleId);
      setCanManageFiles(canManage);
    };

    fetchFiles();
    checkFilePermissions();
  }, [moduleId]);

  const uploadFile = async () => {
    const newFile = {
      name: `Archivo ${files.length + 1}`,
    };
    await addDoc(collection(db, `modules/${moduleId}/files`), newFile);
    setFiles([...files, newFile]);
  };

  const deleteFile = async (fileId) => {
    await deleteDoc(doc(db, `modules/${moduleId}/files`, fileId));
    setFiles(files.filter(file => file.id !== fileId));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>{moduleName}</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{item.name}</Text>
            {canManageFiles && (
              <Button title="Eliminar" onPress={() => deleteFile(item.id)} />
            )}
          </TouchableOpacity>
        )}
      />
      {canManageFiles && (
        <Button title="Subir Archivo" onPress={uploadFile} />
      )}
    </View>
  );
}
