import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ChatRoom({ name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}