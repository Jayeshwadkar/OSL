import { Autocomplete, Divider, Grid, TextField, Button, MenuItem } from '@mui/material'; // Import Button from MUI
import React, { useEffect, useState } from 'react';

function Add_Consignment_Entry4({handleBillingData}) {
  const formContainerStyle = {
    width: '100%', // Make sure the container takes full width
    margin: 0, // Remove any default margin
  };
  const [formData,setFormData]=useState({
    DelvType:'',
    DelvDays:0,
    WeightType:'partload',
    Paybill:'bill',
    ToBilled:'consigner',
    CollectAt:'pune',
    Remark:''
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    handleBillingData(formData);
  }, [formData]);
  return (
    <>
      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>
        Billing Details
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={2} style={formContainerStyle} marginBottom={2}>
        <Grid item xs={12} sm={2.4}>
        <TextField
  className="customTextField"
  sx={{
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  }}
  name="DelvType"
  label="Delv Type:"
  fullWidth
  value={formData.transportmode}
  variant="outlined"
  size="small"
  onChange={handleInputChange}
  select 
>
  <MenuItem value="line">Line</MenuItem>
  <MenuItem value="local">Local</MenuItem>
</TextField>         
        </Grid>
        <Grid item xs={12} sm={2.4}>
          <TextField
            className="customTextField"
            name="DelvDays"
            label="Delv(Days):"
            fullWidth
            variant="outlined"
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={2.4}>
        <TextField
  className="customTextField"
  sx={{
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  }}
  name="WeightType"
  label="Weight Type:"
  fullWidth
  value={formData.WeightType}
  variant="outlined"
  size="small"
  onChange={handleInputChange}
  select 
>
  <MenuItem value="partload">Part Load</MenuItem>
  <MenuItem value="flt">FLT</MenuItem>
  <MenuItem value="lcv">LCV</MenuItem>
  <MenuItem value="warehouse">Ware House Area</MenuItem>
  <MenuItem value="flt9ton">FLT(9Ton)</MenuItem>
  <MenuItem value="flt16ton">FLT(16Ton)</MenuItem>
  <MenuItem value="flt25ton">FLT(25Ton)</MenuItem>
  <MenuItem value="tataace">Tata Ace</MenuItem>
  <MenuItem value="3wheeler">3 Wheeler</MenuItem>
  <MenuItem value="lcv6ton">LCV(6Ton)</MenuItem>
  <MenuItem value="407load">407 Load</MenuItem>
  <MenuItem value="407lpt">407 LPT</MenuItem>
  <MenuItem value="1109load">1109 Load</MenuItem>
  <MenuItem value="quantity">Quantity</MenuItem>
  <MenuItem value="407lpt">407 LPT</MenuItem>
  <MenuItem value="909">909</MenuItem>
  <MenuItem value="pickup">Pick Up</MenuItem>
</TextField>
        </Grid>

        <Grid item xs={12} sm={2.4}>
        <TextField
  className="customTextField"
  sx={{
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  }}
  name="Paybill"
  label="Paybill:"
  fullWidth
  value={formData.Paybill}
  variant="outlined"
  size="small"
  onChange={handleInputChange}
  select 
>
  <MenuItem value="topay">To Pay</MenuItem>
  <MenuItem value="paid">Paid</MenuItem>
  <MenuItem value="bill">Bill</MenuItem>
  <MenuItem value="foc">FOC</MenuItem>
  <MenuItem value="cod">COD</MenuItem>
  <MenuItem value="dod">DOD</MenuItem>
</TextField>    
        </Grid>

        <Grid item xs={12} sm={2.4}>
        <TextField
  className="customTextField"
  sx={{
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  }}
  name="ToBilled"
  label="To Billed:"
  fullWidth
  value={formData.ToBilled}
  variant="outlined"
  size="small"
  onChange={handleInputChange}
  select 
>
  <MenuItem value="consigner">Consigner</MenuItem>
  <MenuItem value="consignee">Consignee</MenuItem>
  <MenuItem value="thirdparty">Third Party</MenuItem>
</TextField>
        </Grid>

        <Grid item xs={12} sm={2.4}>
        <TextField
  className="customTextField"
  sx={{
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  }}
  name="CollectAt"
  label="Collect At:"
  fullWidth
  value={formData.CollectAt}
  variant="outlined"
  size="small"
  onChange={handleInputChange}
  select 
  disabled
>
  <MenuItem value="pune">Pune</MenuItem>
</TextField>
        </Grid>

        <Grid item xs={12} sm={2.4}>
          <TextField
            className="customTextField"
            name="Remark"
            label="Remark"
            fullWidth
            value={formData.Remark}
            onChange={handleInputChange}
            variant="outlined"
            size='small'
          />
        </Grid>
      </Grid>


    </>
  );
}

export default Add_Consignment_Entry4;
