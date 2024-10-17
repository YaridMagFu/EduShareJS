import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30, 
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
  chatsTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginVertical: 20, 
    color: '#000'
  },
  chatRoomContainer: {
    backgroundColor: '#CBD6ED', 
    padding: 40, 
    borderRadius: 20,
    marginVertical: 10,
    width: '90%', 
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
  menuButtonText: {
    backgroundColor: '#B9CAED',
    fontFamily: 'Roboto',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0', 
    marginVertical: 10, 
    width: '100%', 
  },
});

export default styles;
