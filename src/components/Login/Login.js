import React, { useState, useEffect } from 'react';
import './Login.css';
import { TextField, Button, Container, Typography, Box, InputAdornment, IconButton, Link } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Hard-coded username and password combinations
  const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
  ];

  // useEffect to populate fields if stored in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    }
  }, []);

   // Handler for login button click
  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        // Store credentials in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        toast.success('Login successful!');
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    }
  };

  // Validate inputs
  const validate = () => {
    if (!username) {
      setError('Please Enter Username');
      return false;
    }
    if (!password) {
      setError('Please Enter Password');
      return false;
    }
    return true;
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h1 className='title'>tailwebs.</h1>
      <Container className='login-container' maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Box width="100%" mb={2}>
            <Typography variant="body1" className="username-label">Username</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                classes: { root: 'input-root', startAdornment: 'input-start-adornment' },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                    <HorizontalRuleIcon className="horizontal-rule-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box width="100%" mb={2}>
            <Typography variant="body1" className="password-label">Password</Typography>
            <TextField
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              fullWidth
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                classes: { root: 'input-root', startAdornment: 'input-start-adornment' },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon />
                    <HorizontalRuleIcon className="horizontal-rule-icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Link href="#" variant="body2" className="forgot-password-link">
            Forgot password?
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            className="login-button"
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
