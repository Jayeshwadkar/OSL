import { Autocomplete, FormControl, Grid, TextField, Typography, Box, Button, Divider } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});


const fixedHeight = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100px', // Adjust the height as needed
};

function LRBillReport() {
  const classes = useStyles();
  const columns = [

    { field: 'lrNo', headerName: 'LR No', flex: 1, headerClassName: classes.blueHeader },
    { field: 'date', headerName: 'Date', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'consigner', headerName: 'Consigner', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'from', headerName: 'From', flex: 1, headerClassName: classes.blueHeader },
    {field: 'Consignee',headerName:'Consignee',flex:1, headerClassName: classes.blueHeader},
    {field: 'To',headerName:'To',flex:1, headerClassName: classes.blueHeader},
    {field: 'Bill No		',headerName:'Bill No	',flex:1, headerClassName: classes.blueHeader},
    {field: ' Bill Date	',headerName:'Bill Date	',flex:1, headerClassName: classes.blueHeader},
    {field: 'Bill Amt	',headerName:'Bill Amt	',flex:1, headerClassName: classes.blueHeader},
    {field: 'Delivery Date	',headerName:'Delivery Date	',flex:1, headerClassName: classes.blueHeader},
    {field: 'Status	',headerName:'Status',flex:1, headerClassName: classes.blueHeader},
    
   
  ];
  
  const rows = [
    {
      id: 1,
      sn: 1,

    }
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
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
         LR Bill Report

        </Typography>
      </Grid>
    </Grid>

    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

    <Grid marginBottom={2}>
    <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}  spacing={3}>
      <Grid item xs={2.4}>
        <Box style={fixedHeight}>
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="From"
                format="MM-DD-YYYY"
                label=" From"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={2.4}>
        <Box style={fixedHeight}>
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="To"
                format="MM-DD-YYYY"
                label="To"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={2.4}>
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Branch"
              variant="outlined"
              fullWidth
              size="small"
              name="assignedCrew"
            />
          )}
        />
      </Grid>

      <Grid item xs={2.4}>
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Customer"
              variant="outlined"
              fullWidth
              size="small"
              name="assignedCrew"
            />
          )}
        />
      </Grid>
      
      <Grid item xs={2.4}>
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Status"
              variant="outlined"
              fullWidth
              size="small"
              name="assignedCrew"
            />
          )}
        />
      </Grid>
    </Grid>

    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" style={{ backgroundColor: 'royalblue',borderRadius:'50px' }}>
          Search and Export
        </Button>
      </Grid>
      
    </Grid>
  </Grid>

  <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

  <Box sx={{ height: 790, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
  </>
  );
}

export default LRBillReport