import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    
  },
  titleCard: {
    backgroundColor: '#B9CAED', 
    borderRadius: 10,
    padding: 20,
    elevation: 5, 
    marginBottom: 20, 
    borderWidth: 2, 
    borderColor: 'black',
  },
  card: {
    backgroundColor: '#B9CAED', 
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Para dar sombra
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3b3b3b',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#3b3b3b',
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#B9CAED',
    borderWidth: 2, 
    borderColor: 'black',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    color: '#555555',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#657C68', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: 'black',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 20,
  },
  linkText: {
    textAlign: 'center',
    color: '#555555',
  },
  linkTextHighlight: {
    color: '#007BFF', 
    textDecorationLine: 'underline', 
  },
});
