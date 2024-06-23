import axios from 'axios';

const API_BASE_URL = 'https://veiopads.netlify.app/api/joao-magrini';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar as tarefas: ' + error.message);
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar a tarefa: ' + error.message);
  }
};

export const editTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao editar a tarefa: ' + error.message);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao deletar a tarefa: ' + error.message);
  }
};

export const moveTask = async (taskId, newStep) => {
  try {
    const response = await api.patch(`/tasks/${taskId}/update-step`, { step: newStep });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao mover a tarefa: ' + error.message);
  }
};

export default api;
