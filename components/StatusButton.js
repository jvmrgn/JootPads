import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function StatusButton({ label, onPress, isActive, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.statusButton, style, isActive && styles.activeButton]}>
      <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  activeButton: {
    borderWidth: 2,
    borderColor: '#000',
  },
  activeButtonText: {
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
