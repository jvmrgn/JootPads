import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useTasksStore } from '../globalStore.js';
import { moveTask } from '../api';
import TaskItem from '../components/TaskItem';
import { useParams } from 'react-router-native'; 

export default function TasksScreen({ navigation }) {
  const tasks = useTasksStore((state) => state.tasks);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const isLoading = useTasksStore((state) => state.isLoading);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const { taskId } = useParams(); 

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (taskId) {
    }
  }, [taskId]);

  const handleMoveTask = async (taskId, newStep) => {
    try {
      await moveTask(taskId, newStep);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao mover a tarefa:', error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks(); 
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error.message);
    }
  };

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onEdit={(task) => navigation.navigate('EditTaskScreen', { taskId: task.id })}
      onDelete={handleDeleteTask}
      onMove={handleMoveTask}
    />
  );

  const filterTasksByStep = (step) => tasks.filter((task) => task.step === step);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.spinner} size="large" color="tomato" />
      ) : (
        <>
          <FlatList
            data={filterTasksByStep('Para fazer')}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<Text style={styles.sectionHeader}>Para fazer</Text>}
            ItemSeparatorComponent={renderSeparator}
          />
          <FlatList
            data={filterTasksByStep('Em andamento')}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<Text style={styles.sectionHeader}>Em andamento</Text>}
            ItemSeparatorComponent={renderSeparator}
          />
          <FlatList
            data={filterTasksByStep('Pronto')}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<Text style={styles.sectionHeader}>Pronto</Text>}
            ItemSeparatorComponent={renderSeparator}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  separator: {
    height: 10,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


