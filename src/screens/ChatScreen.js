import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button } from 'react-native';
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
    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, `chats/${chatRoom}/messages`), {
      text: newMessage,
      createdAt: new Date(),
      uid,
      displayName,
    });
    setNewMessage('');
  };

  return (
    <View>
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
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Escribe un mensaje..."
      />
      <Button title="Enviar" onPress={sendMessage} />
    </View>
  );
}