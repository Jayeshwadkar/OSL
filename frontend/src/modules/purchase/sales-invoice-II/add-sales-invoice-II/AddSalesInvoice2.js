import { Autocomplete, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});




function AddSalesInvoice() {
  const classes = useStyles();
  const ResizableTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      resize: 'both',
      overflow: 'auto',
    },
  });
  const [rows, setRows] = useState([])
  const columns = [
    { field: 'id', headerName: 'SN', flex: 1 , headerClassName: classes.blueHeader },
    {
      field: 'ConsignmentNo',
      headerName: 'Consignment No',
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'ConsignmentDate',
      headerName: 'Consignment Date',
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'Consignor Name		',
      headerName: 'Consignor Name		',
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'From	',
      headerName: 'From	',
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'Consignee Name		',
      headerName: 'Consignee Name		',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
  
    },
    {
      field: 'Last DC Date		',
      headerName: 'Last DC Date		',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'DC Vehicle No		',
      headerName: 'DC Vehicle No		',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'To',
      headerName: 'To',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'InvNo	',
      headerName: 'InvNo	',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'Description	',
      headerName: 'Description	',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'Part No	',
      headerName: 'Part No	',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'Articles	',
      headerName: 'Articles	',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'No.Articles 		',
      headerName: 'No.Articles 	',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'Qty ',
      headerName: 'Qty 	',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'CFT ',
      headerName: 'CFT 	',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'Weight 		',
      headerName: 'Weight 	',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'Rate	',
      headerName: 'Rate	',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
    {
      field: 'Value		',
      headerName: 'Value		',
      sortable: false,
      flex: 1, headerClassName: classes.blueHeader 
    },
   

  ];
  const fixedHeight = {
    height: '40%'
  };



  const classes1 = useStyles();
  
  const columns1 = [
    { field: 'sr No', headerName: 'sr No', flex: 1, headerClassName: classes1.blueHeader  },
    { field: 'Bill No		', headerName: 'Bill No	', flex: 1, headerClassName: classes1.blueHeader  },
    { field: 'bill Date	', headerName: 'bill Date		', flex: 1 , headerClassName: classes1.blueHeader },
    { field: 'Bill Amount	', headerName: 'Bill Amount		', flex: 1 , headerClassName: classes1.blueHeader },
    { field: 'Customer Name		', headerName: 'Customer Name		', flex: 1 , headerClassName: classes1.blueHeader },
    {field: 'PO NO	',headerName:'PO NO',flex:1, headerClassName: classes1.blueHeader },
    {
      field: 'action',headerAlign:'center', headerName: 'Action', flex: 1, headerClassName: classes.blueHeader, renderCell: (params) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'left' }}>
        <Tooltip title="Edit">
          <IconButton style={{ color: 'black' }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View">
          <IconButton style={{ color: 'black' }}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton style={{ color: 'black' }}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Block">
          <IconButton style={{ color: 'black' }}>
            <BlockIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Mail">
          <IconButton style={{ color: 'black' }}>
            <MailOutlineIcon />
          </IconButton>
        </Tooltip>
      </div>
      )
    },
    
  ];
  
  const rows1 = [
    {
      id: 1,
      sn: 1,

    }
  ];

  const columnss = [
    { field: 'sr No', headerName: 'sr No', flex: 1, headerClassName: classes.blueHeader  },
    { field: 'Exempted Description', headerName: 'Description	', flex: 1, headerClassName: classes.blueHeader  },
    // { field: 'Service Number', headerName: 'Service Number', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Quantity	', headerName: 'Quantity', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Rate	', headerName: 'Rate', flex: 1 , headerClassName: classes.blueHeader },
    {field: 'Amount',headerName:'Amount',flex:1, headerClassName: classes.blueHeader },
    {
      field: 'action',headerAlign:'center', headerName: 'Action', flex: 1, headerClassName: classes.blueHeader, renderCell: (params) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'left' }}>
        <Tooltip title="Edit">
          <IconButton style={{ color: 'black' }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View">
          <IconButton style={{ color: 'black' }}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton style={{ color: 'black' }}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Block">
          <IconButton style={{ color: 'black' }}>
            <BlockIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Mail">
          <IconButton style={{ color: 'black' }}>
            <MailOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton style={{ color: 'black' }} >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
      
      )
    },
    
  ];
  
  const rowss = [
    {
      id: 1,
      sn: 1,

    }
  ];

  const columns2 = [
    { field: 'sr No', headerName: 'sr No', flex: 1, headerClassName: classes.blueHeader  },
    { field: 'Description', headerName: 'Description	', flex: 1, headerClassName: classes.blueHeader  },
    { field: 'Service Number', headerName: 'Service Number', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Quantity	', headerName: 'Quantity', flex: 1 , headerClassName: classes.blueHeader },
    { field: 'Rate	', headerName: 'Rate', flex: 1 , headerClassName: classes.blueHeader },
    {field: 'Amount',headerName:'Amount',flex:1, headerClassName: classes.blueHeader },
    {
      field: 'action',headerAlign:'center', headerName: 'Action', flex: 1, headerClassName: classes.blueHeader, renderCell: (params) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'left' }}>
        <Tooltip title="Edit">
          <IconButton style={{ color: 'black' }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View">
          <IconButton style={{ color: 'black' }}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton style={{ color: 'black' }}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Block">
          <IconButton style={{ color: 'black' }}>
            <BlockIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Mail">
          <IconButton style={{ color: 'black' }}>
            <MailOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton style={{ color: 'black' }} >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
      
      )
    },
    
  ];
  
  const rows2 = [
    {
      id: 1,
      sn: 1,

    }
  ];
  return (
  <>
    <Grid container  >
    <Grid item xs={6} md={2}>
        <TextField
          className="customTextField"
          name="User Name :"
          label="User Name :"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>
    <Grid item xs={6} md={2} sx={{ float: 'center' }}>
    </Grid>
    <Grid item xs={6} md={2} ml={16} sx={{ float: 'center' }}>
      <Typography
        sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginLeft: 2 }}
      >
     SALES INVOICE II
      </Typography>
    </Grid>
  </Grid>

  
