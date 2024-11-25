import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Checkbox from '@mui/material/Checkbox';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
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
}));

function  ViewRegularBill() {
  const handleDelete = () => {
    console.log('Delete button clicked');
  };
  const classes = useStyles();

  const columns = [
    { field: 'sn', headerName: 'SN', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'Bill No	', headerName: 'Bill No	', flex: 1,headerClassName: classes.blueHeader },
    { field: 'Bill Date', headerName: 'Bill Date', flex: 1,headerClassName: classes.blueHeader },
    { field: 'Consigner Name', headerName: 'Consigner Name', flex: 1,headerClassName: classes.blueHeader },
    { field: 'Consignee Name', headerName: 'Consignee Name', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'Tot Inv wt.', headerName: 'Tot Inv wt.', flex: 1,headerClassName: classes.blueHeader },
    { field: 'LR Charges', headerName: 'LR Charges', flex: 1,headerClassName: classes.blueHeader},
    { field: 'Options', headerName: 'Options', flex: 1,headerClassName: classes.blueHeader },
   
  ];

  const rows = [
   
  ];

  return (
   <>
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
  <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontFamily: 'Poppins, sans-serif' }}>
  Regular Bill

  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:'2%' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '50px', padding: '2px 20px', marginRight: '1%', backgroundColor: 'white' }}>
              <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ width: '150px' }} />
            </div>
            <button onClick={handleDelete} style={{ padding: '5px 10px', color: 'white', background: '#5c6bc0', borderRadius: '50px', border: '1px solid transparent', boxShadow: '0 5px 20px #d6dee4', cursor: 'pointer' }}>Delete</button>
          </div>
  </div>

 
  <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
     
      disableSelectionOnClick
    />
  </div>


</div>
   </>
  );
}

export default ViewRegularBill