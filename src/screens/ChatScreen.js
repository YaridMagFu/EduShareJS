import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import MessageItem from '../components/MessageItem';

export default function ChatScreen({ route }) {
  const { chatRoom } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, `chats/${chatRoom}/messages`), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [chatRoom]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
    const { uid } = auth.currentUser;
    const displayName = auth.currentUser.displayName || 'Usuario Anónimo';
    await addDoc(collection(db, `chats/${chatRoom}/messages`), {
      text: newMessage,
      createdAt: new Date(),
      uid,
      displayName,
    });
    setNewMessage('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem 
            message={item} 
            isOwnMessage={item.uid === auth.currentUser.uid}
          />
        )}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe un mensaje..."
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
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
});