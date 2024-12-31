import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure your environment variable is set for the base URL
});
 
 

// Task service functions
export const apiService = {
  // Fetch all tasks with pagination and optional search query
  getAllTasks: async ({ page = 1, limit = 10, searchQuery = '' } = {}) => {
    try {
      const response = await api.get('api/todos', {
        params: {
          page: Math.max(1, page), // Remove the subtraction, ensure minimum of 1
          limit,
          search: searchQuery,
        },
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
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
          total: response.data.total,
        },
        message: response.data.message,
      };
    } catch (error) {
      console.error('Error retrieving tasks:', error.response ? error.response.data : error);
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

      // const todo = response.data.todo;

      // return {
      //   _id: todo.id,
      //   title: todo.title,
      //   description: todo.description,
      //   dueDate: todo.dueDate,
      //   completed: todo.completed,
      //   createdAt: todo.createdAt,
      //   updatedAt: todo.updatedAt,
      // };
      return response;
    } catch (error) {
      console.error('Error creating task:', error.response ? error.response.data : error);
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
      return response;
    } catch (error) {
      console.error('Error updating task:', error.response ? error.response.data : error);
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
