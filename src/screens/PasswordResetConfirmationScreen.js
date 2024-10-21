import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './PasswordResetConfirmationStyles'; 

export default function PasswordResetConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
        <Text style={styles.title}>
          Su solicitud de recuperación de contraseña ha sido exitosa, verifique su buzón de entrada.
        </Text>
        <View style={styles.iconContainer}>
          <Text style={styles.checkIcon}>✔️</Text>
        </View>
      </View>
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>Indicaciones</Text>
        <Text style={styles.instructions}>
          Si no recibe el SMS, verifique que el correo electrónico ingresado sea correcto, 
          y que su bandeja de entrada no tenga filtros que bloqueen el mensaje.
        </Text>
      </View>
      <View style={styles.divider} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
        <Text style={styles.linkText}>
          Haz click aquí para acceder a la pantalla de inicio.
        </Text>
      </TouchableOpacity>
    </View>
  );
}
