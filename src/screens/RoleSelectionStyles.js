import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  boxContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%',
    marginTop: 20, 
  },
  box: {
    backgroundColor: '#B9CAED', 
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '100%', 
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: 'black',
    marginBottom: 40,
    textAlign: 'center', 
    fontWeight: 'bold'
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
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default styles;