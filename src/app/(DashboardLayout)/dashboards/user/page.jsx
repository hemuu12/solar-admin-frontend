"use client"
//  Import the necessary components from Material-UI and other libraries
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions, OutlinedInput, InputAdornment, InputLabel, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { IconButton , Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';


const User = () => {
  const [items, setItems] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    email: "",
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://polycab-backend.vercel.app/user/all/');
      setItems(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching items:', error);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
          let details={
            name:newItem.name,
            email:newItem.email,
            password:newItem.password
          }

      await axios.post('https://polycab-backend.vercel.app/user/user-access', details, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchItems();
      handleClose();
    } catch (error) {
      console.error('Error saving item:', error);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsEditPopupOpen(false);
    setNewItem({
      name: "",
      email: "",
      password: '',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => (
              <TableRow key={item.uniqueId}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: "center", marginTop: '10px' }}>
            <CircularProgress size={30} />
          </div>
        )}
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setNewItem({
            name: "",
            email: "",
            password: ""
          });
          setIsEditPopupOpen(true);
        }}
      >
        Add New User Access
      </Button>

      <Dialog open={isEditPopupOpen} onClose={handleClose}>
        <DialogTitle>Add New User Access</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            fullWidth
            margin="normal"
            placeholder='Enter Your Name'
          />
          <TextField
            label="Email"
            value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
            fullWidth
            margin="normal"
            placeholder='Enter Your Email'
          />
          <TextField
            label="Password"
            type="password"
            value={newItem.password}
            onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
            fullWidth
            margin="normal"
            placeholder='Enter Your Password'
          />
        </DialogContent>
        <DialogActions style={{ marginRight: "10px" }}>
          <Button disabled={isLoading} onClick={handleSave} color="primary">
            {isLoading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default User;





