import { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Box, Container, Typography, Snackbar, Alert } from '@mui/material';
import { apiService } from '../services/apiService'; // Import the API service
import { useNavigate } from 'react-router-dom'; // Add this import

const TaskForm = () => {
  const navigate = useNavigate(); // Add this line
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the createTask API
      await apiService.createTask({
        title,
        description,
        dueDate,
        completed,
      });

      // Show success message
      setSnackbarMessage('Task created successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
      setCompleted(false);

      // Redirect to home page
      navigate('/');
    } catch (error) {
      // Show error message
      setSnackbarMessage('Failed to create task. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error('Error creating task:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Create a New Task
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              color="primary"
            />
          }
          label="Completed"
        />
        <Button type="submit" variant="contained" color="primary">
          Save Task
        </Button>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskForm;
