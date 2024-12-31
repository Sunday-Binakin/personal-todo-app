import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
  Typography,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';

const EditTaskForm = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: '',
    description: '',
    deadline: '',
    status: 'incomplete'
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await apiService.getTask(taskId);
        setTask({
          name: data.title || '',
          description: data.description || '',
          deadline: data.dueDate || '',
          status: data.completed ? 'completed' : 'incomplete',
        });
      } catch (error) {
        console.error('Error fetching task:', error);
        setErrorMessage('Failed to load task. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateTask(taskId, {
        title: task.name,
        description: task.description,
        dueDate: task.deadline,
        completed: task.status === 'completed',
      });
      setSuccessMessage('Task updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
      setErrorMessage('Failed to update task. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!task) {
    return (
      <Typography variant="h6" align="center" color="error" sx={{ mt: 4 }}>
        Task not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Edit Task
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={task.status === 'completed'}
              onChange={(e) =>
                setTask({
                  ...task,
                  status: e.target.checked ? 'completed' : 'incomplete',
                })
              }
              color="primary"
            />
          }
          label="Completed"
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={!!successMessage || !!errorMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={successMessage || errorMessage}
      />
    </Container>
  );
};

export default EditTaskForm;
