"use client"

import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const [items, setItems] = useState([]);
  const [factories, setFactories] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    email: '',
    factories: {},
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
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFactories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://polycab-backend.vercel.app/data/');
      setFactories(response.data);
    } catch (error) {
      console.error('Error fetching factories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    const factoriesMap = {};
    factories.forEach(factory => {
      factoriesMap[factory.uniqueId] = item.factoryAccess.includes(factory.uniqueId);
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
      const updatedFactories = Object.keys(newItem.factories)
        .filter(factoryId => newItem.factories[factoryId])
        .map(factoryId => ({ factoryId, accessGrantedByAdmin: true }));
      const data = {
        name: newItem.name,
        email: newItem.email,
        factories: updatedFactories,
      };
      let response=await axios.put(`https://polycab-backend.vercel.app/user/update-access/${newItem.email}`, data);
      setIsEditPopupOpen(false);
      setSelectedItem(null);
      setNewItem(prevItem => ({
        ...prevItem,
        name: '',
        email: '',
        factories: {},
      }));
      // Refresh items after save
      fetchItems();
      // Show success toast
    } catch (error) {
      setIsEditPopupOpen(false);
      if (error.response) {
      toast.error(error.response.data);
      // Show error toast
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditPopupOpen(false);
    setSelectedItem(null);
    setNewItem({
      name: '',
      email: '',
      factories: {},
    });
  };

  return (
    <div className="container mx-auto p-4">
    <ToastContainer />
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
      <Dialog open={isEditPopupOpen} onClose={handleCancel}>
        <DialogTitle>Edit Access</DialogTitle>
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
                        [factory.uniqueId]: e.target.checked,
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
          <Button onClick={handleSave} color="primary">
            Save
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
