'use client';

import React, { useEffect, useState } from 'react';
import { Button, Typography, Container, List, ListItem } from '@mui/material';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    if (!storedUser) {
      alert('No user is logged in. Please log in first.');
      window.location.href = '/'; 
    } else {
      setCurrentUser(storedUser);
      setUsers(storedUsers);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/'; 
  };

  return (
    <Container>
      <Typography variant="h4">Welcome, {currentUser?.name || currentUser?.username}!</Typography>
      <Typography variant="h6">User Details:</Typography>
      <Typography>Username: {currentUser?.username}</Typography>
      <Typography>Email: {currentUser?.email}</Typography>
      <Typography>Name: {currentUser?.name}</Typography>
      <Typography>Address: {currentUser?.address}</Typography>
      <Typography>Age: {currentUser?.age}</Typography>
      <Typography>Gender: {currentUser?.gender}</Typography>

  
      {currentUser?.username === 'admin' && currentUser?.password === 'admin' &&  (
        <div>
          <Typography variant="h6">Registered Users:</Typography>
          <List>
            {users.map((user, index) => (
              <ListItem key={index}>{user.username}</ListItem>
            ))}
          </List>
        </div>
      )}

      <Button variant="contained" onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
