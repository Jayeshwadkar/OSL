import React from 'react'
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

function Add_memo7() {
  const classes = useStyles();

  const columns = [
    { field: 'SN', headerName: 'SN',flex:1 ,headerClassName: classes.blueHeader},
    { field: 'DCNo', headerName: 'DCNo',flex:1,headerClassName: classes.blueHeader },
    { field: 'ConsignmentNo', headerName: 'Consignment No', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'ConsignmentDate', headerName: 'Consignment Date', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'Consignor', headerName: 'Consignor', flex:1,headerClassName: classes.blueHeader },
    { field: 'From', headerName: 'From',flex:1 ,headerClassName: classes.blueHeader},
    { field: 'Consignee', headerName: 'Consignee',flex:1,headerClassName: classes.blueHeader},
    { field: 'To', headerName: 'To', flex:1,headerClassName: classes.blueHeader },
    { field: 'InvNo', headerName: 'InvNo',flex:1 ,headerClassName: classes.blueHeader},
    { field: 'InvDate', headerName: 'InvDate', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'PartNo', headerName: 'Part No', flex:1 ,headerClassName: classes.blueHeader},

    { field: 'Desc', headerName: 'Desc', flex:1 ,headerClassName: classes.blueHeader},
    {
      field: 'InvAmt',
      headerName: 'Inv amt',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => `₹${params.row.InvAmt}`,
    },
    { field: 'Art', headerName: 'Art', flex:1,headerClassName: classes.blueHeader },
    { field: 'NoArt', headerName: 'No.Art', flex:1,headerClassName: classes.blueHeader },
    { field: 'Qty', headerName: 'Qty', flex:1,headerClassName: classes.blueHeader},
    { field: 'Weight', headerName: 'Weight', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'EwayBill', headerName: 'Eway Bill', flex:1 ,headerClassName: classes.blueHeader},
  ];
  
  const rows = [
    { id: 1, SN: '1', DCNo: '1234', LRNo: '5678', LRDate: '2023-01-01', Consignor: 'Company A', From: 'Location A', Consignee: 'Company B', To: 'Location B', InvNo: '1111', InvDate: '2023-01-01', PartNo: 'P001', Desc: 'Item Description A', InvAmt: '1000', Art: 'Art A', NoArt: '5', Qty: '10', Weight: '100kg', EwayBill: 'EW12345678' },
    // { id: 2, SN: '2', DCNo: '1235', LRNo: '5679', LRDate: '2023-01-02', Consignor: 'Company C', From: 'Location C', Consignee: 'Company D', To: 'Location D', InvNo: '1112', InvDate: '2023-01-02', PartNo: 'P002', Desc: 'Item Description B', InvAmt: '2000', Art: 'Art B', NoArt: '10', Qty: '20', Weight: '200kg', EwayBill: 'EW12345679' },
    // { id: 3, SN: '3', DCNo: '1236', LRNo: '5680', LRDate: '2023-01-03', Consignor: 'Company E', From: 'Location E', Consignee: 'Company F', To: 'Location F', InvNo: '1113', InvDate: '2023-01-03', PartNo: 'P003', Desc: 'Item Description C', InvAmt: '3000', Art: 'Art C', NoArt: '15', Qty: '30', Weight: '300kg', EwayBill: 'EW12345680' },
    // { id: 4, SN: '4', DCNo: '1237', LRNo: '5681', LRDate: '2023-01-04', Consignor: 'Company G', From: 'Location G', Consignee: 'Company H', To: 'Location H', InvNo: '1114', InvDate: '2023-01-04', PartNo: 'P004', Desc: 'Item Description D', InvAmt: '4000', Art: 'Art D', NoArt: '20', Qty: '40', Weight: '400kg', EwayBill: 'EW12345681' },
    // { id: 5, SN: '5', DCNo: '1238', LRNo: '5682', LRDate: '2023-01-05', Consignor: 'Company I', From: 'Location I', Consignee: 'Company J', To: 'Location J', InvNo: '1115', InvDate: '2023-01-05', PartNo: 'P005', Desc: 'Item Description E', InvAmt: '5000', Art: 'Art E', NoArt: '25', Qty: '50', Weight: '500kg', EwayBill: 'EW12345682' },
];


  const ResizableTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      resize: 'both',
      overflow: 'auto',
    },
  });
  return (
    <>
   
    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>
   
     
     
   <Paper elevation={3} sx={{ backgroundColor: '#f5f5f5' }}>
           <Grid container >
             <Grid item xs={6} md={2} sx={{ marginTop: 1 }}>
               <Typography
                 sx={{ fontFamily: 'poppins', fontSize: '1.5rem', marginBottom: 2, marginLeft: 2 }}
               >
DC List
               </Typography>
             </Grid>
             <Grid item xs={6} md={2} sx={{ float: 'center' }}>
             </Grid>
             <Grid item xs={6} md={2} sx={{ float: 'center' }}>
             </Grid>
             <Grid item xs={6} md={3.7} sx={{ float: 'center' }}>
             </Grid>
             <Grid item xs={6} md={2} sx={{ marginTop: 1 }}>
               <TextField
                 className="customTextField"
                 name="wrNo"
                 label="Search ..."
                 fullWidth
                 size='small'
                 variant="outlined"
               // error={formik.errors.wrNo && formik.touched.wrNo}
               // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
               // onBlur={formik.handleBlur}
               // onChange={formik.handleChange}
               // value={formik.values.wrNo}
               />
             </Grid>
           </Grid>
           <Divider sx={{ backgroundColor: 'black' }} />
           <br />
           <ImageList variant="standard"     sx={{
       width: '1275px',
       height: '170px', 
       margin: '0px auto',
       padding: '8px 0', 
       overflowY: 'auto',
       '& .MuiImageList-standard': {
         padding: '4px', 
       }
     }}   cols={6} >
            
            <>
   
            </>
          
           </ImageList><br />
           <Button variant="contained" color="success" startIcon={<AddIcon />} sx={{ float: 'left', marginLeft: 2 }}>
             Add
           </Button><br /><br />
           <Divider sx={{ backgroundColor: 'black' }} /><br />
      
           <br /><br /><br />
         </Paper><br /><br /><br />
 
         <Box sx={{ height: 200, flex:1 }}>
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

export default Add_memo7
