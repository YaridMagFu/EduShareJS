import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Modal, Animated, Easing, ActivityIndicator, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserPermissions } from '../utils/permissions';
import ChatRoom from '../components/ChatRoom';
import styles from './HomeScreenStyles'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import NetInfo from "@react-native-community/netinfo";

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
  const [iconScale] = useState(new Animated.Value(1)); 
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
          throw new Error('No hay conexión a internet');
        }
        const permissions = await getUserPermissions();
        setChatRooms(permissions);
      } catch (error) {
        console.error('Error al obtener permisos:', error);
        Alert.alert('Error', 'No se pudieron cargar los chats. Por favor, inténtelo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchPermissions();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        throw new Error('No hay conexión a internet');
      }
      await signOut(auth);
      closeMenu();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      let errorMessage = 'Ocurrió un error al cerrar sesión. Por favor, inténtelo de nuevo.';
      if (error.message === 'No hay conexión a internet') {
        errorMessage = 'No hay conexión a internet. Por favor, verifique su conexión e inténtelo de nuevo.';
      }
      Alert.alert('Error al cerrar sesión', errorMessage);
    } finally {
      setIsLoggingOut(false);
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

  //  animacion icono
    startIconAnimation();
  };

  const startIconAnimation = () => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(iconScale, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(iconScale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 5000);
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
              <Animated.View style={{ transform: [{ scale: iconScale }] }}>
                <Icon name="person" size={24} color="#000" />
              </Animated.View>
              <Text style={styles.menuItemText}>Perfil de usuario</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu(() => navigation.navigate('Files'));
              }}
            >
              <Animated.View style={{ transform: [{ scale: iconScale }] }}>
                <Icon name="folder" size={24} color="#000" />
              </Animated.View>
              <Text style={styles.menuItemText}>Archivos</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handleLogout}
              disabled={isLoggingOut}
            >
              <Animated.View style={{ transform: [{ scale: iconScale }] }}>
                <Icon name="log-out" size={24} color="#000" />
              </Animated.View>
              <Text style={styles.menuItemText}>
                {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
              </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.closeButton} onPress={() => closeMenu()}>
              <Text style={styles.closeButtonText}>Cerrar Menú</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
