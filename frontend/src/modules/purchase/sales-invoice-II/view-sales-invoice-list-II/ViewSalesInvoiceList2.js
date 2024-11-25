import { Autocomplete, Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});

const ViewSalesInvoiceList2 = () => {
  const classes = useStyles();
  
  const columns = [
    { field: 'sr No', headerName: 'sr No', flex: 1, headerClassName: classes.blueHeader },
    { field: 'Bill No		', headerName: 'Bill No	', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'bill Date	', headerName: 'bill Date		', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'Bill Amount	', headerName: 'Bill Amount		', flex: 1 , headerClassName: classes.blueHeader},
    { field: 'Customer Name		', headerName: 'Customer Name		', flex: 1 , headerClassName: classes.blueHeader},
    {field: 'PO NO	',headerName:'PO NO',flex:1, headerClassName: classes.blueHeader},
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
  
  const rows = [
    {
      id: 1,
      sn: 1,

    }
  ];
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
   Sale Invoice II List
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
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
   </>
  )
}

export default ViewSalesInvoiceList2
