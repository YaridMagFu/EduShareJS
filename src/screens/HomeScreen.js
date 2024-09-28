import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserPermissions } from '../utils/permissions';
import ChatRoom from '../components/ChatRoom';

export default function HomeScreen({ navigation }) {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const permissions = await getUserPermissions();
      setChatRooms(permissions);
    };
    fetchPermissions();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View>
      {chatRooms.map((room) => (
        <ChatRoom
          key={room}
          name={room === 'global' ? 'Chat Global' : `Chat ${room} año`}
          onPress={() => navigation.navigate('Chat', { chatRoom: room })}
        />
      ))}
      <Button title="Perfil de usuario" onPress={() => navigation.navigate('Profile')} />
      <Button title="Archivos" onPress={() => navigation.navigate('Files')} />
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}