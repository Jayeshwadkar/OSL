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

function SaleInvoiceReportII() {
  const classes = useStyles();
    const columns = [
        { field: 'sr No', headerName: 'sr No', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'lrNo', headerName: 'LR No', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'LR Date	', headerName: 'LR Date	', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'Consignor Name	', headerName: 'Consignor Name	', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'from', headerName: 'From', flex: 1, headerClassName: classes.blueHeader  },
        {field: 'Inv No	',headerName:'Inv No	',flex:1, headerClassName: classes.blueHeader },
        {field: 'Inv Date	',headerName:'Inv Date	',flex:1, headerClassName: classes.blueHeader },
        {field: 'Article Name		',headerName:'Article Name	',flex:1, headerClassName: classes.blueHeader },
        {field: ' No of Articles		',headerName:'No of Articles	',flex:1, headerClassName: classes.blueHeader },
        {field: 'Qty',headerName:'Qty',flex:1, headerClassName: classes.blueHeader },
        {field: 'Actual Weight	',headerName:'Actual Weight	',flex:1, headerClassName: classes.blueHeader },
        {field: 'CFT',headerName:'CFT',flex:1, headerClassName: classes.blueHeader },
        {field: 'Consignor Part No',headerName:'Consignor Part No	',flex:1, headerClassName: classes.blueHeader },
        {field: 'Consignor Decription	',headerName:'Consignor Decription',flex:1, headerClassName: classes.blueHeader },
        { field: 'Consignee Name	', headerName: 'Consignee Name	', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'To	', headerName: 'To	', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'Consignee Part No		', headerName: 'Consignee Part No	', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'DC NO		', headerName: 'DC NO		', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'DC Date		', headerName: 'DC Date		', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'DC From		', headerName: 'DC From	', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'DC To	', headerName: 'DC To	', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'Memo NO		', headerName: 'Memo NO		', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'Memo Date			', headerName: 'Memo Date			', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'Memo From			', headerName: 'Memo From		', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'Memo To		', headerName: 'Memo To		', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'Inward Date		', headerName: 'Inward Date		', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'Inward Branch	', headerName: 'Inward Branch		', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'Delivery Date		', headerName: 'Delivery Date		', flex: 1 , headerClassName: classes.blueHeader },
        { field: 'LR Status		', headerName: 'LR Status		', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'Bill No			', headerName: 'Bill No		', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'Bill Date		', headerName: 'Bill Date		', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'Bill Amount		', headerName: 'Bill Amount			', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'PO Number		', headerName: 'PO Number		', flex: 1, headerClassName: classes.blueHeader  },
        { field: 'PO Date', headerName: 'PO Date', flex: 1 , headerClassName: classes.blueHeader },
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
          Sales invoice Pending Report
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
  )
}

export default SaleInvoiceReportII