<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Bill Details</Grid>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name="Year"
          label="Year"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name="Bill No:"
          label="Bill No:"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <Box style={fixedHeight}>
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="dateResolved"
                format="MM-DD-YYYY"
                label="Bill Date"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name="SAC Code:"
          label="SAC Code:"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Consignor Name: "
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

        <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Consignee Name: "
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

        <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (

              <ResizableTextField
              {...params}
        id="outlined-multiline-flexible"
        label="Billing Address:"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
      />
              // <TextField
              //   {...params}
              //   label="Billing Address: "
              //   variant="outlined"
              //   fullWidth
              //   size='small'
              //   name="assignedCrew"
              // //error={formik.errors.assignedCrew && formik.touched.assignedCrew}
              // //helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
              // //onBlur={formik.handleBlur}

              // />
            )}
          />
        </Grid>
</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>PO Details</Grid>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Po Customer Name: "
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

        <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Po No:  "
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

   

        <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name="Po No:"
          label="Po No:"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      

        <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="PO Line:  "
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

        <Grid item xs={2.4}>
        <Box style={fixedHeight}>
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="Po Date:"
                format="MM-DD-YYYY"
                label="Po Date:"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="GST No: "
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

        <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" State"
          label=" State:"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

</Grid>


<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Local Customer Details</Grid>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Local Customer Name:  "
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
</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Collection Details</Grid>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" Collection Trip:"
          label=" Collection Trip:"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" Collection Rate:"
          label=" Collection Rate:"
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

      <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Collection From:  "
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

        <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Collection To:  "
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
</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Delivery Details</Grid>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" Delievery Trip"
          label=" Delievery Trip"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" Delievery Rate:"
          label=" Delievery Rate:"
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

      <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Delievery From: "
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


        <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Delievery To:   "
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
</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Rate Details</Grid>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" Rate"
          label=" Rate"
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
     
     

        <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" CGST"
          label=" CGST%"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" SGST"
          label=" SGST%"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" IGST"
          label=" IGST%"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="UOM"
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
</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Exempted Details</Grid>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" Exempted Description"
          label=" Exempted Description"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name="Quantity"
          label="Quantity"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" Rate"
          label=" Rate"
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

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" Exempted Amount"
          label="  Exempted Amount"
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

<Grid container sx={{justifyContent:'center',alignItems:'center',marginBottom:'2%'}}>
      <Grid item>
        <Button variant="contained" color="success" style={{padding:'5px 50px'}}>+Add</Button>
      </Grid>
    </Grid>

    <Box sx={{ height: 290, width: "100%" }} mb={2}>
        <DataGrid
          rows={rowss}
          columns={columnss}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>


      <Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Customise Details</Grid>

<Grid container spacing={1} sx={{ marginTop: "2px" }}>

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="Service Period/Text:"
            label="Service Period/Text:"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
       
        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="Service Number"
            label="Service Number:"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
        
        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="Select Special Customer if Needed"
            label="Select Special Customer if Needed:"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
  </Grid>  

  <Grid container spacing={1} sx={{ marginTop: "2px" }}>
  <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="Description/Text"
            label="Description/Text"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="Service Number"
            label="Service Number:"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="Quantity"
            label="Quantity"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={3}>
        <TextField
          className="customTextField"
          name=" Rate"
          label=" Rate"
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

      <Grid item xs={3}>
        <TextField
          className="customTextField"
          name=" Amount"
          label=" Amount"
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

  <Grid container sx={{justifyContent:'center',alignItems:'center',marginBottom:'2%'}}>
      <Grid item>
        <Button variant="contained" color="success" style={{padding:'5px 50px'}}>+Add</Button>
      </Grid>
    </Grid>

    <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows2}
          columns={columns2}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

