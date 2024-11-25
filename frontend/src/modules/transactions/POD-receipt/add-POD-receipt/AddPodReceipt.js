import { Autocomplete, Box, Button, Divider, FormControl, Grid, styled, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import { alpha } from '@material-ui/core';

function AddPodReceipt() {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const fixedHeight = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100px', // Adjust the height as needed
  };
  
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
           POD Receipt Details

          </Typography>
        </Grid>
      </Grid>

    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

    <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
    <Grid item xs={2.9}>
      <Box style={fixedHeight}>
        <FormControl fullWidth size='small'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="dateResolved"
              format="MM-DD-YYYY"
              label="POD Receipt Date"
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    </Grid>

    <Grid item xs={2.9}>
      <Box style={fixedHeight}>
        <FormControl fullWidth size='small'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="dateResolved"
              format="MM-DD-YYYY"
              label="Form"
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    </Grid>

    <Grid item xs={2.9}>
      <Box style={fixedHeight}>
        <FormControl fullWidth size='small'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="dateResolved"
              format="MM-DD-YYYY"
              label="To"
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    </Grid>

    <Grid item xs={2.9}>
      <Box style={fixedHeight}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Box>
    </Grid>
  </Grid>

  <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Consignment Number</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={0} sx={{ margin: '0px auto',justifyContent:'center'}}>

<Grid item xs={1.2} mt={5} mb={2}>
  <Button variant="contained" sx={{backgroundColor:'#18c5a9'}}  >
  Save
  </Button>
</Grid>

<Grid item xs={1.2} mt={5} mb={2}>
<Button variant="contained" sx={{backgroundColor:'#D92445'}}   >
cancel
  </Button>
</Grid>
</Grid>
  </>
  )
}

export default AddPodReceipt ;