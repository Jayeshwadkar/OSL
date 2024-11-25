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


function BranchWiseReportReport() {
  const classes = useStyles();

  const columns = [
    { field: 'sr No', headerName: 'sr No', flex: 1, headerClassName: classes.blueHeader  },
    { field: 'lrNo', headerName: 'LR No', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Lr Date	', headerName: 'Lr Date	', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Consignor Name	', headerName: 'Consignor Name	', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'from', headerName: 'From', flex: 1 , headerClassName: classes.blueHeader },
    {field: 'Inv No	',headerName:'Inv No	',flex:1, headerClassName: classes.blueHeader },
    {field: 'Inv Date	',headerName:'Inv Date	',flex:1, headerClassName: classes.blueHeader },
    {field: 'Inv Amt		',headerName:'Inv Amt	',flex:1, headerClassName: classes.blueHeader },
    {field: ' Eway No		',headerName:'Eway No	',flex:1, headerClassName: classes.blueHeader },
    {field: 'Eway Date	',headerName:'Eway Date	',flex:1, headerClassName: classes.blueHeader },
    {field: 'Eway Ex. Date	',headerName:'Eway Ex. Date	',flex:1, headerClassName: classes.blueHeader },
    {field: 'Consigner Part No		',headerName:'Consigner Part No		',flex:1, headerClassName: classes.blueHeader },
   
    {field: 'Consignor Decription	',headerName:'Consignor Decription',flex:1, headerClassName: classes.blueHeader },
    { field: 'Consignee Name	', headerName: 'Consignee Name		', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'To	', headerName: 'To		', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Consignee Part No	', headerName: 'Consignee Part No	', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Articles		', headerName: 'Articles		', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'No of Articles		', headerName: 'No of Articles		', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Quantity	', headerName: 'Quantity	', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'CFT(L) CFT(W) CFT(H)		', headerName: 'CFT(L) CFT(W) CFT(H)		', flex: 1, headerClassName: classes.blueHeader  },
    { field: 'CFT Conv Factor		', headerName: 'CFT Conv Factor		', flex: 1, headerClassName: classes.blueHeader  },
    { field: 'CFT(In Kgs)			', headerName: 'CFT(In Kgs)			', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Actual Weight		', headerName: 'Actual Weight		', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Charge Weight	', headerName: 'Charge Weight		', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Per Rate		', headerName: 'Per Rate		', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Rate', headerName: 'Rate', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Freight', headerName: 'Freight	', flex: 1, headerClassName: classes.blueHeader  },
    
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
         LR Branch Wise Reports

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
                label="Date Resolved"
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
                label="Date Resolved"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <Autocomplete
                  options={[]}

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
  );
}

export default BranchWiseReportReport