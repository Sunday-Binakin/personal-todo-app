import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const ITEMS_PER_PAGE = 5;

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await apiService.getAllTasks({
          page: currentPage + 1,
          limit: ITEMS_PER_PAGE,
          search: searchQuery
        });

        setTasks(response.tasks);
        setTotalTasks(response.pagination.total);
      } catch (error) {
        console.error('Error retrieving tasks:', error);
        setTasks([]);
        setTotalTasks(0);
        const errorMessage = error.response?.data?.message || 'Failed to load tasks. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentPage, searchQuery]);

  const handleTaskCreated = () => {
    setSuccessMessage('Task created successfully!');
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task List
      </Typography>

      {/* Search bar */}
      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Add New Task button */}
      <Button
        component={Link}
        to="/new"
        variant="contained"
        color="primary"
        sx={{ mb: 2, mt: 1 }}
        onClick={handleTaskCreated}
      >
        Add New Task
      </Button>

      {/* Error Message */}
      {error && (
        <Typography 
          color="error" 
          align="center" 
          sx={{ mb: 2 }}
        >
          {error}
        </Typography>
      )}

      {/* Tasks List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? null : tasks.length > 0 ? (
        tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              mb: 2,
              bgcolor: task.completed
                ? 'action.hover'
                : 'background.paper',
              borderLeft: task.completed ? '4px solid #4caf50' : 'none',
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed
                    ? 'text.secondary'
                    : 'text.primary',
                }}
              >
                {task.title}
              </Typography>
              <Typography color="textSecondary">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
              <Typography>
                Status: {task.completed ? 'Completed' : 'Pending'}
                <Link
                  to={`/edit/${task.id}`}
                  style={{
                    marginLeft: '8px',
                    textDecoration: 'underline',
                    color: '#1976d2',
                  }}
                >
                  Edit
                </Link>
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography align="center" color="textSecondary">
          No tasks found.
        </Typography>
      )}

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Typography sx={{ alignSelf: 'center' }}>
          Page {currentPage + 1} 
        </Typography>
        {/* <Typography sx={{ alignSelf: 'center' }}>
          Page {currentPage + 1} of {totalTasks ? Math.ceil(totalTasks / ITEMS_PER_PAGE) : 1}
        </Typography> */}
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= Math.ceil(totalTasks / ITEMS_PER_PAGE) - 1}
        >
          Next
        </Button>
      </Box>

      {/* Two Snackbars - one for success, one for errors */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError('')}
        message={error}
        ContentProps={{
          sx: { backgroundColor: 'error.main' }
        }}
      />
    </Container>
  );
};

export default TaskList;
