import React, { useState } from 'react';
import {DataGrid,gridPageCountSelector,gridPageSelector,useGridApiContext,useGridSelector,} from '@mui/x-data-grid';
import { Box, styled, InputBase, alpha, Button, Autocomplete, TextField,IconButton,Divider, Switch } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import { BiEdit } from "react-icons/bi";
import Icon from '@mdi/react';
import { mdiPrinterSearch } from '@mdi/js';
import DeleteIcon from '@mui/icons-material/Delete';


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

function  ViewTransporterBill() {
  const [branchOptions, setBranchOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);


  

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const classes = useStyles();

  const columns = [
    { field: 'sn', headerName: 'SN', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'Bill No	', headerName: 'Bill No	', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'Bill Date	', headerName: 'Bill Date	', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'Transporter Name	', headerName: 'Transporter Name	', flex: 1,headerClassName: classes.blueHeader},

    { field: 'Transporter Bill No		', headerName: 'Transporter Bill No		', flex: 1,headerClassName: classes.blueHeader},
    { field: 'Transporter Bill Date', headerName: 'Transporter Bill Date', flex: 1 ,headerClassName: classes.blueHeader},
    {
      field: 'Amount',
      headerName: 'Amount',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => `₹${params.row.Amount}`,
    },

    {
      field: 'action',headerAlign:'center', headerName: 'Action', flex: 1, headerClassName: classes.blueHeader, renderCell: (params) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'left' }}>
         <Tooltip title="Edit">
          <IconButton style={{ color: 'black' }} >
            <BiEdit/>
          </IconButton>
          </Tooltip>
          <Tooltip title="View">
          <IconButton style={{ color: 'black' }}>
          <Icon path={mdiPrinterSearch} size={1} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Block">
        <Switch
      // checked={isChecked}
      // onChange={handleChange}
      color="default"
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: 'green',
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: 'green',
        },
        '& .MuiSwitch-switchBase': {
          color: '#C80036',
        },
        '& .MuiSwitch-track': {
          backgroundColor: 'red',
        },
      }}
    />
    </Tooltip>
    <Tooltip title="Delete">
            <IconButton style={{ color: 'black' }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        {/* <Tooltip title="Print">
          <IconButton style={{ color: 'black' }}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Block">
          <IconButton style={{ color: 'black' }}>
            <BlockIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Mail">
          <IconButton style={{ color: 'black' }}>
            <MailOutlineIcon />
          </IconButton>
        </Tooltip> */}
      </div>
      )
    },
   
  ];

  const rows = [
   
  ];


  return (
  <>
           <div style={{  padding: '20px', fontFamily: 'Arial, sans-serif' }}>
  <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontFamily: 'Poppins, sans-serif' }}>
  Transporter Bill

  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
    <div style={{ width: '300px' }}>
      <Autocomplete
        options={[]} // Add your options here
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Branch"
            variant="outlined"
            fullWidth
            size="small"
          />
        )}
      />
    </div>
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '2px 20px', marginRight: '2%', backgroundColor: 'white' }}>
              <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ width: '150px' }} />
            </div>
            <button onClick={handleDelete} style={{ padding: '5px 10px', color: 'white', background: '#5c6bc0', border: '1px solid transparent', boxShadow: '0 5px 20px #d6dee4', cursor: 'pointer' }}>Delete</button>
          </div>
  </div>

 
  <Box  sx={{
        height: 500,
        width: '100%',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
>
      <StyledDataGrid
       density='compact'
        rows={rows}
        columns={columns}
     
      />
    </Box>

</div>
      <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>
  </>
  );
}

export default ViewTransporterBill