import { Autocomplete, Box, Button, Divider, Grid, TextField, Typography, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectBranch } from '../../../../lib/api-branch';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import { getCustomerById, addCustomer, updateCustomer } from '../../../../lib/api-master';
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


function Add_Customer() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { custid } = useParams()

  const [branches, setBranches] = useState([])
  const [branchAuto, setBranchAuto] = useState("")
  const [stateAuto, setStateAuto] = useState("")
  const [cityAuto, setCityAuto] = useState("")
  const [isUpdate, setIsUpdate] = useState(false)
  const [formData, setFormData] = useState({
    branch: "",
    cust_name: "",
    gst_no: "",
    vendor_code: "",
    email: "",
    mobileno: "",
    address: "",
    state: "",
    city: "",
    pincode: ""
  })

  const [contactPFormData, setContactPFormData] = useState({
    sn: "",
    cp_name: "",
    cp_address: "",
    cp_designation: "",
    cp_email: "",
    cp_mobile: ""
  })
  const [contactPersons, setContactPersons] = useState([])
  const [cpId, setCpId] = useState(1)

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)



  const getBranchData = async () => {
    const response = await SelectBranch();
    setBranches(() => {
      const branchOp = response.data.map((row) => {
        return {
          value: row.branch_id, label: row.place_name
        };
      });
      return branchOp;
    })
  };


  const validate = () => {
    let errors = {};

    if (formData.branch == "") {
      errors.branchNameError = true
      errors.branchName = "Branch Name is required";
    }

    if (formData.cust_name == "") {
      errors.cust_nameError = true
      errors.cust_name = "Customer Name is required";
    }

    if (formData.gst_no == "") {
      errors.gst_noError = true
      errors.gst_no = "GST No is required";
    }

    if (formData.vendor_code == "") {
      errors.vendor_codeError = true
      errors.vendor_code = "Vendor Code is required";
    }

    if (formData.email == "") {
      errors.emailError = true
      errors.email = "email is required";
    }

    if (formData.mobileno == "") {
      errors.telephoneError = true
      errors.telephone = "Telephone is required";
    }

    if (formData.address == "") {
      errors.addressError = true
      errors.address = "Address is required";
    }

    if (formData.state == "") {
      errors.stateError = true
      errors.state = "State is required";
    }

    if (formData.city == "") {
      errors.cityError = true
      errors.city = "City is required";
    }

    if (formData.pincode == "") {
      if (/^\d{6}$/.test(formData.pincode)) {
        errors.pincodeError = true
        errors.pincode = "Pincode must be 6 digit";
        return;
      }
      errors.pincodeError = true
      errors.pincode = "Pincode is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const setCustomerData = async () => {
    setIsLoading(true)
    const result1 = await SelectBranch()
    const response = await getCustomerById(custid)

    setFormData((prev) => ({ ...prev, cust_name: response.data.customer[0].customer_name }))
    setFormData((prev) => ({ ...prev, gst_no: response.data.customer[0].gstno }))
    setFormData((prev) => ({ ...prev, vendor_code: response.data.customer[0].vendor_code }))
    setFormData((prev) => ({ ...prev, email: response.data.customer[0].emailid }))
    setFormData((prev) => ({ ...prev, mobileno: response.data.customer[0].telephoneno }))
    setFormData((prev) => ({ ...prev, address: response.data.customer[0].address }))
    setFormData((prev) => ({ ...prev, pincode: response.data.customer[0].pincode }))

    const branchesData = result1.data.map((row) => ({ value: row.branch_id || null, label: row.place_name }))
    const brAuto = branchesData.filter(x => x.value == response.data.customer[0].branch)
    setBranchAuto({ value: brAuto[0]?.value || "", label: brAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "branch": brAuto[0]?.value || "" }))

    const stAuto = indiaStates.filter(x => x.label == response.data.customer[0].state)
    setStateAuto({ value: stAuto[0]?.value || "", label: stAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "state": stAuto[0]?.label || "" }))

    const ctAuto = cities.filter(x => x.label == response.data.customer[0].city)
    setCityAuto({ value: ctAuto[0]?.value || "", label: ctAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "city": ctAuto[0]?.label || "" }))

    const setDetails = response.data.contactPer.map((x, index) => ({
      sn: index + 1,
      id: x.cpd_id,
      cp_name: x.person_name,
      cp_address: x.address,
      cp_designation: x.designation,
      cp_email: x.emailid,
      cp_mobile: x.faxno
    }))
    setContactPersons(setDetails)
    setCpId(setDetails.length + 1)
    setIsLoading(false)
  }

  useEffect(() => {
    if (custid == undefined) {
      getBranchData();

    } else {
      getBranchData()
      setCustomerData()
    }
  }, [])

  const handleAddCustomer = async () => {
    let response;
    if (!validate()) {
      return;
    }
    else {
      if (custid == undefined) {
        // console.log("cust form data : ", formData);
        setIsLoading(true)
        response = await addCustomer({ ...formData, contactPersons })
      } else {
        // console.log("cust form data : ", formData);
        setIsLoading(true)
        response = await updateCustomer({ ...formData, custid: Number(custid), contactPersons })
      }
      if (response.status == 200) {
        setIsLoading(false)
        navigate('/customers')
        return;
      }
    }
    setIsLoading(false)
  }

  const handleAddCP = () => {
    if (isUpdate) {
      let updatedArr = contactPersons.map(obj =>
        obj.sn === contactPFormData.sn ? {
          ...obj,
          sn: contactPFormData.sn,
          cp_name: contactPFormData.cp_name,
          cp_address: contactPFormData.cp_address,
          cp_designation: contactPFormData.cp_designation,
          cp_email: contactPFormData.cp_email,
          cp_mobile: contactPFormData.cp_mobile
        } : obj
      );
      setContactPersons(updatedArr)
      setIsUpdate(false)
      handleReset()
    }
    else {
      const newUser = { ...contactPFormData, id: cpId, sn: cpId };
      setContactPersons((prevUsers) => [...prevUsers, newUser]);
      setCpId((prev) => prev + 1)
      handleReset();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleInputContactPChange = (event) => {
    const { name, value } = event.target;
    setContactPFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleReset = () => {
    setContactPFormData({
      cp_name: "",
      cp_address: "",
      cp_designation: "",
      cp_email: "",
      cp_mobile: ""
    })
  }

  const handleEditContactPerson = (id, sn) => {
    setIsUpdate(true)
    const cp = contactPersons.filter((user) => user.id == id)

    setContactPFormData({
      sn: cp[0].sn,
      cp_name: cp[0].cp_name,
      cp_address: cp[0].cp_address,
      cp_designation: cp[0].cp_designation,
      cp_email: cp[0].cp_email,
      cp_mobile: cp[0].cp_mobile
    })
  }

  const handleDeleteContactPerson = (idToDelete) => {
    setContactPersons((prevUsers) => prevUsers.filter((user) => user.id !== idToDelete));
    setCpId((prev) => prev - 1)
    // console.log("dele id", idToDelete);
  };

  const handleCancel = () => {
    navigate('/Customers'); // Adjust the path as necessary to match your route
  }

  const columns = [
    { field: 'sn', headerName: 'SN', flex: 1, headerClassName: classes.blueHeader },
    { field: 'cp_name', headerName: 'Name', flex: 1, headerClassName: classes.blueHeader },
    { field: 'cp_address', headerName: 'Address', flex: 1, headerClassName: classes.blueHeader },
    { field: 'cp_designation', headerName: 'Designation', flex: 1, headerClassName: classes.blueHeader },
    { field: 'cp_email', headerName: 'Email', flex: 1, headerClassName: classes.blueHeader },
    { field: 'cp_mobile', headerName: 'Mobile No', flex: 1, headerClassName: classes.blueHeader },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
          <IconButton style={{ color: 'black' }} onClick={() => handleEditContactPerson(params.id)} >
            <EditIcon />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => handleDeleteContactPerson(params.id)}>
            <DeleteIcon />
          </IconButton>
        </div >
      ),
    },
  ];


  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            {custid != undefined ? "Update Customer" : "Add Customer"}

          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end" sx={{ marginTop: 2, marginBottom: '2%' }}>
        <Grid item xs={6} md={2}>
          <Autocomplete
            options={branches}
            getOptionLabel={(option) => option.label || ""}
            value={branchAuto}
            onChange={(event, value) => {
              setBranchAuto(value)
              setFormData((prev) => ({ ...prev, branch: value?.value || "" }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch"
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.branchNameError}
                helperText={errors.branchNameError ? errors.branchName : ""}
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
            name="cust_name"
            label=" Name"
            fullWidth
            variant="outlined"
            size='small'
            error={errors.cust_nameError}
            helperText={errors.cust_nameError ? errors.cust_name : ""}
            value={formData.cust_name}
            onChange={handleInputChange}
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
            error={errors.gst_noError}
            helperText={errors.gst_noError ? errors.gst_no : ""}
            value={formData.gst_no}
            onChange={handleInputChange}
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
            error={errors.vendor_codeError}
            helperText={errors.vendor_codeError ? errors.vendor_code : ""}
            value={formData.vendor_code}
            onChange={handleInputChange}
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
            error={errors.emailError}
            helperText={errors.emailError ? errors.email : ""}
            value={formData.email}
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
            error={errors.telephoneError}
            helperText={errors.telephoneError ? errors.telephone : ""}
            value={formData.mobileno}
            onChange={handleInputChange}
          />
        </Grid>



        <Grid container justifyContent="center">
          <Grid item xs={6} md={2}>
            <Typography
              sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginTop: 2, textAlign: 'center' }}
            >
              Address

            </Typography>
          </Grid>
        </Grid>



        <Grid item xs={2.4}>
          <ResizableTextField
            name="address"
            className="customTextField"
            id="outlined-multiline-flexible"
            label="Address"
            multiline
            maxRows={4}
            size='small'
            fullWidth
            variant="outlined"
            error={errors.addressError}
            helperText={errors.addressError ? errors.address : ""}
            value={formData.address}
            onChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={2.4}>
          <Autocomplete
            options={indiaStates}
            getOptionLabel={(option) => option.label || ""}
            value={stateAuto}
            onChange={(event, value) => {
              setStateAuto(value)
              setFormData((prev) => ({ ...prev, state: value?.label || "" }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select State "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.stateError}
                helperText={errors.stateError ? errors.state : ""}
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option.label || ""}
            value={cityAuto || null}
            onChange={(event, value) => {
              setCityAuto(value)
              setFormData((prev) => ({ ...prev, city: value?.label || "" }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select City "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.cityError}
                helperText={errors.cityError ? errors.city : ""}
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
            name="pincode"
            label="Pin Code"
            fullWidth
            variant="outlined"
            size="small"
            error={errors.pincodeError}
            helperText={errors.pincodeError ? errors.pincode : ""}
            value={formData.pincode}
            onChange={handleInputChange}
          />
        </Grid>



      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid item xs={6} md={2}>
        <Typography
          sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
        >
          Contact Person

        </Typography>
      </Grid>

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="cp_name"
            label=" Contact Person Name"
            fullWidth
            variant="outlined"
            size='small'
            value={contactPFormData.cp_name}
            onChange={handleInputContactPChange}
          />
        </Grid>

        <Grid item xs={2.4}>

          <ResizableTextField
            className="customTextField"
            id="outlined-multiline-flexible"
            name="cp_address"
            label="Address"
            multiline
            maxRows={4}
            size='small'
            fullWidth
            variant="outlined"
            value={contactPFormData.cp_address}
            onChange={handleInputContactPChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="cp_designation"
            label=" Designation"
            fullWidth
            variant="outlined"
            size='small'
            value={contactPFormData.cp_designation}
            onChange={handleInputContactPChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="cp_email"
            label=" Email"
            fullWidth
            variant="outlined"
            size='small'
            value={contactPFormData.cp_email}
            onChange={handleInputContactPChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="cp_mobile"
            label=" Mobile No."
            fullWidth
            variant="outlined"
            size='small'
            value={contactPFormData.cp_mobile}
            onChange={handleInputContactPChange}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
        <Grid item>
          <Button variant="contained" color="success" style={{ padding: '5px 50px' }}
            onClick={handleAddCP}
          >
            {isUpdate ? "Update" : "Add"}
          </Button>
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
            onClick={handleAddCustomer}
          >
            {custid != undefined ? "Update" : "Add"}
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
    </>
  )
}

export default Add_Customer