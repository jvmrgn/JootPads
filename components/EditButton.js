import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function EditButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.editButton}>
      <Text style={styles.buttonText}>Editar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
