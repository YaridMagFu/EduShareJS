import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import styles from './ProfileScreenStyles'; 

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
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Rol:</Text>
        <Text style={styles.value}>{userData.role}</Text>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
      </View>

    
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Actualizar perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
