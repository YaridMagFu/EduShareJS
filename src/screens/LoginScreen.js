import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, SafeAreaView, Alert, Image, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NetInfo from "@react-native-community/netinfo";
import styles from './LoginScreenStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Por favor, ingrese su email y contraseña.');
      return;
    }

    setLoading(true);

    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        throw new Error('No hay conexión a internet');
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      let errorMessage = 'Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo.';

      if (error.message === 'No hay conexión a internet') {
        errorMessage = 'No hay conexión a internet. Por favor, verifique su conexión e inténtelo de nuevo.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email o contraseña incorrectos. Por favor, verifique sus credenciales.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos fallidos. Por favor, intente más tarde o restablezca su contraseña.';
      }

      Alert.alert('Error de inicio de sesión', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
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
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
              <Text style={styles.label}>CONTRASEÑA</Text>
              <TextInput
                style={styles.input}
                placeholder="Introduce tu Contraseña"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
              <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Iniciar sesión</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
                <Text style={[styles.forgotPassword, loading && styles.textDisabled]}>
                  ¿Has olvidado tu contraseña? <Text style={styles.Ne}>Toca aquí</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')} disabled={loading}>
                <Text style={[styles.register, loading && styles.textDisabled]}>
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