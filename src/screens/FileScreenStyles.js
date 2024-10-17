import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(23, 182, 210, 0.5)', 
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  uploadedBy: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 18
  },
  imagePreview: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  fileName: {
    fontSize: 14,
    color: '#007BFF', 
    marginTop: 5,
  },
  openButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  openButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  uploadButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center', // Alinear el contenido en el centro
  },
});

export default styles;
