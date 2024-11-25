import { Autocomplete, Box, Button, Divider, FormControl, Grid, IconButton, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import { SelectBranch } from '../../../../lib/api-branch';
import { findPoCustomerById, getCustomersList, addPoCustomer, updatePoCustomer } from '../../../../lib/api-master';
import dayjs from 'dayjs';
import { indiaStates, cities } from '../../../../constants';


const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});

const ResizableTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    resize: 'both',
    overflow: 'auto',
  },
});

function Add_Customer1() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const { pocustid } = useParams();
  const [branches, setBranches] = useState([])
  const [branchAuto, setBranchAuto] = useState("")
  const [customers, setCustomers] = useState([])
  const [customerAuto, setCustomerAuto] = useState("")
  const [stateAuto, setStateAuto] = useState(null)
  const [cityAuto, setCityAuto] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formData, setFormData] = useState({
    branch: "",
    cust_code: "",
    cust_id: "",
    cust_name: "",
    address: "",
    mobileno: "",
    email: "",
    vendor_code: "",
    gst_no: "",
    gst_no_date: null,
    state: "",
    state_code: "",
    city: "",
    pan_no: "",
    cin_no: "",
    pincode: ""
  })

  const [cpId, setCpId] = useState(1)
  const [contactPersons, setContactPersons] = useState([])
  const [contactPersonFormData, setContactPersonFormData] = useState({
    sn: "",
    contactP_name: "",
    designation: "",
    email: "",
    mobileno: "",
    billing_address: "",
    contactP_gstNo: "",
    contactP_date: null,
    contactP_state: "",
    contactP_stateCode: "",
    payment_terms: ""
  })
  const [contactPStateAuto, setContactPStateAuto] = useState("")

  const handleAddContactPerson = () => {
    if (isUpdate) {
      let updatedArr = contactPersons.map(obj =>
        obj.sn === contactPersonFormData.sn ? {
          ...obj,
          sn: contactPersonFormData.sn,
          contactP_name: contactPersonFormData.contactP_name,
          designation: contactPersonFormData.designation,
          email: contactPersonFormData.email,
          mobileno: contactPersonFormData.mobileno,
          billing_address: contactPersonFormData.billing_address,
          contactP_gstNo: contactPersonFormData.contactP_gstNo,
          contactP_date: contactPersonFormData.contactP_date,
          contactP_state: contactPersonFormData.contactP_state,
          contactP_stateCode: contactPersonFormData.contactP_stateCode,
          payment_terms: contactPersonFormData.payment_terms
        } : obj
      );
      setContactPersons(updatedArr)
      setIsUpdate(false)
      handleReset()
    } else {
      const newContactPerson = { ...contactPersonFormData, id: cpId, sn: cpId };
      setContactPersons((prevUsers) => [...prevUsers, newContactPerson]);
      setCpId((prev) => prev + 1)
      handleReset();
    }
  };

  const handleEditContactPerson = (id, sn) => {
    setIsUpdate(true)
    const cp = contactPersons.filter((user) => user.id == id)
    const cuAuto = indiaStates.filter(x => x.label == cp[0].contactP_state)
    setContactPStateAuto({ value: cuAuto[0]?.value || "", label: cuAuto[0]?.label || "" })

    setContactPersonFormData({
      sn: cp[0].sn,
      contactP_name: cp[0].contactP_name,
      designation: cp[0].designation,
      email: cp[0].email,
      mobileno: cp[0].mobileno,
      billing_address: cp[0].billing_address,
      contactP_gstNo: cp[0].contactP_gstNo,
      contactP_date: cp[0].contactP_date,
      contactP_state: cp[0].contactP_state,
      contactP_stateCode: cp[0].contactP_stateCode,
      payment_terms: cp[0].payment_terms
    })
  }

  const handleDeleteContactPerson = (idToDelete) => {
    setContactPersons((prevUsers) => prevUsers.filter((user) => user.id !== idToDelete));
    setCpId((prev) => prev - 1)
    // console.log("dele id", idToDelete);
  };

  const handleReset = () => {
    setContactPersonFormData({
      sn: "",
      contactP_name: "",
      designation: "",
      email: "",
      mobileno: "",
      billing_address: "",
      contactP_gstNo: "",
      contactP_date: null,
      contactP_state: "",
      contactP_stateCode: "",
      payment_terms: ""
    })
    setContactPStateAuto("")
  }

  const getBranchData = async () => {
    const response = await SelectBranch();
    setBranches(() => {
      const branchOp = response.data.map((row) => {
        return {
          value: row.branch_id || null, label: row.place_name
        };
      });
      return branchOp;
    })
  };

  const getCustomersData = async () => {
    const response = await getCustomersList();
    setCustomers(() => {
      const custdata = response.data.map((row) => {
        return {
          value: row.customer_id, label: row.customer_name
        };
      });
      return custdata;
    })
  }

  const setPoCustomerData = async () => {
    setIsLoading(true)
    const result1 = await getCustomersList()
    const result2 = await SelectBranch()
    const response = await findPoCustomerById(pocustid)
    // console.log("po by id : ", response);

    setFormData((prev) => ({ ...prev, cust_code: response.data.pocustomer[0].customercode }))
    setFormData((prev) => ({ ...prev, address: response.data.pocustomer[0].address }))
    setFormData((prev) => ({ ...prev, mobileno: response.data.pocustomer[0].telephoneno }))
    setFormData((prev) => ({ ...prev, email: response.data.pocustomer[0].emailid }))
    setFormData((prev) => ({ ...prev, vendor_code: response.data.pocustomer[0].vendor_code }))
    setFormData((prev) => ({ ...prev, gst_no: response.data.pocustomer[0].gstno }))
    setFormData((prev) => ({ ...prev, gst_no_date: response.data.pocustomer[0].gstnodate }))
    setFormData((prev) => ({ ...prev, state_code: response.data.pocustomer[0].statecode }))
    setFormData((prev) => ({ ...prev, pan_no: response.data.pocustomer[0].panno }))
    setFormData((prev) => ({ ...prev, cin_no: response.data.pocustomer[0].cinno }))
    setFormData((prev) => ({ ...prev, pincode: response.data.pocustomer[0].pincode }))

    const branchesData = result2.data.map((row) => ({ value: row.branch_id || null, label: row.place_name }))
    const brAuto = branchesData.filter(x => x.value == response.data.pocustomer[0].branch)
    setBranchAuto(brAuto.length ? { value: brAuto[0]?.value, label: brAuto[0]?.label } : null)
    setFormData((prev) => ({ ...prev, "branch": brAuto[0]?.value || null }))

    const customerData = result1.data.map((row) => ({ value: row.customer_id || null, label: row.customer_name }))
    const cuAuto = customerData.filter(x => x.value == response.data.pocustomer[0].customer_id_master)
    setCustomerAuto(cuAuto.length ? { value: cuAuto[0]?.value, label: cuAuto[0]?.label } : null)
    setFormData((prev) => ({ ...prev, "cust_name": cuAuto[0]?.label || null }))
    setFormData((prev) => ({ ...prev, "cust_id": cuAuto[0]?.value || null }))

    const stAuto = indiaStates.filter(x => x.label == response.data.pocustomer[0].state)
    setStateAuto(stAuto ? { value: stAuto[0].value, label: stAuto[0].label } : null)
    setFormData((prev) => ({ ...prev, "state": stAuto[0].label || null }))

    const ctAuto = cities.filter(x => x.label == response.data.pocustomer[0].city)
    setCityAuto(ctAuto ? { value: ctAuto[0].value, label: ctAuto[0].label } : null)
    setFormData((prev) => ({ ...prev, "city": ctAuto[0].label || null }))

    const setDetails = response.data.contactPer.map((x, index) => ({
      sn: index + 1,
      id: x.cpd_id,
      contactP_name: x.person_name,
      designation: x.designation,
      email: x.emailid,
      mobileno: x.faxno,
      billing_address: x.address,
      contactP_gstNo: x.gstn,
      contactP_date: x.gstndate,
      contactP_state: x.state,
      contactP_stateCode: x.statecode,
      payment_terms: x.payterms
    }))
    setContactPersons(setDetails)
    setCpId(setDetails.length + 1)
    setIsLoading(false)
  }

  useEffect(() => {
    if (pocustid == undefined) {
      getBranchData()
      getCustomersData()
    } else {
      getBranchData()
      getCustomersData()
      setPoCustomerData()
    }
  }, [])

  const validate = () => {
    let errors = {};

    if (formData.mobileno == "") {
      errors.mobilenoError = true
      errors.mobileno = "Mobile No is required";
    }

    if (formData.email == "") {
      errors.emailError = true
      errors.email = "Email is required";
    }

    if (formData.gst_no == "") {
      errors.gst_noError = true
      errors.gst_no = "Gst No is required";
    }

    if (formData.pan_no == "") {
      errors.pan_noError = true
      errors.pan_no = "Pan No is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputContactPChange = (event) => {
    const { name, value } = event.target;
    setContactPersonFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChangeContactPerson = (date, field) => {
    if (!date) {
      console.error("handleDateChange: Invalid date received:", date);
      return;
    }

    if (!dayjs.isDayjs(date)) {
      console.error("handleDateChange: Date is not a Day.js object:", date);

      date = dayjs(date);
    }

    const formattedDate = date.format("MM-DD-YYYY");

    setContactPersonFormData((prevData) => ({
      ...prevData,
      [field]: formattedDate,
    }));
  };

  const handleDateChange = (date, field) => {
    if (!date) {
      console.error("handleDateChange: Invalid date received:", date);
      return;
    }

    if (!dayjs.isDayjs(date)) {
      console.error("handleDateChange: Date is not a Day.js object:", date);

      date = dayjs(date);
    }

    const formattedDate = date.format("MM-DD-YYYY");

    setFormData((prevData) => ({
      ...prevData,
      [field]: formattedDate,
    }));
  };

  const handleAddPoCustomer = async () => {
    let response;
    if (!validate()) {
      return;
    }
    else {
      if (pocustid == undefined) {
        console.log("Form data : ", formData);
        setIsLoading(true)
        response = await addPoCustomer({ ...formData, contactPersons })

      } else {
        console.log("Form data : ", formData);
        setIsLoading(true)
        response = await updatePoCustomer({ ...formData, pocustid: Number(pocustid), contactPersons })
      }
      if (response.status == 200) {
        navigate('/po-customers')
      }
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/po-customers'); // Adjust the path as necessary to match your route
  }

  const columns = [
    { field: 'sn', headerName: 'SN', flex: 1, headerClassName: classes.blueHeader },
    { field: 'contactP_name', headerName: 'Name', flex: 1, headerClassName: classes.blueHeader },
    { field: 'billing_address', headerName: 'Address', flex: 1, headerClassName: classes.blueHeader },
    { field: 'designation', headerName: 'Designation', flex: 1, headerClassName: classes.blueHeader },
    { field: 'email', headerName: 'Email', flex: 1, headerClassName: classes.blueHeader },
    { field: 'mobileno', headerName: 'Mobile No', flex: 1, headerClassName: classes.blueHeader },
    { field: 'contactP_gstNo', headerName: 'GST NO	', flex: 1, headerClassName: classes.blueHeader },
    { field: 'contactP_date', headerName: 'GST Date', flex: 1, headerClassName: classes.blueHeader },
    { field: 'contactP_state', headerName: 'State', flex: 1, headerClassName: classes.blueHeader },
    { field: 'contactP_stateCode', headerName: 'State Code	', flex: 1, headerClassName: classes.blueHeader },
    { field: 'payment_terms', headerName: 'Pay Terms	', flex: 1, headerClassName: classes.blueHeader },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
          <IconButton style={{ color: 'black' }} onClick={() => handleEditContactPerson(params.id)}>
            <EditIcon />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => handleDeleteContactPerson(params.id)}>
            <DeleteIcon />
          </IconButton>
        </div >
      ),
    },
  ];

  const rows = [
    // Sample data
    { id: 1, sn: 1, name: 'John Doe', address: '123 Main St', designation: 'Manager', email: 'john.doe@example.com', mobile: '123-456-7890', action: 'Edit' },
    // Add more rows as needed
  ];

  const fixedHeight = {
    height: '40%'
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            PO Customer

          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end" sx={{ marginTop: 2, marginBottom: '2%' }}>
        <Grid item xs={6} md={2}>
          <Autocomplete
            options={branches}
            getOptionLabel={(option) => option.label || ""}
            value={branchAuto}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            onChange={(event, value) => {
              setBranchAuto(value)
              setFormData((prev) => ({ ...prev, "branch": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch"
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
              />
            )}
          />
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="cust_code"
            label=" Customer Code"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.cust_code}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4} >
          <Autocomplete
            options={customers}
            getOptionLabel={(option) => option.label || ""}
            value={customerAuto}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            onChange={(event, value) => {
              setCustomerAuto(value)
              setFormData((prev) => ({ ...prev, "cust_id": value?.value || null }))
              setFormData((prev) => ({ ...prev, "cust_name": value?.label || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Customer Name: "
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

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="vendor_code"
            label="Vendor Code"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.vendor_code}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="mobileno"
            label="Telephone"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.mobileno}
            onChange={handleInputChange}
            error={errors.mobilenoError}
            helperText={errors.mobilenoError ? errors.mobileno : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.email}
            onChange={handleInputChange}
            error={errors.emailError}
            helperText={errors.emailError ? errors.email : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="gst_no"
            label="GST No."
            fullWidth
            variant="outlined"
            size='small'
            value={formData.gst_no}
            onChange={handleInputChange}
            error={errors.gst_noError}
            helperText={errors.gst_noError ? errors.gst_no : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dateResolved"
                  format="MM-DD-YYYY"
                  label="GST No. Date "
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.gst_no_date ? dayjs(formData.gst_no_date) : null}
                  onChange={(date) => { handleDateChange(date, 'gst_no_date') }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="pan_no"
            label="Pan No:"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.pan_no}
            onChange={handleInputChange}
            error={errors.pan_noError}
            helperText={errors.pan_noError ? errors.pan_no : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="cin_no"
            label="CIN No:"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.cin_no}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>

        </Grid>
        <br />

        <Grid container justifyContent="center">
          <Grid item xs={6} md={2}>
            <Typography
              sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
            >
              Address

            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={2.4}>
          <ResizableTextField
            id="outlined-multiline-flexible"
            label="Address:"
            multiline
            maxRows={4}
            size='small'
            fullWidth
            variant="outlined"
            name='address'
            value={formData.address}
            onChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={2.4}>
          <Autocomplete
            options={indiaStates}
            getOptionLabel={(option) => option.label || ""}
            value={stateAuto || null} // Ensure value is either an object or null
            isOptionEqualToValue={(option, value) => option?.value === value?.value} // Check for null values
            onChange={(event, value) => {
              setStateAuto(value);
              setFormData((prev) => ({ ...prev, state: value?.label || null }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
              />
            )}
          />
        </Grid>



        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="state_code"
            label="State Code"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.state_code}
            onChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={2.4}>
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option.label || ""}
            value={cityAuto || null}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            onChange={(event, value) => {
              setCityAuto(value)
              setFormData((prev) => ({ ...prev, "city": value?.label || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City  "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="pincode"
            label="Pincode"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.pincode}
            onChange={handleInputChange}
          />
        </Grid>
        <br />

        <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>
        <br />
        {/* <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            Contact Person

          </Typography>
        </Grid> */}
        <Grid container justifyContent="center">
          <Grid item xs={6} md={2}>
            <Typography
              sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
            >
              Contact Person

            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
          <Grid item xs={2.4}>
            <TextField
              className="customTextField"
              name="contactP_name"
              label=" Contact Person Name"
              fullWidth
              variant="outlined"
              size='small'
              value={contactPersonFormData.contactP_name}
              onChange={handleInputContactPChange}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              className="customTextField"
              name="designation"
              label="Designation"
              fullWidth
              variant="outlined"
              size='small'
              value={contactPersonFormData.designation}
              onChange={handleInputContactPChange}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              className="customTextField"
              name="email"
              label=" Email"
              fullWidth
              variant="outlined"
              size='small'
              value={contactPersonFormData.email}
              onChange={handleInputContactPChange}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              className="customTextField"
              name="mobileno"
              label=" Mobile No:"
              fullWidth
              variant="outlined"
              size='small'
              value={contactPersonFormData.mobileno}
              onChange={handleInputContactPChange}
            />
          </Grid>

          <Grid item xs={2.4}>

            <ResizableTextField
              id="outlined-multiline-flexible"
              label="Billing Address:"
              multiline
              maxRows={4}
              size='small'
              fullWidth
              variant="outlined"
              name='billing_address'
              value={contactPersonFormData.billing_address}
              onChange={handleInputContactPChange}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              className="customTextField"
              name="contactP_gstNo"
              label="GST NO:"
              fullWidth
              variant="outlined"
              size='small'
              value={contactPersonFormData.contactP_gstNo}
              onChange={handleInputContactPChange}
            />
          </Grid>

          <Grid item xs={2.4}>
            <Box style={fixedHeight}>
              <FormControl fullWidth size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="dateResolved"
                    format="MM-DD-YYYY"
                    label="Date "
                    slotProps={{ textField: { size: 'small' } }}
                    value={contactPersonFormData.contactP_date ? dayjs(contactPersonFormData.contactP_date) : null}
                    onChange={(date) => { handleDateChangeContactPerson(date, 'contactP_date') }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={2.4}>
            <Autocomplete
              options={indiaStates}
              getOptionLabel={(option) => option.label || ""}
              value={contactPStateAuto}
              onChange={(event, value) => {
                setContactPStateAuto(value)
                setContactPersonFormData((prev) => ({ ...prev, "contactP_state": value?.label || null }))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select State "
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

          <Grid item xs={2.4}>
            <TextField
              className="customTextField"
              name="contactP_stateCode"
              label=" State Code"
              fullWidth
              variant="outlined"
              size='small'
              value={contactPersonFormData.contactP_stateCode}
              onChange={handleInputContactPChange}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              className="customTextField"
              name="payment_terms"
              label="Payments Terms"
              fullWidth
              variant="outlined"
              size='small'
              value={contactPersonFormData.payment_terms}
              onChange={handleInputContactPChange}
            />
          </Grid>

          <Grid container sx={{ justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
            <Grid item>
              <Button variant="contained" color="success" style={{ padding: '5px 50px', marginTop: 20 }}
                onClick={handleAddContactPerson}
              >
                {isUpdate ? "Update" : "Add"}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ height: 400, width: '100%', marginBottom: '2%' }}>
          <DataGrid
            rows={contactPersons}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}

          />
        </Box>

        <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
          <Grid item>
            <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
              onClick={handleAddPoCustomer}
            >
              {pocustid != undefined ? "Update" : "Add"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: '#D92445' }}
              onClick={handleCancel}
            >    Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Add_Customer1
