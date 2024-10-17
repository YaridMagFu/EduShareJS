import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        maxWidth: '80%',
        borderRadius: 30,
    },
    ownMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#D9D9D9',
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    messageText: {
        fontSize: 16,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        alignSelf: 'flex-end',
        marginTop: 2,
    },
    replyInfo: {
        backgroundColor: '#E1F5FE', // Color similar a WhatsApp
        padding: 5,
        borderRadius: 8,
        marginBottom: 5,
        borderColor: '#BBDEFB', // Añadir un borde para más estilo
        borderWidth: 1,
    },
    replyText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000', // Color del texto de respuesta
    },
    replyName: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#007AFF', // Color azul para el nombre del usuario
    },
    replyContent: {
        fontSize: 12,
        color: '#555',
    },
    messageActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    actionButton: {
        marginLeft: 10,
    },
});

export default styles;
