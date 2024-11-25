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




function AddDeliveryChallan2() {

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
        field: 'inv_amt',
        headerName: 'InvAmt',
        sortable: false,
        flex: 1,headerClassName: classes.blueHeader
      },
      {
        field: 'CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=lm.branch),\"-\",lm.year,lm.lr_no)',
        headerName: 'LR No',
        sortable: false,
        flex: 1,headerClassName: classes.blueHeader
      },
      {
        field: 'lr_date',
        headerName: 'LRDate',
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
 <>
 

 <Paper elevation={3} sx={{ backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} sx={{ margin: '0px auto' }}>
          <Grid item xs={2.8} mt={1} mb={1}>
            <TextField
              className="customTextField"
              name="total_packages"
              label="Total Packages"
              fullWidth
              variant="outlined"
              size='small'
              error={formik.errors.total_packages && formik.touched.total_packages}
              helperText={formik.touched.total_packages ? formik.errors.total_packages : ''}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.total_packages}
            />
          </Grid>
          <Grid item xs={2.8} mt={1} mb={1}>
            <TextField
              className="customTextField"
              name="total_weight"
              label="Total Weight"
              fullWidth
              variant="outlined"
              size='small'
              error={formik.errors.total_weight && formik.touched.total_weight}
              helperText={formik.touched.total_weight ? formik.errors.total_weight : ''}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.total_weight}
            />
          </Grid>
          <Grid item xs={6} mt={1} mb={1}>
            <TextField
              className="customTextField"
              name="remarks"
              label="Remark"
              fullWidth
              size='small'
              variant="outlined"
              error={formik.errors.remarks && formik.touched.remarks}
              helperText={formik.touched.remarks ? formik.errors.remarks : ''}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.remarks}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0}sx={{ margin: '0px auto' }}>
  <Grid item xs={4.0} mt={1} mb={1}>
  </Grid>
  <Grid item xs={1.2} mt={5} mb={2}>
    <Button variant="contained" sx={{ backgroundColor: '#18c5a9' }}>
      Save
    </Button>
  </Grid>
  <Grid item xs={1.5} mt={5} mb={2}>
    <Button variant="contained" sx={{ backgroundColor: '#5c6bc0' }}>
      Original Print
    </Button>
  </Grid>
  <Grid item xs={1} mt={5} mb={2}>
    <Button variant="contained" sx={{ backgroundColor: 'lightgreen' }}>
      E-Mail
    </Button>
  </Grid>
  <Grid item xs={1} mt={5} mb={2}>
    <Button variant="contained" sx={{ backgroundColor: 'lightpink' }}>
      Phone
    </Button>
  </Grid>
  <Grid item xs={1.2} mt={5} mb={2}>
    <Button variant="contained" sx={{ backgroundColor: '#D92445' }}>
      Cancel
    </Button>
  </Grid>
</Grid>
      </Paper>
 </>
  )
}

export default AddDeliveryChallan2
