import { Autocomplete, Box, Button, Checkbox, Divider, FormControl, Grid, TextField, Typography, FormControlLabel } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/styles';
import dayjs from 'dayjs';
import { addDriver, getDriverById, updateDriver } from '../../../../lib/api-master';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

const ResizableTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    resize: 'both',
    overflow: 'auto',
  },
});

const fixedHeight = {
  height: '40%'
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function Add_Drivers() {

  const navigate = useNavigate();
  const { driverid } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dateOfBirth: null,
    mobile: "",
    fathername: "",
    reference: "",
    eyesight: "",
    license_no: "",
    license_type: "",
    remark: "",
    permanantAdd: "",
    qualification: "",
    joiningDate: null,
    blood_grp: "",
    renewDate: null,
    expiryDate: null,
    curr_state: "",
    curr_city: "",
    curr_pincode: "",
    per_state: "",
    per_city: "",
    per_pincode: ""
  })
  const [eyes, setEyes] = useState("")
  const [licenset, setLicenseT] = useState("")
  const [bloodg, setBloodg] = useState("")

  const licenseTypeAuto = [
    { value: 1, label: "Higher-Heavy" },
    { value: 2, label: "Heavy" },
    { value: 3, label: "Non-Heavy" },
    { value: 4, label: "Normal" }
  ]

  const eyeSightAuto = [
    { value: "Normal", label: "Normal" },
    { value: "Good", label: "Good" }
  ]

  const blood_grpAuto = [
    { value: 1, label: "A-" },
    { value: 2, label: "B-" },
    { value: 3, label: "AB-" },
    { value: 4, label: "O-" },
    { value: 5, label: "A+" },
    { value: 6, label: "B+" },
    { value: 7, label: "AB+" },
    { value: 8, label: "O+" },
  ]

  useEffect(() => {
    if (driverid == undefined) {
      return;
    } else {
      setDriverData();
    }
  }, [])

  const validate = () => {
    let errors = {};

    if (formData.name == "") {
      errors.nameError = true
      errors.name = "Driver Name is required";
    }

    if (formData.address == "") {
      errors.addressError = true
      errors.address = "Address is required";
    }

    if (formData.mobile == "") {
      errors.mobileError = true
      errors.mobile = "Mobile No is required";
    }

    // if (formData.reference == "") {
    //   errors.referenceError = true
    //   errors.reference = "Reference is required";
    // }

    if (formData.license_no == "") {
      errors.license_noError = true
      errors.license_no = "License No. is required";
    }

    if (formData.curr_pincode == "") {
      errors.curr_pincodeError = true
      errors.curr_pincode = "Pincode is required";
    }

    if (formData.per_pincode == "") {
      errors.eper_pincodeError = true
      errors.per_pincode = "Pincode is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const setDriverData = async () => {
    setIsLoading(true)
    const response = await getDriverById(driverid)
    // console.log("driver by id : ", response);
    setFormData((prev) => ({ ...prev, name: response.data[0].driver_name }))
    setFormData((prev) => ({ ...prev, address: response.data[0].corresp_address }))
    setFormData((prev) => ({ ...prev, dateOfBirth: response.data[0].date_of_birth }))
    setFormData((prev) => ({ ...prev, mobile: response.data[0].mobileno }))
    setFormData((prev) => ({ ...prev, fathername: response.data[0].father_name }))
    setFormData((prev) => ({ ...prev, reference: response.data[0].referenceby }))
    setFormData((prev) => ({ ...prev, eyesight: response.data[0].eyesight }))
    setFormData((prev) => ({ ...prev, license_no: response.data[0].licenseno }))
    setFormData((prev) => ({ ...prev, remark: response.data[0].remarks }))
    setFormData((prev) => ({ ...prev, permanantAdd: response.data[0].permanat_address }))
    setFormData((prev) => ({ ...prev, qualification: response.data[0].qualification }))
    setFormData((prev) => ({ ...prev, joiningDate: response.data[0].joining_date }))
    // setFormData((prev) => ({ ...prev, blood_grp: response.data[0].blood_group }))
    setFormData((prev) => ({ ...prev, renewDate: response.data[0].renewdate }))
    setFormData((prev) => ({ ...prev, expiryDate: response.data[0].expiry }))

    setFormData((prev) => ({ ...prev, curr_state: response.data[0].corresp_state }))
    setFormData((prev) => ({ ...prev, curr_city: response.data[0].corresp_city }))
    setFormData((prev) => ({ ...prev, curr_pincode: response.data[0].corresp_pincode }))
    setFormData((prev) => ({ ...prev, per_state: response.data[0].permanat_state }))
    setFormData((prev) => ({ ...prev, per_city: response.data[0].permanat_city }))
    setFormData((prev) => ({ ...prev, per_pincode: response.data[0].permanat_pincode }))


    const eAuto = eyeSightAuto.filter(x => x.value == response.data[0].eyesight)
    setEyes({ value: eAuto[0].value, label: eAuto[0].label })

    const liceT = licenseTypeAuto.filter(x => (x.label == response.data[0].license_type || x.value == response.data[0].license_type))
    setLicenseT({ value: liceT[0].value, label: liceT[0].label })
    setFormData((prev) => ({ ...prev, "license_type": liceT[0].value || "" }))

    // const blood = blood_grpAuto.filter(x => x.value == response.data[0].blood_group)
    // setBloodg(blood ? { value: blood[0].value, label: blood[0].label } : null)
    // setFormData((prev) => ({ ...prev, "blood_grp": blood[0].value || "" }))
    setIsLoading(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setIsLoading(false)
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

  const handleCheckBox = (event) => {
    if (event.target.checked) {
      setFormData((prev) => ({ ...prev, permanantAdd: formData.address }))
      setFormData((prev) => ({ ...prev, per_state: formData.curr_state }))
      setFormData((prev) => ({ ...prev, per_city: formData.curr_city }))
      setFormData((prev) => ({ ...prev, per_pincode: formData.curr_pincode }))
    } else {
      setFormData((prev) => ({ ...prev, permanantAdd: "" }))
      setFormData((prev) => ({ ...prev, per_state: "" }))
      setFormData((prev) => ({ ...prev, per_city: "" }))
      setFormData((prev) => ({ ...prev, per_pincode: "" }))
    }
  }

  const handleAddDriver = async () => {

    let response
    if (!validate()) {
      return;
    }
    else {
      if (driverid == undefined) {
        setIsLoading(true)
        response = await addDriver(formData)
      } else {
        setIsLoading(true)
        response = await updateDriver({ ...formData, driverid: driverid })
      }
      if (response.status == 200) {
        navigate("/drivers")
      }
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/Drivers'); // Adjust the path as necessary to match your route
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            {driverid != undefined ? "Update Drivers" : "Add Drivers"}
          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="name"
            label=" Name"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.name}
            onChange={handleInputChange}
            error={errors.nameError}
            helperText={errors.nameError ? errors.name : ''}
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="fathername"
            label=" Father Name"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.fathername}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="mobile"
            label=" Mobile No."
            fullWidth
            variant="outlined"
            size='small'
            value={formData.mobile}
            onChange={handleInputChange}
            error={errors.mobileError}
            helperText={errors.mobileError ? errors.mobile : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dateOfBirth"
                  format="MM-DD-YYYY"
                  label="Date Of Birth"
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                  onChange={(date) => { handleDateChange(date, 'dateOfBirth') }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>

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
            value={formData.address}
            onChange={handleInputChange}
            error={errors.addressError}
            helperText={errors.addressError ? errors.address : ''}
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="curr_state"
            label=" State"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.curr_state}
            onChange={handleInputChange}
          />
        </Grid>



        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="curr_city"
            label=" City "
            fullWidth
            variant="outlined"
            size='small'
            value={formData.curr_city}
            onChange={handleInputChange}
          />
        </Grid>



        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="curr_pincode"
            label="Pincode"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.curr_pincode}
            onChange={handleInputChange}
            error={errors.curr_pincodeError}
            helperText={errors.curr_pincodeError ? errors.curr_pincode : ''}
          />
        </Grid>



        <Grid item xs={2.4}>

        </Grid>


        <Grid item xs={2.4}>

          <ResizableTextField
            id="outlined-multiline-flexible"
            name='permanantAdd'
            label="Permanent Address:"
            multiline
            maxRows={4}
            size='small'
            fullWidth
            variant="outlined"
            value={formData.permanantAdd}
            onChange={handleInputChange}
          />
        </Grid>



        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="per_state"
            label=" State"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.per_state}
            onChange={handleInputChange}
          />
        </Grid>





        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="per_city"
            label=" City "
            fullWidth
            variant="outlined"
            size='small'
            value={formData.per_city}
            onChange={handleInputChange}
          />
        </Grid>



        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="per_pincode"
            label="Pincode"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.per_pincode}
            onChange={handleInputChange}
            error={errors.per_pincodeError}
            helperText={errors.per_pincodeError ? errors.per_pincode : ''}
          />
        </Grid>

        <Grid item xs={2.4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <FormControlLabel control={<Checkbox {...label} onChange={handleCheckBox} />} label="Same as Current" />
        </Grid>




        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="license_no"
            label="License No."
            fullWidth
            variant="outlined"
            size='small'
            value={formData.license_no}
            onChange={handleInputChange}
            error={errors.license_noError}
            helperText={errors.license_noError ? errors.license_no : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Autocomplete
            options={licenseTypeAuto}
            getOptionLabel={(option) => option.label || ""}
            value={licenset || null}
            onChange={(event, value) => {
              setLicenseT(value)
              setFormData((prev) => ({ ...prev, "license_type": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="License Type"
                variant="outlined"
                fullWidth
                size='small'
                name="from_loc"
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Autocomplete
            options={eyeSightAuto}
            getOptionLabel={(option) => option.label || ""}
            value={eyes || null}
            onChange={(event, value) => {
              setEyes(value)
              setFormData((prev) => ({ ...prev, "eyesight": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Eyesight"
                variant="outlined"
                fullWidth
                size='small'
                name="from_loc"
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="renewDate"
                  format="MM-DD-YYYY"
                  label="Renew Date"
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.renewDate ? dayjs(formData.renewDate) : null}
                  onChange={(date) => { handleDateChange(date, 'renewDate') }}
                  error={errors.renewDateError}
                  helperText={errors.renewDateError ? errors.renewDate : ''}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="expiryDate"
                  format="MM-DD-YYYY"
                  label="Expiry Date"
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.expiryDate ? dayjs(formData.expiryDate) : null}
                  onChange={(date) => { handleDateChange(date, 'expiryDate') }}
                  error={errors.expiryDateError}
                  helperText={errors.expiryDateError ? errors.expiryDate : ''}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>


      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
            onClick={handleAddDriver}
          >
            {driverid != undefined ? "Update" : "Add"}
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

export default Add_Drivers
