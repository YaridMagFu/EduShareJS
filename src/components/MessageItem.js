import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageItem({ message, isOwnMessage }) {
  return (
    <View style={[styles.messageContainer, isOwnMessage ? styles.ownMessage : styles.otherMessage]}>
      <Text style={styles.userName}>{message.displayName}</Text>
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.timestamp}>{message.createdAt.toDate().toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 30,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#D9D9D9',
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
});