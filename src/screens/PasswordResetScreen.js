import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase'; 
import styles from './PasswordResetScreenStyles'; 

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor, ingrese su correo electrónico.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate('PasswordResetConfirmation'); 
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento:', error);
      Alert.alert('Error', 'Ocurrió un error al enviar el correo de restablecimiento. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
        <Text style={styles.title}>Recupera tu contraseña</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Introduce tu correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.description}>
          Al presionar el botón de “Restablecer Contraseña” se le enviará un correo con un SMS para restablecer su contraseña.
        </Text>
        <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
          <Text style={styles.buttonText}>Restablecer contraseña</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
        <Text style={styles.linkText}>
          ¿Ya recuerdas tu contraseña? <Text style={styles.linkTextHighlight}>Haz click aquí</Text> para acceder a la pantalla de inicio de sesión.
        </Text>
      </TouchableOpacity>
    </View>
  );
}
