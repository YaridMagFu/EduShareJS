import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FilesScreen from '../screens/FilesScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Register" component={RegisterScreen} />
  <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
  <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}  />
  <Stack.Screen name="Chat" component={ChatScreen}  options={{ headerShown: false }} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="Files" component={FilesScreen} />
</Stack.Navigator>

    </NavigationContainer>
  );
}