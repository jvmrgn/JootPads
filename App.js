import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TasksScreen from './screens/TasksScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import EditTaskModal from './screens/EditTaskScreen';
import { NativeBaseProvider } from 'native-base';
import TabNavigator from "./components/TabNavigator"

export default function App() {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const closeEditModal = () => {
    setEditingTask(null);
  };

 return (
    <NativeBaseProvider>
      <NavigationContainer>
        <TabNavigator handleEdit={handleEdit} />
        {editingTask && (
          <EditTaskModal
            task={editingTask}
            onClose={closeEditModal}
          />
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}