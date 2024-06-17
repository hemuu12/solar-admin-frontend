"use client"
//  Import the necessary components from Material-UI and other libraries
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions, OutlinedInput, InputAdornment, InputLabel, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { IconButton , Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

const FactoryTable = () => {
  const [items, setItems] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    uniqueId: "",
    name:"",
    location: '' ,
    shortVideo: '' ,
    address:"",
    featuredImage: null,
    tourLink: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  function trimString(str) {
    if (str.length <= 25) {
      return str;
    } else {
      return str.substring(0, 25) + '...';
    }
  }

  useEffect(() => {
    fetchItems();
    console.log(isEditPopupOpen)
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('http://localhost:4000/data/');
      setItems(response.data);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching items:', error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    const location = item.location && item.location.latitude && item.location.longitude
      ? `${item.location.latitude} , ${item.location.longitude}`
      : '';
    setNewItem({
      uniqueId: item.uniqueId,
      location: location,
      name:item.name,
      address:item.address,
      shortVideo: item.shortVideo,
      featuredImage: "",
      tourLink: item.tourLink,
      description: item.description,
    });
    setIsEditPopupOpen(true);
  };

  const handleDelete = async (uniqueId) => {
    try {
      await axios.delete(`http://localhost:4000/data/delete/${uniqueId}`);
      setItems(items.filter((item) => item.uniqueId !== uniqueId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSave = async (item) => {
    try {
      setIsLoading(true); // Set loading state to true
      const [latitude, longitude] = item.location.split(',').map(coord => coord.trim());
      const newItemData = { ...item, location: `${latitude}, ${longitude}` };
  
      const formData = new FormData();
      Object.keys(newItemData).forEach((key) => {
        const value = newItemData[key];
        if (key === 'featuredImage' && value) {
          formData.append(key, value); // Append the file object directly
        } else {
          formData.append(key, String(value));
        }
      });
  
      if (selectedItem) {
        await axios.put(`http://localhost:4000/data/update/${item.uniqueId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://localhost:4000/data/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      fetchItems();
      setIsEditPopupOpen(false);
      setSelectedItem(null);
      setNewItem({
        uniqueId: "",
        name:"",
        address:"",
        location: '',
        shortVideo: '',
        featuredImage: null,
        tourLink: '',
        description: '',
      });
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false); // Reset loading state to false
    }
  };


  const handleCancel = () => {
    console.log(isEditPopupOpen)
    setIsEditPopupOpen(false);
    setSelectedItem(null);
    setNewItem({
      uniqueId: "",
      name:"",
      address:"",
      location: '',
      shortVideo: '',
      featuredImage: null,
      tourLink: '',
      description: '',
    });
  }

  const convertBufferToImage = (imageData) => {
    if (!imageData) {
      return null;
    }
    const uint8Array = new Uint8Array(imageData.data);
    const blob = new Blob([uint8Array], { type: imageData.type });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  return (
    <div className="container mx-auto p-4">
      <TableContainer>
          <Table>
          <TableHead>
            <TableRow>
              <TableCell>Featured Image</TableCell>
              <TableCell>Unique Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => (
              <TableRow key={item.uniqueId}>
                <TableCell>
                {item.featuredImage ? (
                  <img src={convertBufferToImage(item.featuredImage)} alt="Featured Image" width={50} height={50}/>
                ) : ( 
                  'N/A'
                )}
                </TableCell>
                <TableCell>{item.uniqueId}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell title={item.description}>{trimString(item.description)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </Button>
                  <Button onClick={() => handleDelete(item.uniqueId)}>
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div style={{ display: 'flex', justifyContent:"center" ,marginTop: '10px' , scroll:'none' }}>
            <CircularProgress size={30} />
          </div>
        )}
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setNewItem({
            uniqueId: "",
            name:"",
            address:"",
            location: '',
            shortVideo: '',
            featuredImage: null,
            tourLink: '',
            description: '',
          });
          setIsEditPopupOpen(true);
        }}
      >
        Add New Factories
      </Button>

      <Dialog open={isEditPopupOpen || selectedItem !== null} onClose={handleCancel}>
        <DialogTitle>{selectedItem ? 'Edit Item' : 'Add New Factory'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Unique Id"
            value={newItem.uniqueId}
            onChange={(e) => setNewItem({ ...newItem, uniqueId: !isNaN(e.target.value) ? Number(e.target.value) : "" })}
            fullWidth
            margin="normal"
            placeholder='Enter Unique Number'
          />
          <InputLabel style={{fontSize:"11px",marginLeft:"12px"}} htmlFor="location-input">Location</InputLabel>
          <OutlinedInput
            id="location-input"
            value={newItem.location}
            placeholder='Latitude , Longitude'
            onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
            fullWidth
            margin="normal"
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="write (latitude , longitude)" enterDelay={500}>
                  <IconButton aria-label="info">
                    <InfoOutlined />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          />
          <TextField
            label="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Short Video"
            value={newItem.shortVideo}
            onChange={(e) => setNewItem({ ...newItem, shortVideo: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tour Link"
            value={newItem.tourLink}
            onChange={  (e) => setNewItem({ ...newItem, tourLink: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
          label="Address"
          value={newItem.address}
          onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
          fullWidth
          margin="normal"
        />
            <div>
              <InputLabel style={{fontSize:"13px",marginLeft:"5px", marginTop:"5px" ,marginBottom:"7px"}} htmlFor="featuredImage-input">Featured Image</InputLabel>
              <div style={{marginLeft:"5px"}}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewItem({ ...newItem, featuredImage: e.target.files ? e.target.files[0] : null })}
                />
              </div>
            </div>
        </DialogContent>
        <DialogActions style={{marginRight:"10px"}}>
        <Button disabled={isLoading} onClick={() => handleSave(newItem)} color="primary">
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

export default FactoryTable;
