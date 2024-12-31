import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});
 
 

// Task service functions
export const apiService = {
  // Fetch all tasks with pagination and optional search query
  getAllTasks: async () => {
    try {
      const response = await api.get('api/todos', {
        params: {
          limit: 1000
        }
      });
      
      return {
        tasks: response.data.todos.map(todo => ({
          id: todo._id,
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
          completed: todo.completed,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        })),
        pagination: {
          total: response.data.total,
        },
      };
    } catch (error) {
      console.error('Error retrieving tasks:', error.response?.data || error.message);
      throw error;
    }
  },

  // Fetch a single task by ID
  getTask: async (taskId) => {
    try {
      const response = await api.get(`api/todos/${taskId}`);
      const todo = response.data;

      return {
        id: todo._id,
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      };
    } catch (error) {
      console.error('Error retrieving task:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (task) => {
    try {
      const response = await api.post('api/todos', {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        completed: task.completed,
      });

      const todo = response.data.todo;
      return {
        id: todo._id,
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      };
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
      throw error;
    }
  },

  // Update an existing task by ID
  updateTask: async (taskId, updates) => {
    try {
      const response = await api.patch(`api/todos/${taskId}`, {
        title: updates.title,
        description: updates.description,
        dueDate: updates.dueDate,
        completed: updates.completed,
      });
return response;
      // const todo = response.data.todo;
      // return {
      //   id: todo._id,
      //   title: todo.title,
      //   description: todo.description,
      //   dueDate: todo.dueDate,
      //   completed: todo.completed,
      //   createdAt: todo.createdAt,
      //   updatedAt: todo.updatedAt,
      // };
    } catch (error) {
      console.error('Error updating task:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a task by ID
  deleteTask: async (taskId) => {
    try {
      await api.delete(`api/todos/${taskId}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : error);
      throw error;
    }
  },
};
