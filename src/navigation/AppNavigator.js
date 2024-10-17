import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import YearSelectionScreen from '../screens/YearSelectionScreen';
import ModulesScreen from '../screens/ModulesScreen';
import FilesScreen from '../screens/FilesScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import PasswordResetConfirmationScreen from '../screens/PasswordResetConfirmationScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="YearSelection" component={YearSelectionScreen} options={{ title: 'Seleccionar Año' }} />
        <Stack.Screen name="Modules" component={ModulesScreen} options={({ route }) => ({ title: `${route.params.year}° Año - Módulos` })} />
        <Stack.Screen name="Files" component={FilesScreen} options={({ route }) => ({ title: route.params.moduleName })} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordResetConfirmation" component={PasswordResetConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
