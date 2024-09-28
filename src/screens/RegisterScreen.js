import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function RegisterScreen({ route, navigation }) {
  const { role } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState('');
  const [code, setCode] = useState('');

  const handleRegister = async () => {
    try {
      if (role === 'docente' && code !== 'JS009') {
        Alert.alert('Error', 'Código de docente incorrecto');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        role,
        year: role === 'alumno' ? year : null,
      });

      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {role === 'alumno' && (
        <Picker
          selectedValue={year}
          onValueChange={(itemValue) => setYear(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona el año" value="" />
          <Picker.Item label="1 año" value="1" />
          <Picker.Item label="2 año" value="2" />
          <Picker.Item label="3 año" value="3" />
        </Picker>
      )}
      {role === 'docente' && (
        <TextInput
          style={styles.input}
          placeholder="Código de docente"
          value={code}
          onChangeText={setCode}
        />
      )}
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
});