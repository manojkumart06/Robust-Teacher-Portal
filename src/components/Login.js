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

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        toast.success('Login successful!');
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    }
  };

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h1>tailwebs.</h1>
      <Container className='login-container' maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Box width="100%" mb={2}>
            <Typography variant="body1" style={{ marginRight: '370px', marginBottom: '-10px' }}>Username</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              style={{ width: '80%' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: { height: '40px', borderRadius: '1px' },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                    <HorizontalRuleIcon style={{ transform: 'rotate(90deg)', opacity: '0.5' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box width="100%" mb={2}>
            <Typography variant="body1" style={{ margin: '-15px 370px -10px 0' }}>Password</Typography>
            <TextField
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              fullWidth
              style={{ width: '80%' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { height: '40px', borderRadius: '1px' },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon />
                    <HorizontalRuleIcon style={{ transform: 'rotate(90deg)', opacity: '0.5' }} />
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
          <Link href="#" variant="body2" style={{ color: '#329BFA', marginLeft: '330px', textDecoration: 'none', fontWeight: '400' }}>
            Forgot password?
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            style={{ width: '45%', height: '50px', backgroundColor: 'black', textTransform: 'none', marginTop: '50px' }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
