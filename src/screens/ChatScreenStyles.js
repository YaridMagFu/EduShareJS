import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    width: '100%',
    height: 100,
    backgroundColor: '#B9CAED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 10,
    marginTop: 30
  },
  menuButton: {
    backgroundColor: '#B9CAED',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalMenu: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start', 
    width: '70%',
  },
  menuItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, 
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#B9CAED', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20, 
    width: '100%', 
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', 
  },
  chatContainer: {
    flex: 1, 
    justifyContent: 'flex-end',
    paddingBottom: 10, 
  },
  loadingIndicator: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  messagesBox: {
    flex: 1, 
    backgroundColor: '#B9CAED', 
    borderRadius: 30, // Esquinas redondeadas
    borderWidth: 1, // Borde del cuadro
    borderColor: 'black', // Color del borde
    shadowColor: '#000', // Sombra
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, 
    padding: 10, 
    marginBottom: 5, 
    marginTop: 20, 
  },
});

export default styles;
