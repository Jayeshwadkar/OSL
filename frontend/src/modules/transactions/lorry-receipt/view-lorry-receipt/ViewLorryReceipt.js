import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, styled, InputBase, alpha, Button, Autocomplete, TextField, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});

function ViewLorryReceipt() {
  
  const handleDelete = () => {
    // Define your delete logic here
    console.log('Delete button clicked');
  };

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
  const classes = useStyles();

  const columns = [
    { field: 'sn', headerName: 'SN', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'lrNo', headerName: 'LR No', flex: 1,headerClassName: classes.blueHeader },
    { field: 'date', headerName: 'Date', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'consigner', headerName: 'Consigner', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'from', headerName: 'From', flex: 1,headerClassName: classes.blueHeader },
    { field: 'consignee', headerName: 'Consignee', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'to', headerName: 'To', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'payMode', headerName: 'Pay Mode', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'lrCharges', headerName: 'LR Charges', flex: 1 ,headerClassName: classes.blueHeader},
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => (
        <span style={{ backgroundColor: '#00C853', padding: '2px 8px', borderRadius: '4px', color: '#fff' }}>
          {params.value}
        </span>
      ) ,headerClassName: classes.blueHeader
    },
    { field: 'options', headerName: 'Options', width: 100, renderCell: () => (
        <span style={{ cursor: 'pointer' }}>🗑️</span>
      ) ,headerClassName: classes.blueHeader
    },
  ];
  
  const rows = [
    {
      id: 1,
      sn: 1,
      lrNo: 'PUN-2023145832',
      date: '09-03-2024',
      consigner: 'EXOTECH PLASTICS PVT. LTD. (RANJANGAON-PUNE)',
      from: 'PUNE',
      consignee: 'TVS MOTOR COMPANY LTD. (BYTHAHALLI-MYSORE)',
      to: 'MYSORE',
      payMode: 'Bill',
      lrCharges: '100.00',
      status: 'New',
      options: 'delete'
    }
  ];

  return (
    <>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontFamily: 'Poppins, sans-serif' }}>Lorry Receipt</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '200px' }}>
      <Autocomplete
        options={[]} // Add your options here ((<SearchIcon style={{ padding: '10px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />      ))
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
        {/* Replace alert with appropriate usage */}
        { /* {alert && <div style={{ color: 'orange', textAlign: 'center', marginBottom: '20px' }}>{alert}</div>} */}
        <Box sx={{ height: 800, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </div>
    </>
  );
}

export default ViewLorryReceipt;
