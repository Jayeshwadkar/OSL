import { Autocomplete, Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import AddInwardRegister1 from './AddInwardRegister1';
import AddInwardRegister2 from './AddInwardRegister2';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});
function AddInwardRegister() {


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
    { field: 'lrNo', headerName: 'LRNo',flex:1 ,headerClassName: classes.blueHeader},
    { field: 'lrDate', headerName: 'LRDate', flex:1 ,headerClassName: classes.blueHeader},
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
    <Grid container  >
        <Grid item xs={6} md={2}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch"
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
              //error={formik.errors.assignedCrew && formik.touched.assignedCrew}
              //helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
              //onBlur={formik.handleBlur}

              />
            )}
          />
        </Grid>
        <Grid item xs={6} md={2} sx={{ float: 'center' }}>
        </Grid>
        <Grid item xs={6} md={2} ml={16} sx={{ float: 'center' }}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginLeft: 2 }}
          >
       Inward Register

          </Typography>
        </Grid>
      </Grid>

    <Grid container spacing={1} sx={{ marginTop: '0px',marginBottom:'2%' }}>
    <Grid item xs={2.4}>
    <Autocomplete
            options={[]}
            // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="DC No: "
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
          // error={formik.errors.assignedCrew && formik.touched.assignedCrew}
          // helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
          // onBlur={formik.handleBlur}
        />
      )}
    />
  </Grid>
  <Grid item xs={2.4}>
              <TextField
                className="customTextField"
                name="Vehicle No:"
                label="Vehicle No:"
                fullWidth
                variant="outlined"
                size='small'
              // error={formik.errors.wrNo && formik.touched.wrNo}
              // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // value={formik.values.wrNo}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                className="customTextField"
                name="Vehicle Owner:"
                label="Vehicle Owner:"
                fullWidth
                variant="outlined"
                size='small'
              // error={formik.errors.wrNo && formik.touched.wrNo}
              // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // value={formik.values.wrNo}
              />
            </Grid>
            <Grid item xs={2.4}>


            <ResizableTextField
        id="outlined-multiline-flexible"
        label="Address:"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
      />
              
              {/* <TextField
                className="customTextField"
                name="Address:"
                label="Address:"
                fullWidth
                variant="outlined"
                size='small'
              // error={formik.errors.wrNo && formik.touched.wrNo}
              // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // value={formik.values.wrNo}
              /> */}
            </Grid>
            <Grid item xs={2.4}>
    <Autocomplete
            options={[]}
            // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="From: "
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
          // error={formik.errors.assignedCrew && formik.touched.assignedCrew}
          // helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
          // onBlur={formik.handleBlur}
        />
      )}
    />
  </Grid>
  <Grid item xs={2.4}>
    <Autocomplete
            options={[]}
            // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="To: "
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
          // error={formik.errors.assignedCrew && formik.touched.assignedCrew}
          // helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
          // onBlur={formik.handleBlur}
        />
      )}
    />
  </Grid>
  <Grid item xs={2.4}>
              <TextField
                className="customTextField"
                name="Supervisor Name:"
                label="Supervisor Name:"
                fullWidth
                variant="outlined"
                size='small'
              // error={formik.errors.wrNo && formik.touched.wrNo}
              // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // value={formik.values.wrNo}
              />
            </Grid>

    </Grid>

<AddInwardRegister1 />
<AddInwardRegister2 />



  </>
  )
}

export default AddInwardRegister;
