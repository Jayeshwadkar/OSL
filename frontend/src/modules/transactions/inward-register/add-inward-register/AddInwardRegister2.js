import { Button, Grid, styled, TextField } from '@mui/material'
import React from 'react'

function AddInwardRegister2() {
    const ResizableTextField = styled(TextField)({
        '& .MuiInputBase-root': {
          resize: 'both',
          overflow: 'auto',
        },
      });
  return (
   <>
   
   <Grid container spacing={1} sx={{ marginTop: '0px',marginBottom:'2%' }}>
    <Grid item xs={3}>
              <TextField
                className="customTextField"
                name="Total Packages :"
                label="Total Packages :"
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

            <Grid item xs={3}>
              <TextField
                className="customTextField"
                name="Total Weight :"
                label="Total Weight :"
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

            <Grid item xs={3}>
               <ResizableTextField
        id="outlined-multiline-flexible"
        label="Short Material Description"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
      />
            </Grid>

            <Grid item xs={3}>
              <TextField
                className="customTextField"
                name="Qty"
                label="Qty"
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

            <Grid item xs={3}>
               <ResizableTextField
        id="outlined-multiline-flexible"
        label="Excess Material Description"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
      />
            </Grid>

            <Grid item xs={3}>
              <TextField
                className="customTextField"
                name="Qty"
                label="Qty"
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

            <Grid container spacing={0} sx={{ margin: '0px auto' }}>
              <Grid item xs={4.0} mt={1} mb={1}>
              
              </Grid>
              <Grid item xs={1.2} mt={5} mb={2}>
                <Button variant="contained" sx={{backgroundColor:'#18c5a9'}}  >
                Save
                </Button>
              </Grid>
              <Grid item xs={1.5} mt={5} mb={2}>
                <Button variant="contained" sx={{backgroundColor:'#5c6bc0'}}  >
                  Orignal Print
                </Button>
              </Grid>
              <Grid item xs={1.2} mt={5} mb={2}>
              <Button variant="contained" sx={{backgroundColor:'#D92445'}}   >
              cancel
                </Button>
              </Grid>
            </Grid>
  </Grid>
   </>
  )
}

export default AddInwardRegister2
