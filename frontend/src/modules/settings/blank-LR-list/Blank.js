import {Autocomplete,Box,Button,Divider,FormControl,Grid,TextField,Typography,InputBase} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles, styled } from '@mui/styles';

import {gridPageCountSelector,gridPageSelector,useGridApiContext,useGridSelector,} from '@mui/x-data-grid';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';



const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#f8f5f6',
    color: '#000',
  },
  columnBorder: {
    borderRight: '1px solid #ccc', // Add border to the right of each column cell
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '50px',
    padding: '2px 20px',
    backgroundColor: '#3949ab',
    color: 'white',
    height: '100%',
    '&:hover': {
      backgroundColor: '#3949ab', // Adjust to the color you want on hover
      borderColor: '#3949ab', // Optional: Maintain border color on hover
    },
  },
  searchInput: {
    width: '150px',
    color: 'white',
  },
});

function customCheckbox(theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }
  };


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  // '& .MuiDataGrid-iconSeparator': {
  //   display: 'none',
  // },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  ...customCheckbox(theme),
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);



  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const PAGE_SIZE = 5;

function Blank() {
  const classes = useStyles();
 const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5, // Initial page size
    page: 0,     // Initial page index
  });

  const handlePageSizeChange = (newPageSize) => {
    setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }));
  };

  const fixedHeight = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100px', // Adjust the height as needed
  };

  const columns = [
    { field: 'id', headerName: 'Sr No', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true  },
    { field: 'blankConsignmentNo', headerName: 'Blank Consignment No', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true  },
  ];

  const rows = [
    {
      id: 1,
      blankConsignmentNo: '12345', 
    },
  ];

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" marginBottom={2}>
        <Grid item>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: '1.75rem',
              marginBottom: 2,
              textAlign: 'center',
            }}
          >
            Blank Consignment Range List
          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }} />
<Grid container justifyContent="center" spacing={2} alignItems="center">
  <Grid item xs={12} sm={6} md={2.4}>
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Branch Name"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
        />
      )}
    />
  </Grid>

  <Grid item xs={12} sm={6} md={2.4}>
    <Box style={fixedHeight}>
      <FormControl fullWidth size="small">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="dateResolved"
            format="MM-DD-YYYY"
            label="From"
            slotProps={{ textField: { size: 'small' } }}
            onChange={(date) => {
              // Handle date change
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  </Grid>

  <Grid item xs={12} sm={6} md={2.4}>
    <Box style={fixedHeight}>
      <FormControl fullWidth size="small">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="dateResolved"
            format="MM-DD-YYYY"
            label="To"
            slotProps={{ textField: { size: 'small' } }}
            onChange={(date) => {
              // Handle date change
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  </Grid>

  <Grid item xs={12} sm={6} md={2.4}>
    <Button variant='contained' startIcon={<SearchIcon />}>
      search
    
    </Button>
  </Grid>

  <Grid item xs={12} sm={6} md={2.4}>
   
  </Grid>
</Grid>



      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

      {/* Uncomment and style these buttons as needed */}
      {/* <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '2%' }}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: 'green', borderRadius: '50px' }}>
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" style={{ backgroundColor: '#D92445', borderRadius: '50px' }}>
            Cancel
          </Button>
        </Grid>
      </Grid> */}
    </>
  );
}

export default Blank;
