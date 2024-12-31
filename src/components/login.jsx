import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Login
          </Typography>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 1,
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Login
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                to="/register"
                style={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Don't have an account? Register
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;