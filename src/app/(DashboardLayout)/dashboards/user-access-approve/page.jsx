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
  CircularProgress,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserApproveAccess = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://polycab-backend.vercel.app/user/all-request');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClick=async(status,id)=>{
    let data={
    "status": status
    }
    try{
    let response=await axios.put(`https://polycab-backend.vercel.app/user/approve-access/${id}`, data);
    console.log(response)
    }
    catch(error){
        console.log(error, "error")
        if (error.response) {
          toast.error(error.response.data);
          // Show error toast
    }
  }
  }

  return (
    <div className="container mx-auto p-4">
    <ToastContainer />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell style={{display:"flex" , gap:"10px"}} >
                <Button
                  variant='contained'
                  style={{ backgroundColor: 'green', color: 'white' }}
                  onClick={() => handleClick("Approved", item._id)}
                >
                   {isLoading ? <CircularProgress size={24} /> : 'Approve'}
                </Button>
                <Button
                  variant='contained'
                  style={{ backgroundColor: 'red', color: 'white' }}
                  onClick={() => handleClick("Rejected", item._id)}
                >
                {isLoading ? <CircularProgress size={24} /> : 'Reject'}
                </Button>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


export default UserApproveAccess
