import { Autocomplete,  Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles,styled } from '@mui/styles';


function Add_Consignment_Entry3({handlefreightData}) {
  const [formdata,setFormdata]=useState({
    Freight:0,
    ExtCharges:0,
    VaraiHamali:0,
    Collection:0,
    DoorDelivery:0,
    WeightChar:0,
    Other:0,
    Statistical:0,
    SubTotal:0,
    IGST:0,
    CGST:0,
    SGST:0,
    Total:0,
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    handlefreightData(formdata);
  }, [formdata]);
  return (
  <>
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
          value={formdata.Freight}
          variant="outlined"
          onChange={handleInputChange}
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
          name="ExtCharges"
          label="Ext Charges"
          fullWidth
          value={formdata.ExtCharges}
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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
          name="VaraiHamali"
          label="Varai/Hamali"
          fullWidth
          variant="outlined"
          value={formdata.VaraiHamali}
          size="small"
          onChange={handleInputChange}
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
          value={formdata.Collection}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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
          name="DoorDelivery"
          label="Door/Delivery"
          value={formdata.DoorDelivery}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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
          name="WeightChar"
          label="Weight Charge"
          fullWidth
          variant="outlined"
          value={formdata.WeightChar}
          size="small"
          onChange={handleInputChange}
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
          value={formdata.Other}
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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
          name="Statistical"
          label="Statistical"
          fullWidth
          value={formdata.Statistical}
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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
          name="SubTotal"
          label="Sub Total"
          fullWidth
          value={formdata.SubTotal}
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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
          name="IGST"
          label="IGST%"
          fullWidth
          value={formdata.IGST}
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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
          name="CGST"
          label="CGST%"
          fullWidth
          value={formdata.CGST}
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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
          name="SGST"
          label="SGST%"
          fullWidth
          value={formdata.SGST}
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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
          name="Total"
          label="Total"
          fullWidth
          value={formdata.Total}
          variant="outlined"
          size="small"
          onChange={handleInputChange}
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


  </>
  )
}

export default Add_Consignment_Entry3
