import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    onRegister({ name, email, password });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Create an Account
      </Typography>
      <Box 
        component="form" 
        onSubmit={handleRegister} 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <TextField
          label="Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={
            {
                py:1.5
            }
        } fullWidth>
          Register
        </Button>
        <Typography variant="body2" align="center">
          <a href="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Already have an account? Login
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;