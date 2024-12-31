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
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const ITEMS_PER_PAGE = 3; // Set to display 3 items per page

  // Add handleCloseSnackbar function
  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setError('');
  };

  // Fetch all tasks at once
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await apiService.getAllTasks();
        setTasks(response.tasks);
      } catch (error) {
        console.error('Error retrieving tasks:', error);
        setTasks([]);
        const errorMessage = error.response?.data?.message || 'Failed to load tasks. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); 

  // Client-side filtering
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  
  // Get current page items
  const currentTasks = filteredTasks.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Simple search handler
  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(0); // Reset to first page when searching
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
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
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
          {currentTasks.map((task) => (
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
                    mb: 0.5,
                    fontWeight: 700
                  }}
                >
                  {task.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.secondary' : 'text.secondary',
                    mb: 1,
                    fontWeight: 400
                  }}
                >
                  {task.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography 
                    sx={{ 
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      '& .date': {
                        color: 'primary.main',
                        fontWeight: 600,
                        ml: 0.5
                      }
                    }}
                  >
                    Due: <span className="date">
                      {new Date(task.dueDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
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

      {/* Pagination Controls */}
      {filteredTasks.length > 0 && (
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
            Page {currentPage + 1} of {totalPages}
          </Typography>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages - 1}
            sx={{
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Next
          </Button>
        </Box>
      )}

      {/* Updated Snackbars */}
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
        onClose={handleCloseSnackbar}
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
