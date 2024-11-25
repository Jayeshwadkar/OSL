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

function Purchaseorderreports() {
  const classes = useStyles();
    const columns = [
        { field: 'sr No', headerName: 'sr No', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'Purchase', headerName: 'Purchase', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'Order No', headerName: 'Order No ', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'PO Date	', headerName: 'PO Date	', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'PO Customer Name', headerName: 'PO Customer Name', flex: 1 , headerClassName: classes.blueHeader },
        {field: 'PO Start Date	',headerName:'PO Start Date',flex:1, headerClassName: classes.blueHeader },
        {field: 'PO End Date',headerName:'PO End Date',flex:1, headerClassName: classes.blueHeader },
        {field: 'PO Status',headerName:'PO Status',flex:1, headerClassName: classes.blueHeader },
       
    
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
         Purchase Order Reports

        </Typography>
      </Grid>
    </Grid>

    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

    <Grid marginBottom={2}>
    <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
      <Grid item xs={2.9}>
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

      <Grid item xs={2.9}>
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

      <Grid item xs={3}>
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Customer"
              variant="outlined"
              fullWidth
              size="small"
              name="assignedCrew"
            />
          )}
        />
      </Grid>

      <Grid item xs={2.9}>
        
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
  )
}

export default Purchaseorderreports
