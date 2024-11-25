import { Autocomplete,  Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles,styled } from '@mui/styles';
 

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});


const ResizableTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    resize: 'both',
    overflow: 'auto',
  },
});


function AddLorryReceipt() {
  const [rows, setRows] = useState([])

  const fixedHeight = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100px', // Adjust the height as needed
  };
  
  const formContainerStyle = {
    width: '100%', // Make sure the container takes full width
    margin: 0, // Remove any default margin
  };
  
  const labelStyle = {
    fontFamily: 'Poppins',
    fontSize: '14px',
    justifyContent: 'left',
    textAlign: 'left',
    alignItems: 'flex-start',
    display: 'flex',
  };
  const classes = useStyles();

  const columns = [
    { field: 'id', headerName: 'SN', flex: 1,headerClassName: classes.blueHeader },
    {
      field: 'invNo',
      headerName: 'InvNo',
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'invDate',
      headerName: 'InvDate',
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'EwayNo	',
      headerName: 'Eway No	',
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'EwayDate	',
      headerName: 'Eway Date	',
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'EwayExpDate	',
      headerName: 'Eway Exp Date	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
  
    },
    {
      field: 'ConsignorPartNo	',
      headerName: 'Consignor Part No	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Consignee Part No	',
      headerName: 'Consignee Part No	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Desc',
      headerName: 'Desc',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Articles',
      headerName: 'Articles',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'No. Articles	',
      headerName: 'No. Articles	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Qty',
      headerName: 'Qty',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Inv Amt	',
      headerName: 'Inv Amt	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'CFT (L)	',
      headerName: 'CFT (L)	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'CFT (W)	',
      headerName: 'CFT (W)	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'CFT (H)	',
      headerName: 'CFT (H)	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: '10 12 20		',
      headerName: '10 12 20		',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'CFT 	',
      headerName: 'CFT	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Act. Wt		',
      headerName: 'Act. Wt		',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Char. Wt		',
      headerName: 'Char. Wt		',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Rate Per',
      headerName: 'Rate Per	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Rate	',
      headerName: 'Rate	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'Action',
      headerName: 'Action	',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },

  ];
  return (
    <>
   <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
  <Grid item xs={6} md={2}>
    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Branch"
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
  <Grid item>
    <Typography
      sx={{
        fontFamily: 'poppins',
        fontSize: '1.75rem',
        marginBottom: 2,
      }}
    >
      Lorry Receipt
    </Typography>
  </Grid>
  <Grid item xs={6} md={2}>
    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Transport Mode"
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
</Grid>
<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Lr No."
          label="Pun-2023"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Lr No."
          label="Lr No."
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <Box >
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="Date"
                format="MM-DD-YYYY"
                label="Date "
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={2.4} >
          <Autocomplete
options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Truck/Tempo No: "
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

        <Grid item xs={2.4} >
          <Autocomplete
options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
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

        <Grid item xs={2.4} >
          <Autocomplete
options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
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

        <Grid item xs={2.4} >
          <Autocomplete
options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Consignor"
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

        <Grid item xs={2.4} >
        <ResizableTextField
        id="outlined-multiline-flexible"
        label="Consignor Address:"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
      />
      </Grid>

      <Grid item xs={2.4} >
          <Autocomplete
options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Consignee: "
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

        <Grid item xs={2.4} >
        <ResizableTextField
        id="outlined-multiline-flexible"
        label="Consignee Address:"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
      />
      </Grid>
      
    
</Grid>


<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Transactions Details</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
  
<Grid item xs={12} sm={2.4}>
  
  <TextField
    className="customTextField"
    name="Inv. No"
    label="Inv. No"
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

<Grid item xs={12} sm={2.4}>
        <Box >
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="Inv Date"
                format="MM-DD-YYYY"
                label="Inv Date "
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12} sm={2.4}>
  
  <TextField
    className="customTextField"
    name="E-way Bill No"
    label="E-way Bill No"
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

