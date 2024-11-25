import React from 'react';
import { Autocomplete, Box, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, Grid, ImageList, ImageListItem, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});

function Add_memo2() {
  const classes = useStyles();

  const columns = [
    { field: 'SN', headerName: 'SN', flex: 1, headerClassName: classes.blueHeader },
    { field: 'DCNo', headerName: 'DCNo', flex: 1, headerClassName: classes.blueHeader },
    { field: 'Consignment No', headerName: 'Consignment No', flex: 1, headerClassName: classes.blueHeader },
    { field: 'Consignment Date', headerName: 'Consignment Date', flex: 1, headerClassName: classes.blueHeader },
    { field: 'Consignor', headerName: 'Consignor', flex: 1, headerClassName: classes.blueHeader },
    { field: 'From', headerName: 'From', flex: 1, headerClassName: classes.blueHeader },
    { field: 'Consignee', headerName: 'Consignee', flex: 1, headerClassName: classes.blueHeader },
    { field: 'To', headerName: 'To', flex: 1, headerClassName: classes.blueHeader },
    { field: 'InvNo', headerName: 'InvNo', flex: 1, headerClassName: classes.blueHeader },
    { field: 'InvDate', headerName: 'InvDate', flex: 1, headerClassName: classes.blueHeader },
    { field: 'PartNo', headerName: 'Part No', flex: 1, headerClassName: classes.blueHeader },
    { field: 'Desc', headerName: 'Desc', flex: 1, headerClassName: classes.blueHeader },
    {
      field: 'InvAmt',
      headerName: 'Inv amt',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => `₹${params.row.InvAmt}`,
    },
    { field: 'Art', headerName: 'Art', flex: 1, headerClassName: classes.blueHeader },
    { field: 'NoArt', headerName: 'No.Art', flex: 1, headerClassName: classes.blueHeader },
    { field: 'Qty', headerName: 'Qty', flex: 1, headerClassName: classes.blueHeader },
    { field: 'Weight', headerName: 'Weight', flex: 1, headerClassName: classes.blueHeader },
    { field: 'EwayBill', headerName: 'Eway Bill', flex: 1, headerClassName: classes.blueHeader },
  ];

  const rows = [
    {
      id: 1,
      SN: '1',
      DCNo: '1234',
      LRNo: '5678',
      LRDate: '2023-01-01',
      Consignor: 'Company A',
      From: 'Location A',
      Consignee: 'Company B',
      To: 'Location B',
      InvNo: '1111',
      InvDate: '2023-01-01',
      PartNo: 'P001',
      Desc: 'Item Description A',
      InvAmt: '1000',
      Art: 'Art A',
      NoArt: '5',
      Qty: '10',
      Weight: '100kg',
      EwayBill: 'EW12345678'
    },
    // other rows...
  ];

  const ResizableTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      resize: 'both',
      overflow: 'auto',
    },
  });

  return (
    <>
      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>
      <Paper elevation={3} sx={{ backgroundColor: '#f5f5f5' }}>
        <Grid container>
          <Grid item xs={6} md={2} sx={{ marginTop: 1 }}>
            <Typography
              sx={{ fontFamily: 'poppins', fontSize: '1.5rem', marginBottom: 2, marginLeft: 2 }}
            >
              DC List
            </Typography>
          </Grid>
          <Grid item xs={6} md={2} sx={{ float: 'center' }}></Grid>
          <Grid item xs={6} md={2} sx={{ float: 'center' }}></Grid>
          <Grid item xs={6} md={3.7} sx={{ float: 'center' }}></Grid>
          <Grid item xs={6} md={2} sx={{ marginTop: 1 }}>
            <TextField
              className="customTextField"
              name="wrNo"
              label="Search ..."
              fullWidth
              size='small'
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Divider sx={{ backgroundColor: 'black' }} />
        <br />
        <ImageList
          variant="standard"
          sx={{
            width: '1275px',
            height: '170px',
            margin: '0px auto',
            padding: '8px 0',
            overflowY: 'auto',
            '& .MuiImageList-standard': {
              padding: '4px',
            }
          }}
          cols={6}
        >
          <>
          </>
        </ImageList>
        <br />
        <Button variant="contained" color="success" startIcon={<AddIcon />} sx={{ float: 'left', marginLeft: 2 }}>
          Add
        </Button>
        <br /><br />
        <Divider sx={{ backgroundColor: 'black' }} />
        <br />
        <br /><br /><br />
      </Paper>
      <br /><br /><br />
      <Box sx={{ height: 200, flex: 1 }}>
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

export default Add_memo2;
