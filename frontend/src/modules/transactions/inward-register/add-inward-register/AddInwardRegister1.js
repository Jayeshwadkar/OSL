import { Autocomplete, Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';


const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});

function AddInwardRegister1() {
    
  const classes = useStyles();

  const columns = [
    { field: 'sn', headerName: 'SN',flex:1 ,headerClassName: classes.blueHeader},
    { field: 'invNo', headerName: 'InvNo', flex:1, headerClassName: classes.blueHeader},
    { field: 'invDate', headerName: 'InvDate',flex:1, headerClassName: classes.blueHeader},
    { field: 'description', headerName: 'Description', flex:1,headerClassName: classes.blueHeader},
    { field: 'articles', headerName: 'Articles',flex:1,headerClassName: classes.blueHeader },
    { field: 'noArticles', headerName: 'No.Articles', flex:1,headerClassName: classes.blueHeader},
    { field: 'qty', headerName: 'Qty', flex:1 ,headerClassName: classes.blueHeader},
    {
      field: 'InvAmt',
      headerName: 'Inv amt',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => `₹${params.row.InvAmt}`,
    },
    { field: 'ConsignmentNo', headerName: 'Consignment No',flex:1 ,headerClassName: classes.blueHeader},
    { field: 'ConsignmentDate', headerName: 'Consignment Date', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'consigner', headerName: 'Consigner', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'from', headerName: 'From', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'consignee', headerName: 'Consignee', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'to', headerName: 'To', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'weight', headerName: 'Weight', flex:1,headerClassName: classes.blueHeader},
  ];
  
  const rows = [
    { id: 1, sn: 1, invNo: 'INV001', invDate: '2024-07-13', description: 'Item 1', articles: 'A1', noArticles: 2, qty: 10, InvAmt: 100, lrNo: 'LR001', lrDate: '2024-07-14', consigner: 'John Doe', from: 'City A', consignee: 'Jane Smith', to: 'City B', weight: 50 },
    // Add more rows as needed
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

<Box sx={{ height: 200, width: '100%',marginBottom:'2%' }}>
  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    
  />
</Box>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>
 </>
  )
}

export default AddInwardRegister1
