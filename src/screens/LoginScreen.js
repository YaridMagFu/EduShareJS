import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, SafeAreaView, Alert , Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import styles from './LoginScreenStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        enableOnAndroid={true} 
        extraScrollHeight={100} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.gradient}>
          <Image
            source={require('../screens/logo/logo.jpeg')}
            style={styles.logo}
          />
          <View style={styles.container}>
            <Text style={styles.title}>INICIA SESIÓN</Text>
            <Text style={styles.subtitle}>
              Inicia sesión con tu cuenta <Text style={styles.Ne}>Edusharej.s.</Text>
            </Text>
            <View style={styles.form}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="MARIORODRIGUEZ@gmail.com"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
              />
              <Text style={styles.label}>CONTRASEÑA</Text>
              <TextInput
                style={styles.input}
                placeholder="Introduce tu Contraseña"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.forgotPassword}>
                  ¿Has olvidado tu contraseña? <Text style={styles.Ne}>Toca aquí</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
                <Text style={styles.register}>
                  ¿No tienes una cuenta? <Text style={styles.Ne}>Regístrate</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}