import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './RoleSelectionStyles'; 

export default function RoleSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el rol que desempeñas</Text>
      
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.description}>Selecciona este cuadro si eres alumno.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register', { role: 'alumno' })}
          >
            <Text style={styles.buttonText}>Alumno</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={styles.description}>Selecciona este cuadro si eres docente.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register', { role: 'docente' })}
          >
            <Text style={styles.buttonText}>Docente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}