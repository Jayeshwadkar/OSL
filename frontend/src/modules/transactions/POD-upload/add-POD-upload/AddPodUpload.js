import { Autocomplete, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

function AddPodUpload() {

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
           
            borderRadius: 4,
          },
        },
      },
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
          POD Details


          </Typography>
        </Grid>
      </Grid>

    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

    <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
    <Grid item xs={3}>
              <TextField
                className="customTextField"
                name="POD Number"
                label="POD Number"
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

            <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

            <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
            <ThemeProvider theme={theme}>
      <TextField
        variant="outlined"
        type="file"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </ThemeProvider>
            </Grid>


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

export default AddPodUpload ;