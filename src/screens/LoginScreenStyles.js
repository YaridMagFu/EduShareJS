import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(to bottom, #4c669f, #3b5998, #192f6a)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
    textAlign: 'left',
  },
  form: {
    backgroundColor: '#B9CAED',
    borderRadius: 30, 
    padding: 20,
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#B9CAED', 
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontWeight: 'bold', 
    borderWidth: 2,
    borderColor: 'black', 
    color: 'black', 
  },
  button: {
    backgroundColor: '#657C68',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  forgotPassword: {
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
  },
  register: {
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  Ne: {
    fontWeight: 'bold',
    color: 'black'
  },
  logo: {
    width: '100%',
    height: '38%',
    borderBottomLeftRadius: 90, 
    borderBottomRightRadius: 30,
    resizeMode: 'cover',
    position: 'static'
  },
});

export default styles;



