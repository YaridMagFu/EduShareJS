import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { canManageModules } from '../utils/permissions'; // Import permission check function

export default function ModulesScreen({ route, navigation }) {
  const { year } = route.params; // Passed from YearSelectionScreen
  const [modules, setModules] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false); // Track if user is a teacher

  useEffect(() => {
    const fetchModules = async () => {
      const modulesCollection = collection(db, `years/${year}/modules`);
      const moduleSnapshot = await getDocs(modulesCollection);
      const modulesList = moduleSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModules(modulesList);
    };

    const checkPermissions = async () => {
      const canManage = await canManageModules();
      setIsTeacher(canManage); // Set if the user can manage modules (teacher role)
    };

    fetchModules();
    checkPermissions();
  }, [year]);

  const createModule = async () => {
    const newModule = {
      name: `Módulo ${modules.length + 1}`,
    };
    await addDoc(collection(db, `years/${year}/modules`), newModule);
    setModules([...modules, newModule]);
  };

  const deleteModule = async (moduleId) => {
    await deleteDoc(doc(db, `years/${year}/modules`, moduleId));
    setModules(modules.filter(module => module.id !== moduleId));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>{year}° Año - Módulos</Text>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Files', { moduleId: item.id, moduleName: item.name })}
          >
            <Text>{item.name}</Text>
            {isTeacher && (
              <Button title="Eliminar" onPress={() => deleteModule(item.id)} />
            )}
          </TouchableOpacity>
        )}
      />
      {isTeacher && (
        <Button title="Crear Módulo" onPress={createModule} />
      )}
    </View>
  );
}
