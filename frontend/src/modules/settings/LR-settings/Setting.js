import { Autocomplete, Box, Divider, FormControl, Grid, TextField, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import InputBase from '@mui/material/InputBase';
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
  height: '50px', // Adjust the height as needed
};

function Setting() {
  const classes = useStyles();
  const columns = [
    { field: 'id', headerName: 'Sr No', flex: 1, headerClassName: classes.blueHeader  },
    { field: 'blankLRNo', headerName: 'Blank LR No', flex: 1, headerClassName: classes.blueHeader  },
  ];

  const rows = [
    {
      id: 1,
      blankLRNo: '12345', // Example value
    },
  ];

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Grid item xs={6} md={2}>
          <Autocomplete
            options={[]} // Add options here
            getOptionLabel={(option) => option.label}
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
        <Grid item>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: '1.75rem',
              marginBottom: 2,
            }}
          >
            Add Consignment Range
          </Typography>
        </Grid>
        <Grid item xs={6} md={2}>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '2px 20px', marginRight: '1%', backgroundColor: 'white' }}>
              <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ width: '150px' }} />
            </div>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }} />

      <Grid container justifyContent="center" alignItems="center" marginBottom={1}>
      <Grid item xs={3}>
          <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch Name"
                variant="outlined"
                fullWidth
                size="small"
                name="assignedCrew"
                //error={formik.errors.assignedCrew && formik.touched.assignedCrew}
                //helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
                //onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid>
        </Grid>

        <Grid container justifyContent="center" alignItems="center" marginBottom={1} >
        <Grid item xs={3}>
        <Autocomplete
            options={[]}
            //getOptionLabel={(option) => option.label}
            //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            //value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Years"
                variant="outlined"
                fullWidth
                size="small"
                name="assignedCrew"
                //error={formik.errors.assignedCrew && formik.touched.assignedCrew}
                //helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
                //onBlur={formik.handleBlur}
              />
            )}
          />
    </Grid>
    </Grid>


    <Grid container justifyContent="center" alignItems="center" marginBottom={1} >
    <Grid  item xs={3}>
    <TextField
    className="customTextField"
    name="Consignment Part No"
    label="Consignment Book No Start"
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

        <Grid container justifyContent="center" alignItems="center" marginBottom={1} >
        <Grid  item xs={3}>
        <TextField
    className="customTextField"
    name="Consignment Part No"
    label="Consignment Book No End"
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

      <Grid container justifyContent="center" alignItems="center" marginBottom={1} >
        <Grid  item xs={3}>
        <TextField
    className="customTextField"
    name="Consignment Start No"
    label="Consignment Start No"
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

        <Grid container justifyContent="center" alignItems="center" marginBottom={2} >
        <Grid item  xs={3}>
        <TextField
    className="customTextField"
    name="Consignment Part No"
    label="Consignment End No"
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
        
  
   
        
  
    

      <Grid container justifyContent="center" alignItems="center" spacing={4} marginBottom={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: 'green',marginRight:'50px' }}>
            Save
          </Button>

          <Button variant="contained" color="primary" style={{ backgroundColor: '#D92445',}}>
            Cancel
          </Button>
        </Grid>
      </Grid>

   

      {/* <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box> */}
    </>
  );
}

export default Setting;
