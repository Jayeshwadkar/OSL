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

function SaleInvoiceReport() {
  const classes = useStyles();
  const columns = [
    { field: 'sr No', headerName: 'sr No', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Bill NO	', headerName: 'Bill NO	', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Bill Date	', headerName: 'Bill Date	', flex: 1, headerClassName: classes.blueHeader  },
    { field: 'Bill Amount	', headerName: 'Bill Amount	', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Customer Name	', headerName: 'Customer Name	', flex: 1 , headerClassName: classes.blueHeader },
    {field: 'Total Transaction Value	',headerName:'Total Transaction Value		',flex:1, headerClassName: classes.blueHeader },
    {field: 'CGST %	',headerName:'CGST %	',flex:1, headerClassName: classes.blueHeader },
    {field: 'CGST Amt		',headerName:'Art',flex:1, headerClassName: classes.blueHeader },
    {field: ' SGST %	',headerName:'SGST %	',flex:1, headerClassName: classes.blueHeader },
    {field: 'SGST Amt	',headerName:'SGST Amt	',flex:1, headerClassName: classes.blueHeader },
    {field: 'IGST %	',headerName:'IGST %	',flex:1, headerClassName: classes.blueHeader },
    {field: 'IGST Amt		',headerName:'IGST Amt	',flex:1, headerClassName: classes.blueHeader },
    {field: 'Exempted	',headerName:'Exempted	',flex:1, headerClassName: classes.blueHeader },
    {field: 'PO No		',headerName:'PO No	',flex:1, headerClassName: classes.blueHeader },
    { field: 'PO Date', headerName: 'PO Date	', flex: 1 , headerClassName: classes.blueHeader },

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
         Sales invoice Billed Report
        </Typography>
      </Grid>
    </Grid>

    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>
    <Grid marginBottom={2}>
  <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
    <Grid item xs={2.2}>
      <Box style={fixedHeight}>
        <FormControl fullWidth size="small">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="From"
              format="MM-DD-YYYY"
              label="From"
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    </Grid>

    <Grid item xs={2.2}>
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

    <Grid item xs={2.2}>
      <Autocomplete
        options={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Branch"
            variant="outlined"
            fullWidth
            size="small"
            name="assignedCrew"
          />
        )}
      />
    </Grid>

    <Grid item xs={2.2}>
      <Autocomplete
        options={[]}
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

    <Grid item xs={2.2}>
 
    </Grid>

 
  </Grid>

  <Grid container justifyContent="center" alignItems="center" spacing={2}>
    <Grid item>
      <Button variant="contained" color="primary" style={{ backgroundColor: 'royalblue', borderRadius: '50px' }}>
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

export default SaleInvoiceReport