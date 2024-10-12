import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // Color de fondo blanco
    justifyContent: 'center',
  },
  titleCard: {
    backgroundColor: '#417FA5', 
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Sombra
    marginBottom: 20, 
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 10, 
  },
  checkIcon: {
    fontSize: 50,
  },
  instructionsCard: {
    backgroundColor: '#B9CAED', 
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Sombra
    marginBottom: 20, 
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3b3b3b',
  },
  instructions: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 20,
  },
  linkContainer: {
    marginVertical: 10,
  },
  linkText: {
    textAlign: 'center',
    color: '#007BFF', 
    textDecorationLine: 'underline', 
  },
});
