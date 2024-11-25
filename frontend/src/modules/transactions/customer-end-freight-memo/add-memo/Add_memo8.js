import { Button, Grid, InputAdornment, Paper, TextField } from '@mui/material'
import React from 'react'

function Add_memo8() {
  return (
    <>
    
    <Paper elevation={3} sx={{ backgroundColor: '#f5f5f5', }}>
        <Grid container spacing={1} sx={{ marginTop: '20px'}}>
    <Grid item xs={2.4}>
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
            <Grid item xs={2.4}>
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
            <Grid item xs={2.4}>
              <TextField
                className="customTextField"
                name="Total Freight :"
                label="Total Freight :"
                fullWidth
                variant="outlined"
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      &#8377;
                    </InputAdornment>
                  ),
                }}
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
                name="Advance Amount :"
                label="Advance Amount :"
                fullWidth
                variant="outlined"
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      &#8377;
                    </InputAdornment>
                  ),
                }}
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
                name="Balance Amount :"
                label="Balance Amount :"
                fullWidth
                variant="outlined"
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      &#8377;
                    </InputAdornment>
                  ),
                }}
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
                name="Vehicle Pass :"
                label="Vehicle Pass :"
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
                name="Diesel :"
                label="Diesel :"
                fullWidth
                variant="outlined"
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      &#8377;
                    </InputAdornment>
                  ),
                }}
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
                name="Other Charges :"
                label="Other Charges :"
                fullWidth
                variant="outlined"
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      &#8377;
                    </InputAdornment>
                  ),
                }}
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
                name="Delivery Charges :"
                label="Delivery Charges :"
                fullWidth
                variant="outlined"
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      &#8377;
                    </InputAdornment>
                  ),
                }}
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
                name="Mathadi :"
                label="Mathadi :"
                fullWidth
                variant="outlined"
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      &#8377;
                    </InputAdornment>
                  ),
                }}
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
                name="Seal :"
                label="Seal :"
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
                name="Reference Name :"
                label="Reference Name :"
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
                name="Parking Charges :"
                label="Parking Charges :"
                fullWidth
                variant="outlined"
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      &#8377;
                    </InputAdornment>
                  ),
                }}
              // error={formik.errors.wrNo && formik.touched.wrNo}
              // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // value={formik.values.wrNo}
              />
            </Grid>
    
            <Grid item xs={4.8} >
              <TextField
                className="customTextField"
                name="Remark"
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
              <Grid item xs={3} mt={1} mb={1}>
              
              </Grid>
              <Grid item xs={1.2} mt={5} mb={2}>
                <Button variant="contained" sx={{backgroundColor:'green'}}  >
                Save
                </Button>
              </Grid>
              <Grid item xs={1.5} mt={5} mb={2}>
                <Button variant="contained" sx={{backgroundColor:'#5c6bc0'}}  >
                  Orignal Print
                </Button>
              </Grid>
              <Grid item xs={1} mt={5} mb={2}>
    <Button variant="contained" sx={{ backgroundColor: '#18c5a9' }}>
      E-Mail
    </Button>
  </Grid>
  <Grid item xs={1} mt={5} mb={2}>
    <Button variant="contained" sx={{ backgroundColor: 'blue' }}>
      Phone
    </Button>
  </Grid>
              <Grid item xs={1.2} mt={5} mb={2}>
              <Button variant="contained" sx={{backgroundColor:'#D92445'}}   >
              cancel
                </Button>
              </Grid>
            </Grid>
        </Paper>
  </>
  )
}

export default Add_memo8
