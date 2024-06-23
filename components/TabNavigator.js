import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TasksScreen from '../screens/TasksScreen';
import AddTaskScreen from '../screens/AddTaskScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ handleEdit }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Tarefas') {
            iconName = 'ios-list';
          } else if (route.name === 'Adicionar Tarefa') {
            iconName = 'ios-add';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Tarefas">
        {(props) => <TasksScreen {...props} onEdit={handleEdit} />}
      </Tab.Screen>
      <Tab.Screen name="Adicionar Tarefa" component={AddTaskScreen} />
    </Tab.Navigator>
  );
}
