"use client"

import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Checkbox, FormControlLabel, FormControl } from '@mui/material';

const User = () => {
  const [items, setItems] = useState([]);
  const [factories, setFactories] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    email: "",
    factories: {} // State to track selected factories for each user
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchItems();
    fetchFactories();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://polycab-backend.vercel.app/user/all/');
      setItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setIsLoading(false);
    }
  };

  const fetchFactories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://polycab-backend.vercel.app/data/');
      setFactories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching factories:', error);
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    console.log(item,"QQQQQQQQQQQ")
    // Populate checkboxes for all factories
    const factoriesMap = {};
    factories.forEach(factory => {
      factoriesMap[factory.uniqueId] = item.factoryAccess.includes(factory.factoryId);
    });

    setNewItem({
      name: item.name,
      email: item.email,
      factories: factoriesMap,
    });
    setIsEditPopupOpen(true);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Prepare data for API call
      const data = {
        name: newItem.name,
        email: newItem.email,
        factories: Object.keys(newItem.factories).filter(key => newItem.factories[key]),
      };

      // API call to save data
      if (selectedItem) {
        await axios.put(`https://polycab-backend.vercel.app/data/update/${selectedItem.uniqueId}`, data);
      }

      // Fetch updated items and reset state
      fetchItems();
      setIsEditPopupOpen(false);
      setSelectedItem(null);
      setNewItem({
        name: "",
        email: "",
        factories: {},
      });
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditPopupOpen(false);
    setSelectedItem(null);
    setNewItem({
      name: "",
      email: "",
      factories: {},
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
              <TableCell>Factories</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => (
              <TableRow key={item.uniqueId}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress size={30} />
          </div>
        )}
      </TableContainer>
      <Dialog open={isEditPopupOpen || selectedItem !== null} onClose={handleCancel}>
        <DialogTitle>{selectedItem ? 'Edit Access' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <FormControl>
          {factories && factories.map(factory => (
            <FormControlLabel
              key={factory.uniqueId}
              control={
                <Checkbox
                  checked={newItem.factories[factory.uniqueId] || false}
                  onChange={(e) => setNewItem({
                    ...newItem,
                    factories: {
                      ...newItem.factories,
                      [factory.uniqueId]: e.target.checked
                    }
                  })}
                />
              }
              label={factory.name}
            />
          ))}
          
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleSave} color="primary">
            {isLoading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default User;

