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


function TouchingFreightReport() {
  const classes = useStyles();
  const columns = [
    { field: 'srNo', headerName: 'Sr No', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'memoNo', headerName: 'Consignment No.', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'memoDate', headerName: 'Consignment Date', flex: 1, headerClassName: classes.blueHeader },
    { field: 'dcNo', headerName: 'Consignor', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'dcDate', headerName: 'From', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'memoFrom', headerName: 'Consignee', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'memoTo', headerName: 'To', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'memoStatus', headerName: 'Delivery Date', flex: 1, headerClassName: classes.blueHeader },
    { field: 'oslBillNo', headerName: 'Consignment Status', flex: 1, headerClassName: classes.blueHeader },
    { field: 'oslBillDate', headerName: 'Receipt Date', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'transporterBillNo', headerName: 'Receipt Status', flex: 1, headerClassName: classes.blueHeader },
  
  ];

  const rows = [
    {
      id: 1,
      srNo: 1,
      memoNo: '12345',
      memoDate: '2023-01-01',
      dcNo: '67890',
      dcDate: '2023-01-02',
      memoFrom: 'Location A',
      memoTo: 'Location B',
      memoStatus: 'Delivered',
      oslBillNo: '11111',
      oslBillDate: '2023-01-03',
      transporterBillNo: '22222',
      transporterBillDate: '2023-01-04',
      transporterName: 'Transporter XYZ',
      lrNo: '33333',
      lrDate: '2023-01-05',
      consignor: 'Consignor ABC',
      from: 'City A',
      invNo: '44444',
      invDate: '2023-01-06',
      articles: 'Goods',
      noOfArticles: 10,
      quantity: 100,
      consignorPartNo: '55555',
      consignorDescription: 'Part Description',
      consignee: 'Consignee DEF',
      to: 'City B',
      consigneePartNo: '66666',
      weight: 500,
      transMode: 'Road',
      vehicleNo: 'MH12AB1234',
      driverName: 'Driver XYZ',
      mobileNo: '9876543210',
      licenceNo: 'LIC12345',
      deliveryType: 'Standard',
      totalPkgs: 10,
      totalWeight: 500,
      totalFreight: 1000,
      advanceAmount: 500,
      balanceAmount: 500,
      vehiclePass: 'VP123',
      parkingCharges: 100,
      diesel: 50,
      otherCharges: 20,
      deliveryCharges: 30,
      mathadi: 10,
      seal: 'Seal123',
      advRefName: 'Adv123',
      remark: 'No remarks',
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
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
Pending Receipt Report


        </Typography>
      </Grid>
    </Grid>

    <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

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
      <Autocomplete
        options={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Vehicle"
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
      <Button variant="contained" color="primary" style={{ backgroundColor: 'royalblue', borderRadius: '50px' }}>
        Search and Export
      </Button>
    </Grid>
  </Grid>
</Grid>

    <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

    <Box sx={{ height: 790, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </Box>
  </>
  );
}

export default TouchingFreightReport