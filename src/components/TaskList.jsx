import React, { useEffect, useState, useCallback } from 'react';
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

  // Add debounced search effect
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchValue) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setCurrentPage(0); // Reset to first page when searching
          setSearchQuery(searchValue);
        }, 500); // Wait 500ms after last keystroke before searching
      };
    })(),
    []
  );

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await apiService.getAllTasks({
          page: currentPage + 1,
          limit: ITEMS_PER_PAGE,
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
  }, [currentPage]);

  // Add filtered tasks logic
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTaskCreated = () => {
    setSuccessMessage('Task created successfully!');
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}
        >
          Task List
        </Typography>
      </Box>

      {/* Control Panel */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <TextField
          label="Search Tasks"
          variant="outlined"
          fullWidth
          defaultValue={searchQuery}
          onChange={(e) => debouncedSearch(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.paper',
              '&:hover': {
                boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)',
              },
            }
          }}
        />

        <Button
          component={Link}
          to="/new"
          variant="contained"
          color="primary"
          onClick={handleTaskCreated}
          sx={{
            minWidth: { xs: '100%', sm: '200px' },
            height: '56px',
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            }
          }}
        >
          Add New Task
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Box 
          sx={{ 
            mb: 4, 
            p: 2, 
            borderRadius: 2,
            backgroundColor: 'error.light',
            color: 'error.dark'
          }}
        >
          <Typography align="center">{error}</Typography>
        </Box>
      )}

      {/* Tasks List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={48} />
        </Box>
      ) : error ? null : filteredTasks.length > 0 ? (
        <Box sx={{ mb: 4 }}>
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              elevation={2}
              sx={{
                mb: 2,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                bgcolor: task.completed ? 'grey.50' : 'background.paper',
                borderLeft: task.completed ? '4px solid #4caf50' : '4px solid #1976d2',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.secondary' : 'text.primary',
                    mb: 1,
                    fontWeight: 600
                  }}
                >
                  {task.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography 
                    sx={{ 
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: task.completed ? 'success.light' : 'info.light',
                        color: task.completed ? 'success.dark' : 'info.dark',
                        fontSize: '0.875rem',
                      }}
                    >
                      {task.completed ? 'Completed' : 'In Progress'}
                    </Typography>
                    <Link
                      to={`/edit/${task.id}`}
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 1,
                          textTransform: 'none',
                        }}
                      >
                        Edit
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box>
          <Typography>No tasks found.</Typography>
        </Box>
      )}

      {/* Pagination */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 4,
          p: 2,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: 1
        }}
      >
        <Button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
          sx={{
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Previous
        </Button>
        <Typography>
          Page {currentPage + 1} of {Math.ceil(filteredTasks.length / ITEMS_PER_PAGE)}
        </Typography>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= Math.ceil(filteredTasks.length / ITEMS_PER_PAGE) - 1}
          sx={{
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Next
        </Button>
      </Box>

      {/* Snackbars */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'success.main',
            borderRadius: 2
          }
        }}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError('')}
        message={error}
        ContentProps={{
          sx: { 
            backgroundColor: 'error.main',
            borderRadius: 2
          }
        }}
      />
    </Container>
  );
};

export default TaskList;
