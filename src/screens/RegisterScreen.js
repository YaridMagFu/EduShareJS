import React, { useState } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import styles from './RegisterScreenStyles'; 

export default function RegisterScreen({ route, navigation }) {
  const { role } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState('');
  const [code, setCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async () => {
    try {
      if (!termsAccepted) {
        Alert.alert('Error', 'Debes aceptar los términos y condiciones para registrarte.');
        return;
      }

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

  const handleReadTerms = () => {
    navigation.navigate('Terms');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>
      {role === 'docente' && (
        <Text style={styles.description}>
          ¿Eres maestro? Para poder enviar clases y archivos a tus alumnos, tienes que usar el código que se te ha asignado.
        </Text>
      )}
      {role === 'alumno' && (
        <Text style={styles.description}>
          ¡Creamos tu cuenta! Llena los siguientes datos.
        </Text>
      )}

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mario Mendez"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mariomendez@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mendez123"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {role === 'alumno' && (
          <>
            <Text style={styles.label}>Año:</Text>
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
          </>
        )}

        {role === 'docente' && (
          <>
            <Text style={styles.label}>Código de Docente:</Text>
            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
            />
          </>
        )}

        <View style={styles.termsContainer}>
          <Switch
            value={termsAccepted}
            onValueChange={setTermsAccepted}
            style={styles.switch}
          />
          <Text style={styles.termsText}>
            Acepto los términos y condiciones
          </Text>
        </View>
        <TouchableOpacity onPress={handleReadTerms}>
          <Text style={styles.readMoreLink}>Leer más</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}