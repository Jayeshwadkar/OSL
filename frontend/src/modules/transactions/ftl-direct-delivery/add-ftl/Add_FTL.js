import React from 'react'
import { Autocomplete, Box, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, Grid, ImageList, ImageListItem, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import Add_FTL1 from './Add_FTL1';
import Add_FTL2 from './Add_FTL2';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});

function Add_FTL() {
  const classes = useStyles();

  const columns = [
    { field: 'SN', headerName: 'SN',flex:1 ,headerClassName: classes.blueHeader},
    { field: 'DCNo', headerName: 'DCNo',flex:1,headerClassName: classes.blueHeader },
    { field: 'LRNo', headerName: 'LRNo', flex:1 ,headerClassName: classes.blueHeader},
    { field: 'LRDate', headerName: 'LRDate', flex:1 ,headerClassName: classes.blueHeader},
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
            <Grid container  >
        <Grid item xs={6} md={2}>
          <Autocomplete
            //options={options}
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
            sx={{ fontFamily: 'poppins', fontSize: '1.34rem', marginBottom: 2 , display:'flex'}}
          >
FTL Vehicle Hire (Direct-Delivery)

          </Typography>
        </Grid>
      </Grid>


    
    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>
   
    <Grid container spacing={1} sx={{ marginTop: '0px' }}>
    
    <Grid item xs={4}>
              <TextField
                className="customTextField"
                name="Memo No:"
                label="Memo No:"
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
            <Grid item xs={4}>
        <Autocomplete
         options={[]}
          // getOptionLabel={(option) => option.label}
          // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
          // value={formik.values.assignedCrew}
          renderInput={(params) => (
            <TextField
              {...params}
              label="From :"
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

      <Grid item xs={4}>
        <Autocomplete
         options={[]}
          // getOptionLabel={(option) => option.label}
          // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
          // value={formik.values.assignedCrew}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Driver Name 1:"
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

            <Grid item xs={4}>
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
            <Grid item xs={4}>
        <Autocomplete
         options={[]}
          // getOptionLabel={(option) => option.label}
          // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
          // value={formik.values.assignedCrew}
          renderInput={(params) => (
            <TextField
              {...params}
              label="To :"
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

      <Grid item xs={4}>
              <TextField
                className="customTextField"
                name="License no:"
                label="License no:"
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
            <Grid item xs={4}>
              <TextField
                className="customTextField"
                name="Vehicle Type:"
                label="Vehicle Type:"
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
            <Grid item xs={4}>
        <Autocomplete
         options={[]}
          // getOptionLabel={(option) => option.label}
          // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
          // value={formik.values.assignedCrew}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Transport Mode:"
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

      <Grid item xs={4}>
              <TextField
                className="customTextField"
                name="Mobile no:"
                label="Mobile no:"
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
            <Grid item xs={4} >
              <TextField
                className="customTextField"
                name="Vehicle Owner:"
                label="Vehicle Transpoter/Owner:"
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
            <Grid item xs={4}>
        <Autocomplete
            options={[]}
            // getOptionLabel={(option) => option.label}
          // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
          // value={formik.values.assignedCrew}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Delivery Type:"
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
       
      <Grid item xs={4}>
        <Autocomplete
         options={[]}
          // getOptionLabel={(option) => option.label}
          // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
          // value={formik.values.assignedCrew}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Driver Name 2:"
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
            
            <Grid item xs={4}>
            <ResizableTextField
        id="outlined-multiline-flexible"
        label="Owner Transpoter/Address:"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
      />
          

              
              {/* <TextField
                className="customTextField"
                name="Owner Address:"
                label="Owner Address:"
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


            <Grid item xs={4} >
              <TextField
                className="customTextField"
                name="Vehilce Current Reading:"
                label="Vehilce Current Reading:"
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
            <Grid item xs={4}>
              <TextField
                className="customTextField"
                name="License no:"
                label="License no:"
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

            <Grid item xs={4} mb={3}>
              <TextField
                className="customTextField"
                name="Owner Contact:"
                label="Transpoter/Owner Contact:"
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
    <Grid item xs={4}>

    </Grid>
    
          
          
           
            <Grid item xs={4}>
              <TextField
                className="customTextField"
                name="Mobile no:"
                label="Mobile no:"
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
           
     
      {/* <Grid item xs={2.4}>
        <Autocomplete
         options={[]}
          // getOptionLabel={(option) => option.label}
          // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
          // value={formik.values.assignedCrew}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Delv.Type:"
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
      </Grid> */}
    
      
     
    </Grid>
    
    
<Add_FTL1 />
<Add_FTL2 />
     </>
  )
}

export default Add_FTL ;
