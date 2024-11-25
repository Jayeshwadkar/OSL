import { Autocomplete, Box, Button, Divider, FormControl, Grid, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import dayjs from 'dayjs';
import { findTDSmasterbyid, addTDSmaster, updateTDSmaster } from '../../../../lib/api-master';

function Add_TDS_Master() {

  const { tdsmid } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    tdsName: "",
    tdsCode: "",
    tdsSection: "",
    tdsStatus: "",
    wefDate: null,
    basic_exemption: "",
    basic_rate_with_pan: "",
    basic_rate_without_pan: "",
  })
  const [statusAuto, setStatusAuto] = useState("")

  const tdsStatusAuto = [
    { value: 1, label: "COMPANY" },
    { value: 2, label: "OTHER_THAN_COMPANY" },
    { value: 3, label: "NONE" },
  ]

  const setTdsMasterData = async () => {
    setIsLoading(true)
    const response = await findTDSmasterbyid(tdsmid)

    setFormData((prev) => ({ ...prev, tdsName: response.data[0].name || "" }))
    setFormData((prev) => ({ ...prev, tdsCode: response.data[0].code || "" }))
    setFormData((prev) => ({ ...prev, tdsSection: response.data[0].section || "" }))
    setFormData((prev) => ({ ...prev, wefDate: response.data[0].applicable_from }))
    setFormData((prev) => ({ ...prev, basic_exemption: response.data[0].basic_exemption || "" }))
    setFormData((prev) => ({ ...prev, basic_rate_with_pan: response.data[0].basic_rate_pan || "" }))
    setFormData((prev) => ({ ...prev, basic_rate_without_pan: response.data[0].basic_rate_without_pan || "" }))

    const stAuto = tdsStatusAuto.filter(x => x.label == response.data[0].status)
    if (stAuto.length > 0) {
      setStatusAuto({ value: stAuto[0].value || "", label: stAuto[0].label || "" })
      setFormData((prev) => ({ ...prev, "tdsStatus": stAuto[0].label || "" }))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (tdsmid == undefined) {
      return;
    }
    else {
      setTdsMasterData()
    }
  }, [])


  const validate = () => {
    let errors = {};

    if (formData.tdsName == "") {
      errors.tdsNameError = true
      errors.tdsName = "TDS Name is required";
    }

    if (formData.tdsCode == "") {
      errors.tdsCodeError = true
      errors.tdsCode = "TDS Code is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }


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

  const handleAddTdsMaster = async () => {
    let response;
    if (!validate()) {
      return;
    }
    else {
      if (tdsmid == undefined) {
        // console.log("Form data : ", formData);
        setIsLoading(true)
        response = await addTDSmaster(formData)

      } else {
        // console.log("Form data : ", formData);
        setIsLoading(true)
        response = await updateTDSmaster({ ...formData, tdsmid: Number(tdsmid) })
      }
      if (response.status == 200) {
        navigate('/TDS_Master')
        setIsLoading(false)
      }
      setIsLoading(false)
    }
  }

  const fixedHeight = {
    height: '40%'
  };
  const handleCancel = ()=>{
    navigate('/TDS_Master')
   }
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >

            {tdsmid != undefined ? "Update TDS Master" : "Add TDS Master"}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: 'black', marginBottom: '2%' }} />

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="tdsName"
            label="TDS Name"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.tdsName}
            error={errors.tdsNameError}
            helperText={errors.tdsNameError ? errors.tdsName : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="tdsCode"
            label="TDS Code"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.tdsCode}
            error={errors.tdsCodeError}
            helperText={errors.tdsCodeError ? errors.tdsCode : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="tdsSection"
            label="TDS Section"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.tdsSection}
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={2.4} >
          <Autocomplete
            options={tdsStatusAuto}
            getOptionLabel={(option) => option.label || ""}
            value={statusAuto}
            onChange={(event, value) => {
              setStatusAuto(value)
              setFormData((prev) => ({ ...prev, "tdsStatus": value?.label || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="TDS Status "
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
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="Applicable From Date"
                  format="MM-DD-YYYY"
                  label="W.E.F. Date"
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.wefDate ? dayjs(formData.wefDate) : null}
                  onChange={(date) => { handleDateChange(date, 'wefDate') }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="basic_exemption"
            label="Basic Exemption"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.basic_exemption}
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="basic_rate_with_pan"
            label="Basic Rate (With PAN)"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.basic_rate_with_pan}
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="basic_rate_without_pan"
            label="Basic Rate (Without PAN)"
            fullWidth
            variant="outlined"
            size='small'
            onChange={handleInputChange}
            value={formData.basic_rate_without_pan}
          // error={formik.errors.wrNo && formik.touched.wrNo}
          // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
          // onBlur={formik.handleBlur}
          />
        </Grid>

      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3'}}
            onClick={handleAddTdsMaster}
          >
            {tdsmid != undefined ? "Update" : "Add"}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" style={{ backgroundColor: '#D92445'}} onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>

      </Grid>
    </>
  )
}

export default Add_TDS_Master
