import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        setName(userDoc.data().name);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), { name });
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  if (!userData) return <Text>Cargando...</Text>;

  return (
    <View>
      <Text>Correo: {userData.email}</Text>
      <Text>Rol: {userData.role}</Text>
      {userData.year && <Text>Año: {userData.year}</Text>}
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <Button title="Actualizar perfil" onPress={handleUpdateProfile} />
    </View>
  );
}