import React from 'react';
import { View, Text } from 'react-native';

export default function MessageItem({ message, isOwnMessage }) {
  return (
    <View style={{ alignItems: isOwnMessage ? 'flex-end' : 'flex-start' }}>
      <Text>{message.displayName}: {message.text}</Text>
      <Text>{message.createdAt.toDate().toLocaleString()}</Text>
    </View>
  );
}