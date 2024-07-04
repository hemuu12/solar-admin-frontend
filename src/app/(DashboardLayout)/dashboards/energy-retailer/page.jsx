"use client";
// Import the necessary components from Material-UI and other libraries
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, IconButton, Checkbox, Popover, Typography,
  Stack,
  Avatar,
  Box,
  Chip
} from '@mui/material';
import { FaEllipsisV } from 'react-icons/fa';
import Link from 'next/link';
import { mockData } from "./data.js";
import PageContainer from '../../components/container/PageContainer';

const EnergyRetailer = () => {
  const [retailers, setRetailers] = useState(mockData);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  useEffect(() => {
    fetchRetailers();
  }, []);

  const fetchRetailers = async () => {
    try {
      setIsLoading(true);
      // Simulate an API call
      setTimeout(() => {
        setRetailers(mockData);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching retailers:', error);
    }
  };

  const handlePopoverOpen = (event, retailer) => {
    setAnchorEl(event.currentTarget);
    setSelectedRetailer(retailer);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRetailer(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const brandColors = {
    'Deal Expert': '#040E8A',
    'Check Your Bill': '#0ea800',
    'Compare Your Bills': '#00afef'
  };

  return (
    <PageContainer  title="Dashboard" description="this is Dashboard">
      <div className="container mx-auto p-4">
        <h1>Energy Retailers</h1>
        <h2>This page allows you to manage which brands can sell for Energy Retailers</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Energy Retailer</TableCell>
                <TableCell>Sales - 30 Days</TableCell>
                <TableCell>Sellable Brands</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {retailers.map((retailer) => (
                <TableRow key={retailer.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Avatar src="/images/deal4.jpeg" alt={retailer.name} sx={{ width: 40, height: 40 }} />
                      <Box style={{ marginTop: "10px" }}>
                        <Link style={{ color: "gray" }} href="/user/1">
                          {retailer.name}
                        </Link>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{retailer.sales30Days}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {retailer.brands.map((team, i) => (
                        <Chip
                          label={team.name}
                          sx={{ backgroundColor: team.bgcolor, color: 'white', fontSize: '13px' }}
                          key={i}
                          size="small"
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handlePopoverOpen(event, retailer)}>
                      <FaEllipsisV />
                    </IconButton>
                  </TableCell>
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
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            {selectedRetailer && (
              <div>
                <h3>{selectedRetailer.name}</h3>
                {Object.keys(brandColors).map((brandName) => (
                  <div key={brandName}>
                    <Checkbox
                      checked={selectedRetailer.brands.some(brand => brand.name === brandName)}
                    
                    /> {brandName}
                  </div>
                ))}
              </div>
            )}
          </Typography>
        </Popover>
      </div>
    </PageContainer>
  );
};

export default EnergyRetailer;