<Grid item xs={12} sm={2.4}>
        <Box >
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="E-way Date"
                format="MM-DD-YYYY"
                label="E-way Date "
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12} sm={2.4}>
        <Box >
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="E-way Bill Exp Date"
                format="MM-DD-YYYY"
                label="E-way Bill Exp Date"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12} sm={2.4}>
        
    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Consignor Part No "
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

  <Grid item xs={12} sm={2.4}>
  
  <TextField
    className="customTextField"
    name="Description"
    label="Description"
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

<Grid item xs={12} sm={2.4}>
  
  <TextField
    className="customTextField"
    name="Consignee Part No"
    label="Consignee Part No"
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

<Grid item xs={12} sm={2.4}>
        
        <Autocomplete
         options={[]}
          // getOptionLabel={(option) => option.label}
          // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
          // value={formik.values.assignedCrew}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Articles "
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

  <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="No.Articles"
            label="No.Articles"
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

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="Quantity"
            label="Quantity"
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

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="Inv Amt"
            label="Inv Amt"
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

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="CFT(L)"
            label="CFT(L)"
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

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="CFT(W)"
            label="CFT(W)"
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

        <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="CFT(H)"
            label="CFT(H)"
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

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="CFT Conv. Factor"
            label="CFT Conv. Factor"
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

        <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="CFT"
            label="CFT"
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

        <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="Act.Wt"
            label="Act.Wt"
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

        <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="Char.Wt"
            label="Char.Wt"
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

        <Grid item xs={12} sm={2.4}>
        
    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Rate per"
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
  <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="Rate"
            label="Rate"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  &#8377;
                </InputAdornment>
              ),
            }}
            size='small'
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          // onChange={formik.handleChange}
          // value={formik.values.wrNo}
          />
        </Grid>
  </Grid>


  <Grid container sx={{justifyContent:'center',alignItems:'center',marginBottom:'2%'}}>
      <Grid item>
        <Button variant="contained" color="success" style={{padding:'5px 50px'}}>Add</Button>
      </Grid>
    </Grid>

    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

    <Grid marginBottom={2}>
    <DataGrid
          autoHeight
          density="compact"
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}

        />
    </Grid>

    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Freight Details</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>



<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Freight"
          label="Freight"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                &#8377;
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Ext Charges"
          label="Ext Charges"
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                &#8377;
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Varai/Hamali"
          label="Varai/Hamali"
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                &#8377;
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Collection"
          label="Collection"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Door/Delivery"
          label="Door/Delivery"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Weight Char"
          label="Weight Charge"
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                &#8377;
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Other"
          label="Other"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Statistical"
          label="Statistical"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Sub Total"
          label="Sub Total"
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                &#8377;
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="IGST%"
          label="IGST%"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="CGST%"
          label="CGST%"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="SGST%"
          label="SGST%"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4} >
        <TextField
          className="customTextField"
          name="Total"
          label="Total"
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                &#8377;
              </InputAdornment>
            ),
          }}
        />
      </Grid>

</Grid>



    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Billing Details</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={formContainerStyle} marginBottom={2}>
<Grid item xs={12} sm={2.4}>

    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Delv Type"
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

  <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="Delv(Days)"
            label="Delv(Days)"
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

        <Grid item xs={12} sm={2.4}>

    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Weight Type"
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

  <Grid item xs={12} sm={2.4}>

    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Paybill"
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

  <Grid item xs={12} sm={2.4}>

    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="To Billed "
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

  <Grid item xs={12} sm={2.4}>

    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Collect At"
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

  <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="Delv(Days)"
            label="Remark"
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

<Grid container spacing={0} sx={{ margin: '0px auto' }}>
          <Grid item xs={4.0} mt={1} mb={1}>
          
          </Grid>
          <Grid item xs={1.2} mt={5} >
            <Button variant="contained" sx={{backgroundColor:'#18c5a9'}}  >
            Save
            </Button>
          </Grid>
          <Grid item xs={1.5} mt={5} >
            <Button variant="contained" sx={{backgroundColor:'#5c6bc0'}}  >
              Orignal Print
            </Button>
          </Grid>
          <Grid item xs={1.2} mt={5} >
            <Button variant="contained" color="error"  >
             cancel
            </Button>
          </Grid>
        </Grid>

    </>
  );
}

export default AddLorryReceipt;
