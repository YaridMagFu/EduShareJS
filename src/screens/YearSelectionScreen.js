import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const YearSelectionScreen = ({ navigation }) => {
  const years = [1, 2, 3];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un año</Text>
      {years.map((year) => (
        <TouchableOpacity
          key={year}
          style={styles.yearButton}
          onPress={() => navigation.navigate('Modules', { year })}
        >
          <Text style={styles.yearButtonText}>{year}° Año</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  yearButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  yearButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default YearSelectionScreen;