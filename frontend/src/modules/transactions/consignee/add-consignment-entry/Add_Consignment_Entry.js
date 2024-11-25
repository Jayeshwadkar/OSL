import { Autocomplete,  Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles,styled } from '@mui/styles';
import Add_Consignment_Entry2 from './Add_Consignment_Entry2';
import Add_Consignment_Entry3 from './Add_Consignment_Entry3';
import Add_Consignment_Entry4 from './Add_Consignment_Entry4';
import { getAllBranchesList, getAllCustomerList, getAllPlacesList, getcity, getstate } from '../../../../lib/api-master';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import { Addlr, getallmasterforlr } from '../../../../lib/api-lr';
import dayjs from 'dayjs';

const ResizableTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    resize: 'both',
    overflow: 'auto',
  },
});

export default function Add_Consignment_Entry() {
    
      const [place,setPlace]=useState([])
      const [customer, setCustomer] = useState([]);
      const [branch, setBranch] = useState([]);
      const [articles, setArticles] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [vehicle,setVehicle]=useState([])
const [formData,setFormData]= useState({
  lrno:'',
  date:dayjs().format("YYYY-MM-DD HH:mm:ss"),
  transportmode:'surface',
  consignor:'',
  consignorAddress:'',
  branchcode:'',
  consignorstate:'',
  consignorgstno:'',
  consignorpincode:'',
  consignorcity:'',
  consignoremail:'',
  consignormobileno:'',
  consignee:'',
  consigneeAddress:'',
  consigneestate:'',
  consigneegstno:'',
  consigneepincode:'',
  consigneecity:'',
  consigneeemail:'',
  consigneemobileno:'',
  from:'',
  to:'',
  vehicleno:'',
  BillingDetails:{},
  rows: [],
  freightdetails:{}
})


const getallmaster = async () => {
  setIsLoading(true)
  try {
    const response = await getallmasterforlr();
    const { data } = response;
    const branch = data.branch
      .map((branch) => ({
        branch_id: branch.branch_id,
        branch_code: branch.branch_code,
      }));
      const customers = data.customer
      .map((customer) => ({
        customer_id: customer.customer_id,
        customer_name: customer.customer_name,
        customer_address: customer.address,
        customer_state:customer.state,
        customer_gstno:customer.gstno,
        pincode:customer.pincode,
        emailid:customer.emailid,
        mobileno:customer.telephoneno,
        city:customer.city
      }));
      const place = data.place
      .map((place) => ({
        place_id: place.place_id,
        place_name: place.place_name,
      }));
      const vehicle = data.vehicle
      .map((vehicle) => ({
        vehicle_id: vehicle.vehicle_id,
        vehicleno: vehicle.vehicleno,
      }));
      const articles = data.articles
      .map((vehicle) => ({
        articles_id: vehicle.articles_id,
        articles_name: vehicle.articles_name,
      }));
      setVehicle(vehicle)
      setCustomer(customers);
      setBranch(branch);
       setPlace(place);
       setArticles(articles)
  } catch (error) {
    console.error("Error fetching customer data:", error);
 
  }finally{
    setIsLoading(false)
  }
};


useEffect(() => {
  getallmaster()
}, [])
const handleAutocompleteChange = (type, event, value) => {
  let selectedType;

  if (type === 'consignor') {
    selectedType = customer.find((item) => item.customer_name === value);
    setFormData({
      ...formData,
      consignor: selectedType ? selectedType.customer_id : "",
      consignorAddress: selectedType ? selectedType.customer_address : "",
      consignorstate: selectedType ? selectedType.customer_state : "",
      consignorgstno:selectedType ? selectedType.customer_gstno : "",
      consignorpincode:selectedType && selectedType.pincode != null ? selectedType.pincode : "",
      consignoremail:selectedType ? selectedType.emailid : "",
      consignormobileno:selectedType ? selectedType.mobileno : "",
      consignorcity:selectedType ? selectedType.city : ""
     
    });
  }  else if (type === 'consignee') {
    selectedType = customer.find((item) => item.customer_name === value);
    setFormData({
      ...formData,
      consignee: selectedType ? selectedType.customer_id : "",
      consigneeAddress: selectedType ? selectedType.customer_address : "",
      consigneestate: selectedType ? selectedType.customer_state : "",
      consigneegstno:selectedType ? selectedType.customer_gstno : "",
      consigneepincode:selectedType && selectedType.pincode != null ? selectedType.pincode : "",
      consigneeemail:selectedType ? selectedType.emailid : "",
      consigneemobileno:selectedType ? selectedType.mobileno : "",
      consigneecity:selectedType ? selectedType.city : ""
     
    });
  } 
  else if (type === 'branch') {
    selectedType = branch.find((item) => item.branch_name === value);
    setFormData({
      ...formData,
      branchcode: selectedType ? selectedType.branch_id : ""
    });
  }else if (type === 'from') {
    selectedType = place.find((item) => item.place_name === value);
    setFormData({
      ...formData,
      from: selectedType ? selectedType.place_id : ""
    });
  }else if (type === 'to') {
    selectedType = place.find((item) => item.place_name === value);
    setFormData({
      ...formData,
      to: selectedType ? selectedType.place_id : ""
    });
  }else if (type === 'vehicle') {
    selectedType = vehicle.find((item) => item.vehicleno === value);
    setFormData({
      ...formData,
      vehicleno: selectedType ? selectedType.vehicle_id : ""
    });
  }
};
const handleDateChange = (date) => {
  if (!date) {
    console.error("handleDateChange: Invalid date received:", date);
    return;
  }

  if (!dayjs.isDayjs(date)) {
    console.error("handleDateChange: Date is not a Day.js object:", date);

    date = dayjs(date);
  }

  const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");

  setFormData((prevData) => ({
    ...prevData,
    date: formattedDate,
  }));
};
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
const handleBillingData = (combinedData) => {
  setFormData((prevData) => ({
    ...prevData,
    BillingDetails: combinedData
  }));
};
const handlerowsData = (rows) => {

  setFormData((prevData) => ({
    ...prevData,
    rows: rows
  }));
  
};
const handlefreightData = (combinedData) => {
  setFormData((prevData) => ({
    ...prevData,
    freightdetails: combinedData
  }));
};
const handleSave = async () => {  
  
    // setIsLoading(true);
    try {
      const combinedData = {
        ...formData
        //in_user_id: user.id, 
       // in_branch: selectedBranch, 
      };

      const response = await Addlr(combinedData);
      console.log(response.data.message)
    //  if(response.data.message != 'LR Already Exists!'){

    //   setConfirmmessage(response.data.message);
    //   setConfirmationopen(true);
    //   setColor('success')
     
    //   if (BillingDetail.emailConsigner== true){
    //     const consignor=localStorage.getItem("formdataConsignor")
        
    //     handleEmail(consignor,id)
    //   }
    //   if(BillingDetail.print == true){
        
    //     handlePrint(id)
    //   }
    //   if(BillingDetail.emailConsignee == true){
    //     const consignee=localStorage.getItem("formdataconsignee")
        
    //     handleConsEmail(consignee,id)
    //   }
    // }else{

    //   setConfirmmessage(response.data.message);
    //   setConfirmationopen(true);
    //   setColor('warning')
    // }
    } catch (error) {
      console.error("Error saving article:", error);
      console.log(error.data);
      // setConfirmmessage('Something Went Wrong!');
      // setConfirmationopen(true);
      // setColor('error')
   
    } 
    // finally {
    //   setIsLoading(false);
    // }
  
};
//console.log(formData)
  return (
   <>
    {isLoading && <LoadingSpinner />}
<Grid container justifyContent="center" alignItems="center"  marginBottom={2}>
  <Grid item>
    <Typography
      sx={{
        fontFamily: 'Poppins',
        fontSize: '1.75rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    Add  Consignment 
    </Typography>
  </Grid>
</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
<Grid item xs={4} >
<TextField
  className="customTextField"
  sx={{
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  }}
  name="transportmode"
  label="Transport Mode:"
  fullWidth
  value={formData.transportmode}
  variant="outlined"
  size="small"
  onChange={handleInputChange}
  select 
>
  <MenuItem value="surface">Surface</MenuItem>
  <MenuItem value="air">Air</MenuItem>
  <MenuItem value="train">Train</MenuItem>
  <MenuItem value="ship">Ship</MenuItem>
  <MenuItem value="other">Other</MenuItem>
</TextField>
      </Grid>
      <Grid item xs={4}>
    <Autocomplete
      options={
        customer ? customer.map((type) => type.customer_name) : []}
      renderInput={(params) => (
        <TextField
          {...params}
          name="consignor"
          variant="outlined"
          label="Consignor Name:"
          size="small"
          fullWidth
        />
      )}
      onChange={(event, value) =>
        handleAutocompleteChange('consignor',event, value)
      }     
    />
  </Grid>
  <Grid item xs={4}>
  <Autocomplete
      options={
        customer ? customer.map((type) => type.customer_name) : []}
      renderInput={(params) => (
        <TextField
          {...params}
          name="consignee"
          variant="outlined"
          label="Consignee Name:"
          size="small"
          fullWidth
        />
      )}
      onChange={(event, value) =>
        handleAutocompleteChange('consignee',event, value)
      }
     
    />
 
  </Grid>
  <Grid item xs={4}>
  <Autocomplete
      options={
        branch ? branch.map((type) => type.branch_code) : []
      }
      renderInput={(params) => (
        <TextField
          {...params}
          name="branchcode"
          variant="outlined"
          label="Branch Code:"
          size="small"
          fullWidth
        />
      )}
      onChange={(event, value) =>
        handleAutocompleteChange('branch',event, value)
      }
    />
   
  </Grid>
  <Grid item xs={4} >
        <ResizableTextField
        id="outlined-multiline-flexible"
        label="Consignor Address:"
        name='consignorAddress'
        value={formData.consignorAddress}
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
        disabled
      />
      </Grid>
      <Grid item xs={4} >
        <ResizableTextField
        id="outlined-multiline-flexible"
        label="Consignee Address:"
        name='consigneeAddress'
        value={formData.consigneeAddress}
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
        disabled
      />
      </Grid>
      <Grid item xs={4} >
        <TextField
          name="lrno"
          label="Lr No."
          fullWidth
          value={formData.lrno}
          variant="outlined"
          size="small"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={4} >
        <TextField
          className="customTextField"
          label="GST No."
          name="consignorgstno"
          value={formData.consignorgstno}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled

        />
      </Grid>
      <Grid item xs={4} >
      <TextField
          className="customTextField"
          label="GST No."
          name="consigneegstno"
          value={formData.consigneegstno}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled

        />
        
      </Grid>
      <Grid item xs={4} >
        <Box >
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              
                format="MM-DD-YYYY"
                label="LR Date "
                value={dayjs(formData.date)}
                        onChange={handleDateChange}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={4}>
      <TextField
          className="customTextField"
          label="State:"
          name="consignorstate"
          value={formData.consignorstate}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled
        />
      
    
  </Grid>

  <Grid item xs={4}>
  <TextField
          className="customTextField"
          label="State:"
          name="consigneestate"
          value={formData.consigneestate}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled
        />
  </Grid>

  <Grid item xs={4} >
  <Autocomplete
      options={
        vehicle ? vehicle.map((type) => type.vehicleno) : []
      }
      renderInput={(params) => (
        <TextField
          {...params}
          name="vehicleno"
          variant="outlined"
          label="Vehicle/truck No:"
          size="small"
          fullWidth
        />
      )}
      onChange={(event, value) =>
        handleAutocompleteChange('vehicleno',event, value)
      }
    />
        
      </Grid>
      <Grid item xs={4}>
      <TextField
          className="customTextField"
          label="City:"
          name="consignorcity"
          value={formData.consignorcity}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled
        />
  </Grid>

  <Grid item xs={4}>
  <TextField
          className="customTextField"
          label="City:"
          name="consigneecity"
          value={formData.consigneecity}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled
        />
  </Grid>
  <Grid item xs={4}>
  <Autocomplete
      options={
        place ? place.map((type) => type.place_name) : []
      }
      renderInput={(params) => (
        <TextField
          {...params}
          name="from"
          variant="outlined"

          label="From:"
          size="small"
          fullWidth
        />
      )}
      onChange={(event, value) =>
        handleAutocompleteChange('from',event, value)
      }
     
    />
   
  </Grid>


      <Grid item xs={4} >
        <TextField
  className="customTextField"
  label="Pincode:"
  name="consignorpincode"
  value={formData.consignorpincode}
  fullWidth
  variant="outlined"
  size="small"
  InputLabelProps={{
    shrink: !!formData.consignorpincode, // Shrink label if there's value
  }}
  onChange={handleInputChange}
  disabled
/>

      </Grid>

      <Grid item xs={4} >
      <TextField
  className="customTextField"
  label="Pincode:"
  name="consigneepincode"
  value={formData.consigneepincode}
  fullWidth
  variant="outlined"
  size="small"
  InputLabelProps={{
    shrink: !!formData.consigneepincode, 
  }}
  onChange={handleInputChange}
  disabled
/>
      </Grid>
      <Grid item xs={4}>
      <Autocomplete
      options={
        place ? place.map((type) => type.place_name) : []
      }
      renderInput={(params) => (
        <TextField
          {...params}
          name="to"
          variant="outlined"

          label="To:"
          size="small"
          fullWidth
        />
      )}
      onChange={(event, value) =>
        handleAutocompleteChange('to',event, value)
      }
     
    />
  </Grid>
<Grid item xs={4} >
        <TextField
          className="customTextField"
        
          label="E-mail id"
          name='consignoremail'
          value={formData.consignoremail}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled
        />
      </Grid>
      <Grid item xs={4} >
      <TextField
          className="customTextField"
        
          label="E-mail id"
          name='consigneeemail'
          value={formData.consigneeemail}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled
        />
      </Grid>

<Grid item xs={4}>

</Grid>






      <Grid item xs={4} >
        <TextField
          className="customTextField"
          label="Contact No."
          name='consignormobileno'
          value={formData.consignormobileno}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled
        />
      </Grid>
      <Grid item xs={4} >
      <TextField
          className="customTextField"
          label="Contact No."
          name='consigneemobileno'
          value={formData.consigneemobileno}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleInputChange}
          disabled
        />
      </Grid>

      </Grid>

<Add_Consignment_Entry2 handlerowsData={handlerowsData} articles={articles}/>
<Add_Consignment_Entry3 handlefreightData={handlefreightData} />
<Add_Consignment_Entry4 handleBillingData={handleBillingData}/>
<Grid container spacing={0} sx={{ margin: '0px auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={1.2} mt={5}>
          <Button variant="contained" sx={{ backgroundColor: '#18c5a9' }} onClick={handleSave}>
            Save
          </Button>
        </Grid>
        <Grid item xs={1.5} mt={5}>
          <Button variant="contained" sx={{ backgroundColor: '#5c6bc0' }}>
            Original Print
          </Button>
        </Grid>
        <Grid item xs={1.5} mt={5}>
          <Button variant="contained" sx={{ backgroundColor: '#5c6bc0' }}>
            E-mail
          </Button>
        </Grid>
        <Grid item xs={1.5} mt={5}>
          <Button variant="contained" sx={{ backgroundColor: '#5c6bc0' }}>
            Phone
          </Button>
        </Grid>
        <Grid item xs={1.2} mt={5}>
          <Button variant="contained" color="error">
            Cancel
          </Button>
        </Grid>
      </Grid>

    

  
    
   </>
  )
}
