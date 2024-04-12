"use client"
import React, { useState, useEffect } from 'react';
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
  const [loadingIds, setLoadingIds] = useState([]);
  const [isLoadingApprove, setIsLoadingApprove] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);

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

  const handleApproveClick = async (id) => {
    setIsLoadingApprove(true);
    setLoadingIds([...loadingIds, id]);
    try {
      let response = await axios.put(`https://polycab-backend.vercel.app/user/approve-access/${id}`, { status: "Approved" });
      fetchUsers();
      console.log(response);
    } catch (error) {
      console.log(error, "error");
      if (error.response) {
        toast.error(error.response.data);
      }
    } finally {
      setLoadingIds(loadingIds.filter(itemId => itemId !== id));
      setIsLoadingApprove(false);
    }
  };

  const handleRejectClick = async (id) => {
    setIsLoadingReject(true);
    setLoadingIds([...loadingIds, id]);
    try {
      let response = await axios.put(`https://polycab-backend.vercel.app/user/approve-access/${id}`, { status: "Rejected" });
      fetchUsers();
      console.log(response);
    } catch (error) {
      console.log(error, "error");
      if (error.response) {
        toast.error(error.response.data);
      }
    } finally {
      setLoadingIds(loadingIds.filter(itemId => itemId !== id));
      setIsLoadingReject(false);
    }
  };

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
                <TableCell style={{ display: "flex", gap: "10px" }} >
                  <Button
                    variant='contained'
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={() => handleApproveClick(item._id)}
                    disabled={isLoadingApprove || loadingIds.includes(item._id)}
                  >
                    {isLoadingApprove && loadingIds.includes(item._id) ? <CircularProgress size={24} /> : 'Approve'}
                  </Button>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleRejectClick(item._id)}
                    disabled={isLoadingReject || loadingIds.includes(item._id)}
                  >
                    {isLoadingReject && loadingIds.includes(item._id) ? <CircularProgress size={24} /> : 'Reject'}
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

export default UserApproveAccess;
