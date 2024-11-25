import { Autocomplete, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { findTransporterById, addTransporter, updateTransporter } from '../../../../lib/api-master';
import { SelectBranch } from '../../../../lib/api-branch';
import { styled } from '@mui/styles';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

const ResizableTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    resize: 'both',
    overflow: 'auto',
  },
});

function AddOwner() {

  const navigate = useNavigate();
  const { transpid } = useParams()
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    transp_name: "",
    branch: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    mobileno: "",
    emailid: "",
    pan_no: "",
    vendor_code: "",
    gst_no: "",
    bank_name: "",
    account_no: "",
    ifsc_code: "",
    bank_address: ""
  })
  const [branches, setBranches] = useState([])
  const [branchAuto, setBranchAuto] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // const getBranchData = async () => {
  //   const response = await SelectBranch();
  //   setBranches(() => {
  //     const branchOp = response.data.map((row) => {
  //       return {
  //         value: row.branch_id || null, label: row.place_name
  //       };
  //     });
  //     return branchOp;
  //   })
  // };

  const setTransporterData = async () => {
    setIsLoading(true)
    const result = await SelectBranch();
    const response = await findTransporterById(transpid)
    // console.log("trans : ", response);

    setFormData((prev) => ({ ...prev, transp_name: response.data[0].vehical_owner_name }))
    setFormData((prev) => ({ ...prev, address: response.data[0].address }))
    setFormData((prev) => ({ ...prev, state: response.data[0].state }))
    setFormData((prev) => ({ ...prev, city: response.data[0].city }))
    setFormData((prev) => ({ ...prev, pincode: response.data[0].pincode }))
    setFormData((prev) => ({ ...prev, mobileno: response.data[0].telephoneno }))
    setFormData((prev) => ({ ...prev, emailid: response.data[0].emailid }))
    setFormData((prev) => ({ ...prev, pan_no: response.data[0].panno }))
    setFormData((prev) => ({ ...prev, vendor_code: response.data[0].vendor_code }))
    setFormData((prev) => ({ ...prev, gst_no: response.data[0].gstno }))
    setFormData((prev) => ({ ...prev, bank_name: response.data[0].bank }))
    setFormData((prev) => ({ ...prev, account_no: response.data[0].accnum }))
    setFormData((prev) => ({ ...prev, ifsc_code: response.data[0].ifsccode }))
    setFormData((prev) => ({ ...prev, bank_address: response.data[0].bank_address }))

    const branchesData = result.data.map((row) => ({ value: row.branch_id || null, label: row.place_name }))

    const brAuto = branchesData.filter(x => x.value == response.data[0].branch)
    setBranchAuto({ value: brAuto[0]?.value || "", label: brAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "branch": brAuto[0]?.value || "" }))
    setIsLoading(false)
  }

  useEffect(() => {
    if (transpid == undefined) {
      // getBranchData()
    }
    else {
      // getBranchData()
      setTransporterData()
    }
  }, [])

  const validate = () => {
    let errors = {};

    if (formData.transp_name == "") {
      errors.transp_nameError = true
      errors.transp_name = "Transporter Name is required";
    }

    if (formData.mobileno == "") {
      errors.mobilenoError = true
      errors.mobileno = "Mobile No is required";
    }

    if (formData.emailid == "") {
      errors.emailidError = true
      errors.emailid = "Email Id is required";
    }

    if (formData.pan_no == "") {
      errors.pan_noError = true
      errors.pan_no = "Pan No is required";
    }

    if (formData.vendor_code == "") {
      errors.vendor_codeError = true
      errors.vendor_code = "Vendor Code is required";
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

  const handleAddTransporter = async () => {
    let response;
    if (!validate()) {
      return;
    }
    else {
      if (transpid == undefined) {
        console.log("Form data : ", formData);
        setIsLoading(true)
        response = await addTransporter(formData)

      } else {
        console.log("Form data : ", formData);
        setIsLoading(true)
        response = await updateTransporter({ ...formData, transpid: Number(transpid) })
      }
      if (response.status == 200) {
        navigate('/vehicle-owner')
        setIsLoading(false)
      }
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/vehicle-owner'); // Adjust the path as necessary to match your route
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            Transporter Details

          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="transp_name"
            label=" Transporter Name"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.transp_name}
            error={errors.transp_nameError}
            helperText={errors.transp_nameError ? errors.transp_name : ''}
          />
        </Grid>

        {/* <Grid item xs={2.4} >
          <Autocomplete
            options={branches}
            getOptionLabel={(option) => option.label || ""}
            value={branchAuto}
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
                name="from_loc"
              // error={formik.errors.from_loc && formik.touched.from_loc}
              // helperText={formik.touched.from_loc ? formik.errors.from_loc : ''}
              // onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid> */}

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="vendor_code"
            label="Vendor Code"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.vendor_code}
            onChange={handleInputChange}
            error={errors.vendor_codeError}
            helperText={errors.vendor_codeError ? errors.vendor_code : ''}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="gst_no"
            label="GST No"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.gst_no}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="pan_no"
            label="Pan No."
            fullWidth
            variant="outlined"
            size='small'
            value={formData.pan_no}
            onChange={handleInputChange}
            error={errors.pan_noError}
            helperText={errors.pan_noError ? errors.pan_no : ''}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="mobileno"
            label="Telephone No"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.mobileno}
            error={errors.mobilenoError}
            helperText={errors.mobilenoError ? errors.mobileno : ''}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="emailid"
            label="Email Id"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.emailid}
            onChange={handleInputChange}
            error={errors.emailidError}
            helperText={errors.emailidError ? errors.emailid : ''}
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
            id="outlined-multiline-flexible"
            name="address"
            label="Current Address:"
            multiline
            maxRows={4}
            size='small'
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
            value={formData.address}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="state"
            label=" State"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.state}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="city"
            label=" City"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.city}
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
            onChange={handleInputChange}
            value={formData.pincode}
          />
        </Grid>

        <Grid item xs={2.4}>

        </Grid>

        <Grid container justifyContent="center">
          <Grid item xs={6} md={2}>
            <Typography
              sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginTop: 2, textAlign: 'center' }}
            >
              Bank Details

            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="account_no"
            label="Account Number"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.account_no}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>

          <TextField
            className="customTextField"
            name="bank_name"
            label="Bank Name"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.bank_name}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <ResizableTextField
            name='bank_address'
            id="outlined-multiline-flexible"
            label="Bank Address:"
            multiline
            maxRows={4}
            size='small'
            fullWidth
            variant="outlined"
            value={formData.bank_address}
            onChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="ifsc_code"
            label="IFSC Code"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.ifsc_code}
            onChange={handleInputChange}
          />
        </Grid>



      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
            onClick={handleAddTransporter}
          >
            {transpid != undefined ? "Update" : "Add"}
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

export default AddOwner
