"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, Grid, IconButton, InputAdornment, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import WelcomeCard from '@/app/(DashboardLayout)/components/dashboards/ecommerce/WelcomeCard';

import ParentCard from '../../components/shared/ParentCard';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';


import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import BlankCard from '../../components/shared/BlankCard';
import { useTheme } from '@emotion/react';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import { BsThreeDotsVertical } from "react-icons/bs"

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <LastPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
       <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
         <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <FirstPageIcon />
      </IconButton>
    </Box>
  );
}


const rows = [
  {
    Sales: '5',
    imgsrc: "/images/profile/user-1.jpg",
    customer: 'Sunil Joshi',
    month_on_month: +9,
    date: '10 Jun, 2021',
  },
  {

    Sales: '1',
    imgsrc: "/images/profile/user-2.jpg",
    customer: 'John Deo',
    month_on_month: -9,
    date: '10 Jun, 2021',
  },
  {

    Sales: '3',
    imgsrc: "/images/profile/user-3.jpg",
    customer: 'Mily Peter',
    month_on_month: +9,
    date: '10 Jun, 2021',
  },
  {
    Sales: '11',
    imgsrc: "/images/profile/user-4.jpg",
    customer: 'Andrew McDownland',
    month_on_month: -9,
    date: '10 Jun, 2021',
  },
  {
    Sales: '4',
    imgsrc: "/images/profile/user-5.jpg",
    customer: 'Christopher Jamil',
    month_on_month: +9,
    date: '15 Apr, 2021',
  },
  {
    Sales: '1',
    imgsrc: "/images/profile/user-2.jpg",
    customer: 'John Deo',
    month_on_month: +9,
    date: '10 Jun, 2021',
  },
  {
    Sales: '3',
    imgsrc: "/images/profile/user-3.jpg",
    customer: 'Mily Peter',
    month_on_month: -9,
    status: 'Cancel',
    date: '10 Jun, 2021',
  },
  {
    Sales: '11',
    imgsrc: "/images/profile/user-4.jpg",
    customer: 'Andrew McDownland',
    month_on_month: +9,
    date: '10 Jun, 2021',
  },
  {
    Sales: '4',
    imgsrc: "/images/profile/user-5.jpg",
    customer: 'Christopher Jamil',
    month_on_month: -9,
    date: '15 Apr, 2021',
  },
].sort((a, b) => (a.customer < b.customer ? -1 : 1));


const CompareYourBills = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [template, setTemplate] = useState('Hi, [first_name],\n[agent_first_name] from [brand] has sent you a Quote for your [suburb] address.\nClick here to Review and signup the [URL]');
  const [originalFormat, setOriginalFormat] = useState('');
  const placeholders = ['First Name', 'Suburb', 'URL'];

  const placeholderValues:any = {
    'First Name': '{first_name}',
    'Suburb': '{suburb}',
    'URL': '{URL}'
  };

  const handleTemplateChange = (e: any) => {
    setTemplate(e.target.value);
    setOriginalFormat(e.target.value); // Adjust logic for original format as needed
  };

  const handlePlaceholderClick = (placeholder: any) => {
    const value = placeholderValues[placeholder];
    setTemplate((prev) => `${prev} ${placeholder}`);
    setOriginalFormat((prev) => `${prev} ${value}`);
  };

  const handleSave = () => {
    // Add save logic here
    console.log('Saved:', { template, originalFormat });
  };

  const handleCancel = () => {
    // Add cancel logic here
    setTemplate('');
    setOriginalFormat('');
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [isLoading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);


  const handlePopoverOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  useEffect(() => {
    setLoading(false);
  }, []);


  return (
    <PageContainer title="eCommerce Dashboard" description="this is eCommerce Dashboard">
      <Box mt={3}>
        {/* column */}
        <Grid item >
          <WelcomeCard />
        </Grid>

        <Grid container spacing={3} mt={2}>
      <Grid item xs={12}>
        <ParentCard title="SMS Settings">
          <div>
            <Grid container spacing={3}>
              {/* SMS Originator */}
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  SMS Originator
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField placeholder="CompareYour" fullWidth />
              </Grid>

              {/* SMS Template and Original Format */}
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-message" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  SMS Template
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="bl-message"
                      value={template}
                      onChange={handleTemplateChange}
                      multiline
                      fullWidth
                      rows={6}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="original-format"
                      value={originalFormat}
                      onChange={handleTemplateChange}
                      multiline
                      fullWidth
                      rows={6}
                      variant="outlined"
                    />
                    <Typography variant="caption" display="block" gutterBottom>
                      {originalFormat.length} Chars
                    </Typography>
                  </Grid>
                </Grid>
                {/* Placeholder Buttons */}
                <Grid item xs={24} display="flex" alignItems="center" gap={2}>
                  <Typography>Placeholders</Typography>
                  <Box>
                    {placeholders.map((placeholder) => (
                      <Button
                        key={placeholder}
                        variant="outlined"
                        size="small"
                        onClick={() => handlePlaceholderClick(placeholder)}
                      >
                        {placeholder}
                      </Button>
                    ))}
                  </Box>
                </Grid>
              </Grid>

              {/* Cancel and Save Buttons */}
              <Grid item xs={12} mt={5}>
                <Box display="flex" gap={3} justifyContent="flex-end">
                  <Button variant="outlined" color="secondary" onClick={handleCancel} style={{ marginRight: '10px' }}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        </ParentCard>
      </Grid>
    </Grid>

      </Box >

      <Box mt={5}>
      <ParentCard title="Linked Sales Agent">
        <BlankCard>
          <TableContainer>
            <Table
              aria-label="custom pagination table"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Sales Agent</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Sales (30 Days)</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Month on Month</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">Active Since</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={row.imgsrc} alt={"row.imgsrc"} />
                        <Typography variant="subtitle2" fontWeight="600">
                          {row.customer}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.Sales}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.month_on_month > 0 ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                            <IconArrowUpRight width={18} color="#39B69A" />
                            <span>{row.month_on_month}%</span>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                            <IconArrowDownRight width={18} color="#FF0000" />
                            <span>{row.month_on_month}%</span>
                          </div>
                        )}

                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{row.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handlePopoverOpen(event)}>

                        <BsThreeDotsVertical />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={6}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Popover
            open={isPopoverOpen}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Button onClick={() => { /* handle remove action here */ }}>
              Remove
            </Button>
          </Popover>
        </BlankCard>
      </ParentCard>
      </Box>
    </PageContainer>
  );
};

export default CompareYourBills;
