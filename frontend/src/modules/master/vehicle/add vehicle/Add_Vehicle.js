import { Autocomplete, Box, Button, Divider, FormControl, Grid, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getTransporterData, getVehicleById, addvehicle, updateVehicle } from '../../../../lib/api-master';
import dayjs from 'dayjs';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

function Add_Vehicle() {

  const { vehicleid } = useParams()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    transporterName: "",
    ownName: "",
    ownAddress: "",
    mobileno: "",
    vehicle_type: "",
    vehicle_no: "",
    capacity: "",
    make: "",
    description: "",
    reg_date: null,
    expiry_date: null,
    engine_no: "",
    chasis_no: "",
    puc_no: "",
    puc_exp_date: null,
    body: ""
  })
  const [transporter, setTransporter] = useState([])
  const [vehicleType, setVehicleType] = useState([])
  const [bodyAuto, setBodyAuto] = useState("")
  const [transportAuto, setTransportAuto] = useState("")
  const [vehicleTypeAuto, setVehicleTypeAuto] = useState("")

  const body = [
    { value: 1, label: "Open" },
    { value: 2, label: "Closed" }
  ]

  const getTransporter = async () => {
    setIsLoading(true)
    const response = await getTransporterData()

    const tData = response.data.transporter.map((x) => ({
      value: x.vod_id,
      label: x.vehical_owner_name
    }))
    setTransporter(tData)

    const vtData = response.data.vehicleType.map((x) => ({
      value: x.vt_id,
      label: x.vehicle_type
    }))
    setVehicleType(vtData)
    setIsLoading(false)

    // console.log("tadat : ", tData);
    // console.log("vdata : ", vtData);
  }


  const setVehicleData = async () => {
    setIsLoading(true)
    const response = await getVehicleById(vehicleid)
    // console.log("vehicle by id : ", response);

    setFormData((prev) => ({ ...prev, ownName: response.data.vehicleById[0].owner_name }))
    setFormData((prev) => ({ ...prev, ownAddress: response.data.vehicleById[0].owner_address }))
    setFormData((prev) => ({ ...prev, mobileno: response.data.vehicleById[0].mob_no }))
    setFormData((prev) => ({ ...prev, vehicle_no: response.data.vehicleById[0].vehicleno }))
    setFormData((prev) => ({ ...prev, capacity: response.data.vehicleById[0].capacity }))
    setFormData((prev) => ({ ...prev, make: response.data.vehicleById[0].make }))
    setFormData((prev) => ({ ...prev, description: response.data.vehicleById[0].description }))
    setFormData((prev) => ({ ...prev, reg_date: response.data.vehicleById[0].reg_date }))
    setFormData((prev) => ({ ...prev, expiry_date: response.data.vehicleById[0].vehicleexpdate }))
    setFormData((prev) => ({ ...prev, engine_no: response.data.vehicleById[0].engineno }))
    setFormData((prev) => ({ ...prev, chasis_no: response.data.vehicleById[0].chasisno }))
    setFormData((prev) => ({ ...prev, puc_no: response.data.vehicleById[0].pucno }))
    setFormData((prev) => ({ ...prev, puc_exp_date: response.data.vehicleById[0].pucexpdate }))


    const bodyA = body.filter(x => x.value == response.data.vehicleById[0].body)
    setBodyAuto(bodyA.length > 0 ? { value: bodyA[0].value, label: bodyA[0].label } : null)
    setFormData((prev) => ({ ...prev, "body": bodyA[0]?.value || null }))

    setTransportAuto(response.data.transporter)
    setFormData((prev) => ({ ...prev, "transporterName": response.data.transporter.value || "" }))

    setVehicleTypeAuto(response.data.vehicleType)
    setFormData((prev) => ({ ...prev, "vehicle_type": response.data.vehicleType.value || "" }))
    setIsLoading(false)
  }


  useEffect(() => {
    if (vehicleid == undefined) {
      getTransporter()
      return
    }
    else {
      getTransporter()
      setVehicleData()
    }
  }, [])

  const validate = () => {
    let errors = {};

    if (formData.transporterName == "") {
      errors.transporterNameError = true
      errors.transporterName = "Transporter Name is required";
    }

    if (formData.vehicle_type == "") {
      errors.vehicle_typeError = true
      errors.vehicle_type = "Vehicle Type is required";
    }

    if (formData.vehicle_no == "") {
      errors.vehicle_noError = true
      errors.vehicle_no = "Vehicle No is required";
    }

    if (formData.capacity == "") {
      errors.capacityError = true
      errors.capacity = "Capacity is required";
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

  const handleAddVehicle = async () => {
    let response;
    if (!validate()) {
      return;
    }
    else {
      if (vehicleid == undefined) {
        setIsLoading(true)
        console.log("form Data : ", formData);
        response = await addvehicle(formData)
      }
      else {
        console.log("form Data : ", formData);
        response = await updateVehicle({ ...formData, vehicleid: vehicleid })
      }
      if (response.status == 200) {
        navigate('/vehicle')
      }
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/Vehicle'); // Adjust the path as necessary to match your route
  }


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
            {vehicleid != undefined ? "Update Vehicle" : "Add Vehicle"}

          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={2.4} >
          <Autocomplete
            options={transporter}
            getOptionLabel={(option) => option.label || ""}
            value={transportAuto || null}
            onChange={(event, value) => {
              setTransportAuto(value)
              setFormData((prev) => ({ ...prev, "transporterName": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Transporter Name "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.transporterNameError}
                helperText={errors.transporterNameError ? errors.transporterName : ''}
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="ownName"
            label=" Owner Name"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.ownName}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="ownAddress"
            label=" Owner Address"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.ownAddress}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="mobileno"
            label=" Mobile No."
            fullWidth
            variant="outlined"
            size='small'
            value={formData.mobileno}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4} >
          <Autocomplete
            options={vehicleType}
            getOptionLabel={(option) => option.label || ""}
            value={vehicleTypeAuto || null}
            onChange={(event, value) => {
              setVehicleTypeAuto(value)
              setFormData((prev) => ({ ...prev, "vehicle_type": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vehicle Type "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.vehicle_typeError}
                helperText={errors.vehicle_typeError ? errors.vehicle_type : ''}
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="vehicle_no"
            label=" Vehicle No"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.vehicle_no}
            onChange={handleInputChange}
            error={errors.vehicle_noError}
            helperText={errors.vehicle_noError ? errors.vehicle_no : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="capacity"
            label=" Capacity"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.capacity}
            onChange={handleInputChange}
            error={errors.capacityError}
            helperText={errors.capacityError ? errors.capacity : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="make"
            label="Make"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.make}
            onChange={handleInputChange}
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.description}
            onChange={handleInputChange}
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dateResolved"
                  format="MM-DD-YYYY"
                  label="Reg. Date "
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.reg_date ? dayjs(formData.reg_date) : null}
                  onChange={(date) => { handleDateChange(date, 'reg_date') }}
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
                  name="dateResolved"
                  format="MM-DD-YYYY"
                  label="Exp. Date "
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.expiry_date ? dayjs(formData.expiry_date) : null}
                  onChange={(date) => { handleDateChange(date, 'expiry_date') }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="engine_no"
            label="Engine No"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.engine_no}
            onChange={handleInputChange}
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="chasis_no"
            label="Chasis No"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.chasis_no}
            onChange={handleInputChange}
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="puc_no"
            label="PUC No"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.puc_no}
            onChange={handleInputChange}
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dateResolved"
                  format="MM-DD-YYYY"
                  label="PUC Exp. Date"
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.puc_exp_date ? dayjs(formData.puc_exp_date) : null}
                  onChange={(date) => { handleDateChange(date, 'puc_exp_date') }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <Autocomplete
            options={body}
            getOptionLabel={(option) => option.label || ""}
            value={bodyAuto || null}
            onChange={(event, value) => {
              setBodyAuto(value)
              setFormData((prev) => ({ ...prev, "body": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Body"
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
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
            onClick={handleAddVehicle}
          >
            {vehicleid != undefined ? "Update" : "Add"}
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

export default Add_Vehicle
