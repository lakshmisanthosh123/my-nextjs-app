"use client"; 

import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [age, setAge] = useState(''); 
  const [gender, setGender] = useState(''); 
  const [isRegistered, setIsRegistered] = useState(true);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleRegister = () => {
    const existingUser = users.find(user => user.username.trim() === username.trim());
  
    if (existingUser) {
      alert('User already registered!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!email || !name || !address || !age || !gender) {
      alert('All fields are required!');
      return;
    }

    const newUser = { username, password, email, name, address, age, gender };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Registration successful!');
    window.location.href = '/dashboard'; 
    setIsRegistered(false);
  };

  const handleLogin = () => {
    const existingUser = users.find(user => user.username === username && user.password === password);
    if (existingUser) {
      alert('Login successful!');
      window.location.href = '/dashboard'; // Redirect to the dashboard
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <Container maxWidth="xs" className="mt-10">
      <Typography variant="h4" component="h1" className="mb-4 text-center">
        {isRegistered ? 'Register' : 'Login'}
      </Typography>
      {isRegistered && (
        <>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            className="mb-2"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mb-2"
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="mb-2"
          />
          <TextField
            label="Age"
            type="number"
            variant="outlined"
            fullWidth
            value={age}
            onChange={e => setAge(e.target.value)}
            className="mb-2"
          />
          <FormControl variant="outlined" fullWidth className="mb-2">
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={e => setGender(e.target.value)}
              label="Gender"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mb-2"
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="mb-2"
          />
        </>
      )}
      {!isRegistered && (
        <>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mb-2"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mb-2"
          />
        </>
      )}
      {isRegistered ? (
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Register
        </Button>
      ) : (
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      )}
      <Typography className="mt-2 text-center">
        {isRegistered ? 'Already have an account? ' : "Don't have an account? "}
        <Button onClick={() => setIsRegistered(!isRegistered)} color="secondary">
          {isRegistered ? 'Login' : 'Register'}
        </Button>
      </Typography>
    </Container>
  );
}