{/* <Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
  

      <Grid item xs={2.4}>
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

       



      

        <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" 1Exempted Description"
          label=" 1Exempted Description"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" 2Exempted Description"
          label="2Exempted Description"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" 2Exempted"
          label=" 2Exempted"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" 3Exempted Description"
          label=" 3Exempted Description"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" 3Exempted"
          label=" 3Exempted"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" 4Exempted Description"
          label=" 4Exempted Description"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" 4Exempted"
          label=" 4Exempted"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" 5Exempted Description"
          label=" 5Exempted Description"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name=" 5Exempted"
          label=" 5Exempted"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>
     
      </Grid> */}

      

      <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

      <Grid item xs={6} md={2} ml={16} sx={{ float: 'center' }}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginLeft: 2 }}
          >
          Load Type

          </Typography>
        </Grid>

        

      <Grid container spacing={3} style={{ padding: '10px',marginBottom:'2%' }}>
     
    <Grid container item xs={3} direction="column" spacing={2} justifyContent={'left'} alignItems={'flex-start'} textAlign={'left'}>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="Loading Charges" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="909 Load" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="Detention Charges" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="Pick Up" />
      </Grid>
    </Grid>
    <Grid container item xs={3} direction="column" spacing={2} justifyContent={'left'} alignItems={'flex-start'} textAlign={'left'}>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="Unloading Charges" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="407 Load" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="Other Charges" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="2 Wheeler" />
      </Grid>
    </Grid>
    <Grid container item xs={3} direction="column" spacing={2} justifyContent={'left'} alignItems={'flex-start'} textAlign={'left'}>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="32 Feet Multi Axle" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="Tata Ace" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="Mathadi" />
      </Grid>
    </Grid>
    <Grid container item xs={3} direction="column" spacing={2} justifyContent={'left'} alignItems={'flex-start'} textAlign={'left'}>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="32 Feet" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="3 Wheeler" />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label="1109 Load" />
      </Grid>
    </Grid>
  </Grid>

  <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>LR Details</Grid>

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

    <Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name="Total Invoice Weight:"
          label="Total Invoice Weight:"
          fullWidth
          variant="outlined"
          size="small"
        />
    </Grid>

    <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name="LR Count:"
          label="LR Count:"
          fullWidth
          variant="outlined"
          size="small"
        />
    </Grid>

    <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name="LR Charge:"
          label="LR Charge:"
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

    <Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
      <Grid item xs={12}>
        <TextField
          className="customTextField"
          name="Remarks:"
          label="Remarks:"
          fullWidth
          variant="outlined"
          size="small"
        />
    </Grid>
    </Grid>

    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

    <Grid container spacing={2} sx={{ margin: '0px auto', justifyContent: 'center', alignItems: 'center' ,marginBottom:'2%'}}>
  <Grid item xs={2}>
    <Button variant="contained" sx={{ backgroundColor: '#6573c3' }}>
      Save & Original Print
    </Button>
  </Grid>
  <Grid item xs={2}>
    <Button variant="contained" sx={{ backgroundColor: '#a881af' }}>
      Duplicate Print
    </Button>
  </Grid>
  <Grid item xs={2}>
    <Button variant="contained" sx={{ backgroundColor: '#dd7973' }}>
      Extra Print
    </Button>
  </Grid>
  <Grid item xs={2}>
    <Button variant="contained" sx={{ backgroundColor: '#002366' }}>
      Export to Excel
    </Button>
  </Grid>
  <Grid item xs={2}>
    <Button variant="contained" sx={{ backgroundColor: '#D92445' }}>
      Cancel
    </Button>
  </Grid>
</Grid>

{/* 
<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

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
   Sale Invoice List
      </Typography>
    </Grid>
  </Grid>

  <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

  <Grid container spacing={1} sx={{ marginTop: '2px' }}>
      <Grid item xs={3}>
        <TextField
          className="customTextField"
          name="Sales Invoice No:"
          label="Sales Invoice No:"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Grid>



      <Grid item xs={12} md={1} style={{ marginTop: '8px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: 'green', borderRadius: '50px' }}
          >
            Search
          </Button>
        </Grid>

        <Grid item xs={1} style={{ marginTop: '8px' }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#D92445', borderRadius: '50px' }}
          >
            Delete
          </Button>
        </Grid>
    </Grid>
<br/>
    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

    
    <Box sx={{ height: 790, width: '100%' }}>
          <DataGrid
            rows={rows1}
            columns={columns1}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box> */}
  </>
  );
}

export default AddSalesInvoice