import React from 'react';
import { View, Button } from 'react-native';

export default function RoleSelectionScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Docente"
        onPress={() => navigation.navigate('Register', { role: 'docente' })}
      />
      <Button
        title="Alumno"
        onPress={() => navigation.navigate('Register', { role: 'alumno' })}
      />
    </View>
  );
}