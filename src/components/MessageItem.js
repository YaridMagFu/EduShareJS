import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './MessageItemStyle';

export default function MessageItem({ message, isOwnMessage, onDelete, onReply, onSelectReply, highlightedMessageId }) {
  return (
    <View
      style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
        message.id === highlightedMessageId && styles.highlightedMessage,
      ]}
    >
      <Text style={styles.userName}>{message.displayName}</Text>

      {message.replyTo && (
        <TouchableOpacity onPress={() => onSelectReply(message.replyTo)} style={styles.replyContainer}>
          <View style={styles.replyInfo}>
            <Text style={styles.replyText}>Respondiendo a:</Text>
            <Text style={styles.replyName}>{message.replyTo.displayName}</Text>
            <Text style={styles.replyContent}>{message.replyTo.text}</Text>
          </View>
        </TouchableOpacity>
      )}

      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.timestamp}>{message.createdAt.toDate().toLocaleString()}</Text>

      <View style={styles.messageActions}>
        <TouchableOpacity onPress={onReply} style={styles.actionButton}>
          <Icon name="return-up-back" size={20} color="#6BA8CE" />
        </TouchableOpacity>
        {isOwnMessage && (
          <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
            <Icon name="trash" size={20} color="#FF0000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
