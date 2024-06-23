import create from 'zustand';
import { deleteTask as deleteTaskApi, moveTask as moveTaskApi, fetchTasks as fetchTasksApi } from './api';

export const useTasksStore = create((set) => ({
  tasks: [],
  isLoading: false,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
  deleteTask: async (id) => {
    try {
      await deleteTaskApi(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error('Erro ao deletar a tarefa na API:', error.message);
    }
  },
  fetchTasks: async () => {
    try {
      set({ isLoading: true });
      const tasks = await fetchTasksApi();
      set({ tasks });
    } catch (error) {
      console.error('Erro ao buscar as tarefas:', error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
