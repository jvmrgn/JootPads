import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function DeleteButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
      <Text style={styles.buttonText}>Excluir</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
