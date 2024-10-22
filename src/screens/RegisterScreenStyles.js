
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#E5E5E5', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: 'black',
    marginBottom: 20, 
    textAlign: 'left', 
  },
  formContainer: {
    backgroundColor: '#B9CAED', 
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, 
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10, 
    backgroundColor: '#B9CAED', 
    color: 'black', 
  },
  picker: {
    height: 50,
    marginBottom: 15,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 10, 
    backgroundColor: '#B9C3ED', 
  },
  button: {
    backgroundColor: '#657C68', 
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 2,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  readMoreLink: {
    color: "blue",
    fontWeight:"bold"
  }, 
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', 
    borderRadius: 15,
    borderWidth: 2
  },
  switch: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
  },
  termsText: {
    fontWeight: "bold"
  }
});

export default styles;

