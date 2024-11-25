import { Autocomplete, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, Grid, ImageList, ImageListItem, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { getDcTableData, getDriversByBranchCode, getLrForDcUpdate, getVehicleList } from '../../../../lib/api-deliveryChallan';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../../../../components/ui/SearchBox';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import AddDeliveryChallan1 from './AddDeliveryChallan1';
import AddDeliveryChallan2 from './AddDeliveryChallan2';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});









const Branches = [
  {
    value: 30,
    label : 'Pune'
  },
  {
    value: 35,
    label : 'Bangalore'
  },
  {
    value: 2,
    label : 'Baramati'
  },
  {
    value: 3,
    label : 'Satara'
  },
]



function AddDeliveryChallan() {

  const classes = useStyles();

  const columns = [
    { field: 'srNo', headerName: 'SN', flex: 1 ,headerClassName: classes.blueHeader},
    {
      field: 'inv_no',
      headerName: 'InvNo',
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'inv_date',
      headerName: 'InvDate',
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'partNo',
      headerName: 'Part No',
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'articles',
      headerName: 'Articles',
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'no_of_articles',
      headerName: 'No.Articles',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
  
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'InvAmt',
      headerName: 'Inv amt',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => `₹${params.row.InvAmt}`,
    },
    {
      field: 'CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=lm.branch),\"-\",lm.year,lm.lr_no)',
      headerName: 'Consignment No',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'lr_date',
      headerName: 'Consignment Date',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'consigner',
      headerName: 'Consignor',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'from_loc',
      headerName: 'From',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'consignee',
      headerName: 'Consignee',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'to_loc',
      headerName: 'To',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: 'actual_wt',
      headerName: 'Weight',
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
  ];




  const [rows, setRows] = useState([])
  const [lrData, setLrData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [branchCode, setBranchCode] = useState(30);
  const [vehicle, setVehicle] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [driver, setDriver] = useState([]);
  const [driverDetails, setDriverDetails] = useState([]);
  const [location, setLocation] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);

  const initialValues = {
    delivery_type: '',
    transport_mode: '',
    dc_date:'',
    license_name:'',
    license_name2:'',
    mobile_no:'',
    mobile_no2:'',
    vehicle_owner:'',
    vehicle_type:'',
    owner_address:'',
    owner_contact: '',
    remarks:'',
    total_packages:'',
    total_weight: '',
    branch:'',
    lrdata:'',
    driver_name: { value: '', label: '' },
    driver_name2: { value: '', label: '' },
    from_loc: { value: 30, label: 'Pune' },
    to_loc: { value: '', label: '' },
    vehicle_number : { value: '', label: '' },
  };



  const handleBranchChange = useCallback(async (bId) => {
    setIsLoading(true);
    if (bId) {
      setBranchCode(bId);
      const response = await getLrForDcUpdate(bId.value);
      setLrData(response.data);
      setIsLoading(false);
    }
  }, []);




const getLrFunction = async()=> {
  setIsLoading(true);
  const response = await getLrForDcUpdate(branchCode);
  setLrData(response.data);
  setIsLoading(false);
}

const getDriversFunction = async()=> {
  setIsLoading(true);
  const response = await getDriversByBranchCode(branchCode);
  setDriverDetails(response.data)
  setDriver(() => {
    const driversOp = response.data.map((row) => {
      return { value: row.driver_id, label: row.driver_name };
    });
    return driversOp;
  });
}


const getVehicleFunction = async()=> {
  setIsLoading(true);
  const response = await getVehicleList();
  setVehicleDetails(response.data.vehicleData);
  setVehicle(() => {
    const vehicleOp = response.data.vehicleData.map((row) => {
      return { value: row.vehicle_id, label: row.vehicleno };
    });
    return vehicleOp;
  });
  setLocation(() => {
    const locationOp = response.data.placeData.map((row) => {
      return { value: row.place_id, label: row.place_name };
    });
    return locationOp;
  });
}


  useEffect(()=>{
    getVehicleFunction();
    getDriversFunction();
    getLrFunction();
  },[])



  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      delivery_type: Yup.string().notRequired(),
      transport_mode: Yup.string().notRequired(),
      dc_date: Yup.date().notRequired(),
      license_name:Yup.string().notRequired(),
      license_name2:Yup.string().notRequired(),
      mobile_no: Yup.number().integer().notRequired(),
      mobile_no2: Yup.number().integer().notRequired(),
      vehicle_owner: Yup.string().notRequired(),
      vehicle_type: Yup.string().notRequired(),
      owner_address:Yup.string().notRequired(),
      owner_contact: Yup.number().integer().notRequired(),
      remarks: Yup.string().notRequired(),
      total_packages: Yup.number().integer().notRequired(),
      total_weight: Yup.number().integer().notRequired(),
      branch: Yup.number().integer().notRequired(),
      lrdata:'',
      driver_name: Yup.object().required("Please Select Driver 1"),
      driver_name2: Yup.object().required("Please Select Driver 2"),
      from_loc: Yup.object().required("Please Select From"),
      to_loc: Yup.object().required("Please Select To"),
      vehicle_number : Yup.object().required("Please Select Vehicle No"),
    }),
    
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      setIsLoading(true);
      try {
        console.log('the valuesss',values);
          // let response = await addFieldReport(rowId, values);
          //   formik.resetForm();  
          //   formik.setValues(initialValues);
          //   setIsLoading(false);
      } catch (error) {
        setStatus({ success: false });
        setErrors({ submit: error.response.data.message });
        setSubmitting(false);
        setIsLoading(false);
      }
    }
  });






  useEffect(()=>{
    if(formik.values.vehicle_number?.value){
      setIsLoading(true)
      const FetchAllVehicleDetails = ()=>{
        const vOwner = vehicleDetails.filter(item => item.vehicle_id == formik.values.vehicle_number.value).map((item) => {
          const detailsObject = {
            owner : item.vehical_owner_name,
            type : item.vehicle_type,
            address: item.address,
            mob: item.telephoneno
           }
           return detailsObject
        });
        formik.setFieldValue('vehicle_owner',vOwner[0].owner)
        formik.setFieldValue('vehicle_type',vOwner[0].type)
        formik.setFieldValue('owner_address',vOwner[0].address)
        formik.setFieldValue('owner_contact',vOwner[0].mob)
      }
      FetchAllVehicleDetails();
      setIsLoading(false)
    }
  },[formik.values.vehicle_number])


  useEffect(()=>{
    if(formik.values.driver_name?.value){
      setIsLoading(true)
      const FetchDriverDetails1 = ()=>{
        const driver1 = driverDetails.filter(item => item.driver_id == formik.values.driver_name.value).map((item) => {
          const detailsObject = {
            lic : item.licenseno,
            mob : item.mobileno,
           }
           return detailsObject
        });
        formik.setFieldValue('license_name',driver1[0].lic)
        formik.setFieldValue('mobile_no',driver1[0].mob)
      }
      FetchDriverDetails1();
      setIsLoading(false)
    }
  },[formik.values.driver_name])


  useEffect(()=>{
    if(formik.values.driver_name2?.value){
      setIsLoading(true)
      const FetchDriverDetails2 = ()=>{
        const driver2 = driverDetails.filter(item => item.driver_id == formik.values.driver_name2.value).map((item) => {
          const detailsObject = {
            lic : item.licenseno,
            mob : item.mobileno,
           }
           return detailsObject
        });
        formik.setFieldValue('license_name2',driver2[0].lic)
        formik.setFieldValue('mobile_no2',driver2[0].mob)
      }
      FetchDriverDetails2();
      setIsLoading(false)
    }
  },[formik.values.driver_name2])


  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };


  const filteredRows = lrData.filter((row) => {
    return Object.values(row).some((value) => {
      if (typeof value === 'string' || value instanceof String) {
        return value.toLowerCase().includes(searchText.toLowerCase());
      }
      return false;
    });
  });


  const handleCheckboxChange = (value) => {
    setSelectedValues((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((item) => item !== value);
      } else {
        return [...prevValues, value];
      }
    });
  };


  const getDcData = async()=>{
    setIsLoading(true)
    const response = await getDcTableData(branchCode,selectedValues)
    const jsonData = response.data.map((row,index)=>({
        id: row.id,
        srNo: index+1,
        ...row
    }))
    setRows(jsonData)
    formik.setFieldValue('total_packages',jsonData.length);
    setIsLoading(false)
  }

  const ResizableTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      resize: 'both',
      overflow: 'auto',
    },
  });
  return (
    <React.Fragment>
        {isLoading && <LoadingSpinner />}
      <Grid container  >
        <Grid item xs={6} md={2}>
          <Autocomplete
            options={Branches}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => handleBranchChange(value || null)}
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
            Delivery Challan
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ backgroundColor: 'black' }} />
      <br />
      <Grid container spacing={1} sx={{ marginTop: '0px' }}>
        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="wrNo"
            label="DC No"
            fullWidth
            variant="outlined"
            size='small'
          error={formik.errors.wrNo && formik.touched.wrNo}
          helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.wrNo}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={Branches}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => formik.setFieldValue('from_loc', value || null)}
            value={formik.values.from_loc}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                variant="outlined"
                fullWidth
                size='small'
                name="from_loc"
                error={formik.errors.from_loc && formik.touched.from_loc}
                helperText={formik.touched.from_loc ? formik.errors.from_loc : ''}
                onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={driver}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => formik.setFieldValue('driver_name', value || null)}
            value={formik.values.driver_name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Driver Name 1"
                variant="outlined"
                fullWidth
                size='small'
                name="driver_name"
                error={formik.errors.driver_name && formik.touched.driver_name}
                helperText={formik.touched.driver_name ? formik.errors.driver_name : ''}
                onBlur={formik.handleBlur}

              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={vehicle}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => formik.setFieldValue('vehicle_number', value || null)}
            value={formik.values.vehicle_number}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vehicle No"
                variant="outlined"
                fullWidth
                size='small'
                name="vehicle_number"
              error={formik.errors.vehicle_number && formik.touched.vehicle_number}
              helperText={formik.touched.vehicle_number ? formik.errors.vehicle_number : ''}
              onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={location}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => formik.setFieldValue('to_loc', value || null)}
            value={formik.values.to_loc}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                variant="outlined"
                fullWidth
                size='small'
                name="to_loc"
                error={formik.errors.to_loc && formik.touched.to_loc}
                helperText={formik.touched.to_loc ? formik.errors.to_loc : ''}
                onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="license_name"
            label="License No"
            fullWidth
            size='small'
            variant="outlined"
            error={formik.errors.license_name && formik.touched.license_name}
            helperText={formik.touched.license_name ? formik.errors.license_name : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.license_name}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="vehicle_type"
            label="Vehicle Type"
            fullWidth
            size='small'
            variant="outlined"
            error={formik.errors.vehicle_type && formik.touched.vehicle_type}
            helperText={formik.touched.vehicle_type ? formik.errors.vehicle_type : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.vehicle_type}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl className="customTextField" fullWidth size='small'>
            <InputLabel id="demo-select-small-label">Transport Mode</InputLabel>
            <Select
              labelId="demo-select-small-label"
              name="transport_mode"
              value={formik.values.transport_mode}
              label="Transport Mode"
              onChange={(event, value) => formik.setFieldValue('transport_mode',event.target.value || null)}
              onBlur={formik.handleBlur}
              error={formik.errors.transport_mode && formik.touched.transport_mode}
            >
              <MenuItem value="Surface">Surface</MenuItem>
              <MenuItem value="Air">Air</MenuItem>
              <MenuItem value="Train">Train</MenuItem>
              <MenuItem value="Ship">Ship</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="mobile_no"
            label="Mobile No"
            fullWidth
            variant="outlined"
            size='small'
            error={formik.errors.mobile_no && formik.touched.mobile_no}
            helperText={formik.touched.mobile_no ? formik.errors.mobile_no : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.mobile_no}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="vehicle_owner"
            label="Vehicle Transpoter/Owner"
            fullWidth
            size='small'
            variant="outlined"
            error={formik.errors.vehicle_owner && formik.touched.vehicle_owner}
            helperText={formik.touched.vehicle_owner ? formik.errors.vehicle_owner : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.vehicle_owner}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl className="customTextField" fullWidth size='small'>
            <InputLabel id="demo-select-small-label">Delivery Type</InputLabel>
            <Select
              labelId="demo-select-small-label"
              name="delivery_type"
              value={formik.values.delivery_type}
              label="Delivery Type"
              onChange={(event, value) => formik.setFieldValue('delivery_type',event.target.value || null)}
              onBlur={formik.handleBlur}
              error={formik.errors.wrType && formik.touched.delivery_type}
            >
              <MenuItem value="Collection">Collection</MenuItem>
              <MenuItem value="Line">Line</MenuItem>
              <MenuItem value="Customer_End">Customer End</MenuItem>
              <MenuItem value="Touching">Touching</MenuItem>
              <MenuItem value="Touching">FTL ( Direct Delivery)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={driver}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => formik.setFieldValue('driver_name2', value || null)}
            value={formik.values.driver_name2}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Driver Name 2"
                variant="outlined"
                fullWidth
                size='small'
                name="driver_name2"
                error={formik.errors.driver_name2 && formik.touched.driver_name2}
                helperText={formik.touched.driver_name2 ? formik.errors.driver_name2 : ''}
                onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid>


      
       
       
      
        <Grid item xs={4}>

        <ResizableTextField
        id="outlined-multiline-flexible"
        label="Owner Transpoter/Address:"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
        error={formik.errors.owner_address && formik.touched.owner_address}
            helperText={formik.touched.owner_address ? formik.errors.owner_address : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.owner_address}
      />

          {/* <TextField
            className="customTextField"
            name="owner_address"
            label="Owner Address"
            fullWidth
            variant="outlined"
            size='small'
            error={formik.errors.owner_address && formik.touched.owner_address}
            helperText={formik.touched.owner_address ? formik.errors.owner_address : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.owner_address}
          /> */}
        </Grid>
        <Grid item xs={4}>

        </Grid>
        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="license_name2"
            label="License No"
            fullWidth
            size='small'
            variant="outlined"
            error={formik.errors.license_name2 && formik.touched.license_name2}
            helperText={formik.touched.license_name2 ? formik.errors.license_name2 : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.license_name2}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="owner_contact"
            label="Transpoter/Owner Contact"
            fullWidth
            variant="outlined"
            size='small'
            error={formik.errors.owner_contact && formik.touched.owner_contact}
            helperText={formik.touched.owner_contact ? formik.errors.owner_contact : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.owner_contact}
          />
        </Grid>
        <Grid item xs={4}>

</Grid>
    
      
   
      
     
        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="mobile_no2"
            label="Mobile No"
            fullWidth
            size='small'
            variant="outlined"
            error={formik.errors.mobile_no2 && formik.touched.mobile_no2}
            helperText={formik.touched.mobile_no2 ? formik.errors.mobile_no2 : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.mobile_no2}
          />
        </Grid>
      
        
     
      
      
      </Grid><br /><br />

<AddDeliveryChallan1 />
<AddDeliveryChallan2 />


    </React.Fragment>

  )
}

export default AddDeliveryChallan;
