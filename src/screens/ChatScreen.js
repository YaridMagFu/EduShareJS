import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, Animated, Easing, ActivityIndicator } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot, doc, onSnapshot as onUserSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import MessageItem from '../components/MessageItem';
import Icon from 'react-native-vector-icons/Ionicons'; 
import styles from './ChatScreenStyles';
import Filter from 'bad-words-es'; 


const salvadoranBadWords = [
  "pendejos", "hijo de puta", "cabrón", "mierda", "verga", 
  "chucho", "cagada", "picha", "culero", "pendejada", 
  "coño", "maricón", "huevón", "fregón", "pichón", 
  "asqueroso", "pedorro", "puto", "malparido","maje","CTM"
];

const filter = new Filter();
filter.addWords(...salvadoranBadWords); 

export default function ChatScreen({ route, navigation }) {
  const { chatRoom } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName || 'Usuario Anónimo');

  useEffect(() => {
    const unsubscribeUser = onUserSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        setDisplayName(doc.data().name);
      }
    });

    const q = query(collection(db, `chats/${chatRoom}/messages`), orderBy('createdAt', 'desc'));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        displayName: doc.data().uid === auth.currentUser.uid ? displayName : doc.data().displayName
      }));
      setMessages(updatedMessages);
      setLoading(false);
    });

    return () => {
      unsubscribeUser();
      unsubscribeMessages();
    };
  }, [chatRoom, displayName]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
    
    const cleanMessage = filter.clean(newMessage);
    
    if (cleanMessage.trim() === '') {
      console.log("El mensaje contiene solo palabras prohibidas.");
      return; 
    }
    
    console.log("Enviando mensaje:", cleanMessage);
    const { uid } = auth.currentUser;
    await addDoc(collection(db, `chats/${chatRoom}/messages`), {
      text: cleanMessage,
      createdAt: new Date(),
      uid,
      displayName,
    });
    setNewMessage('');
  };

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const closeMenu = (callback) => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(() => {
      setMenuVisible(false);
      if (callback) callback();
    });
  };

  const handleLogout = () => {
    closeMenu(() => {
      auth.signOut()
        .then(() => {
          console.log('Sesión cerrada');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        })
        .catch((error) => {
          console.error('Error al cerrar sesión: ', error);
        });
    });
  };

  const menuOpacity = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const menuScale = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>EDUSHARE.JS</Text>
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Text style={[styles.menuButtonText, { fontSize: 30 }]}>☰</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : null}

        <View style={styles.messagesBox}>
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
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Escribe un mensaje..."
          />
          <TouchableOpacity onPress={sendMessage} style={{ padding: 10 }}>
            <Icon name="send" size={24} color="#6BA8CE" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => closeMenu()}
        animationType="none"
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalMenu, { opacity: menuOpacity, transform: [{ scale: menuScale }] }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu(() => navigation.navigate('Profile'));
              }}
            >
              <Icon name="person" size={24} color="#000" />
              <Text style={styles.menuItemText}>Perfil de usuario</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu(() => navigation.navigate('Files'));
              }}
            >
              <Icon name="folder" size={24} color="#000" />
              <Text style={styles.menuItemText}>Archivos</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Icon name="log-out" size={24} color="#000" />
              <Text style={styles.menuItemText}>Cerrar sesión</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.closeButton} onPress={() => closeMenu()}>
              <Text style={styles.closeButtonText}>Cerrar Menú</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
