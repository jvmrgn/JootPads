import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import EditTaskScreen from "../screens/EditTaskScreen";
import StatusButton from './StatusButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

export default function TaskItem({ task, onEdit, onDelete, onMove }) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleEdit = () => {
    onEdit(task);
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.buttonContainer}>
          <StatusButton 
            label="Para fazer" 
            onPress={() => onMove(task.id, 'Para fazer')} 
            isActive={task.step === 'Para fazer'} 
            style={styles.toDoButton} 
          />
          <StatusButton 
            label="Em andamento" 
            onPress={() => onMove(task.id, 'Em andamento')} 
            isActive={task.step === 'Em andamento'} 
            style={styles.inProgressButton} 
          />
          <StatusButton 
            label="Pronto" 
            onPress={() => onMove(task.id, 'Pronto')} 
            isActive={task.step === 'Pronto'} 
            style={styles.doneButton} 
          />
        </View>
      </View>
      <View style={styles.actionButtons}>
        <EditButton onPress={handleEdit} />
        <DeleteButton onPress={() => onDelete(task.id)} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={handleCloseEditModal}
      >
        <EditTaskScreen task={task} onClose={handleCloseEditModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  content: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  toDoButton: {
    backgroundColor: 'lightblue',
  },
  inProgressButton: {
    backgroundColor: 'lightgreen',
  },
  doneButton: {
    backgroundColor: 'lightpink',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
});
