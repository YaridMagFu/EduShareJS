import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Animated, Easing, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserPermissions } from '../utils/permissions';
import ChatRoom from '../components/ChatRoom';
import styles from './HomeScreenStyles'; 
import Icon from 'react-native-vector-icons/Ionicons'; 

const chatNames = {
  global: 'Chat Global',
  year1: 'Chat de Primer Año',
  year2: 'Chat de Segundo Año',
  year3: 'Chat de Tercer Año',
};

export default function HomeScreen({ navigation }) {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchPermissions = async () => {
      const permissions = await getUserPermissions();
      setChatRooms(permissions);
      setLoading(false);
    };
    fetchPermissions();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenu();
      setTimeout(() => {
        navigation.navigate('Login');
      }, 300);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
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

  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(() => setMenuVisible(false));
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
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Text style={[styles.menuButtonText, { fontSize: 30 }]}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>EDUSHARE.JS</Text>
      </View>

      <Text style={styles.chatsTitle}>Chats</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        chatRooms.map((room) => (
          <View key={room} style={styles.chatRoomContainer}>
            <ChatRoom
              name={chatNames[room] || `Chat ${room}`}
              onPress={() => navigation.navigate('Chat', { chatRoom: room })}
            />
          </View>
        ))
      )}

      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={closeMenu}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalMenu, { opacity: menuOpacity, transform: [{ scale: menuScale }] }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                navigation.navigate('Profile');
              }}
            >
              <Icon name="person" size={24} color="#000" />
              <Text style={styles.menuItemText}>Perfil de usuario</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                navigation.navigate('Files');
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

            <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
              <Text style={styles.closeButtonText}>Cerrar Menú</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
