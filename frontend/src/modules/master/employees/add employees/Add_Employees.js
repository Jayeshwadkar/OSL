import { Autocomplete, Box, Button, Checkbox, Divider, FormControl, Grid, TextField, Typography, FormControlLabel } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/styles';
import { getEmployeeById } from '../../../../lib/api-master';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import dayjs from 'dayjs';
import { addEmployee, updateEmployee } from '../../../../lib/api-master';

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

function Add_Employees() {
  const navigate = useNavigate();
  const { empid } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    empname: "",
    empId: "",
    department: "",
    address: "",
    birthdate: null,
    email: "",
    permanantAdd: "",
    joiningDate: null,
    qualification: "",
    mobileno: "",
    bloodG: "",
    designation: "",
    curr_state: "",
    curr_city: "",
    curr_pincode: "",
    per_state: "",
    per_city: "",
    per_pincode: ""
  });

  const blood_grp = [
    { value: "A-", label: "A-" },
    { value: "B-", label: "B-" },
    { value: "AB-", label: "AB-" },
    { value: "O-", label: "O-" },
    { value: "A+", label: "A+" },
    { value: "B+", label: "B+" },
    { value: "AB+", label: "AB+" },
    { value: "O+", label: "O+" },
  ]

  const validate = () => {
    let errors = {};

    if (formData.empname == "") {
      errors.empNameError = true
      errors.empName = "Employee name is required";
    }

    if (formData.department == "") {
      errors.departmentError = true
      errors.department = "Department is required";
    }

    if (formData.address == "") {
      errors.addressError = true
      errors.address = "Address is required";
    }

    if (formData.permanantAdd == "") {
      errors.permanantAddError = true
      errors.permanantAdd = "Address is required";
    }

    if (formData.qualification == "") {
      errors.qualificationError = true
      errors.qualification = "Address is required";
    }

    if (formData.designation == "") {
      errors.designationError = true
      errors.designation = "Address is required";
    }

    if (formData.mobileno == "") {
      errors.mobilenoError = true
      errors.mobileno = "Address is required";
    }

    if (formData.email == "") {
      errors.emailError = true
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.emailError = true
      errors.email = "Invalid email address";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };


  const setEmployeeData = async () => {
    setIsLoading(true)
    const response = await getEmployeeById(empid)
    // console.log("emp resp : ", response);

    setFormData((prev) => ({ ...prev, empname: response.data[0].employee_name }))
    setFormData((prev) => ({ ...prev, empId: response.data[0].emp_id }))
    setFormData((prev) => ({ ...prev, department: response.data[0].department }))
    setFormData((prev) => ({ ...prev, address: response.data[0].corresp_address }))
    setFormData((prev) => ({ ...prev, birthdate: dayjs(response.data[0].date_of_birth).format("MM/DD/YYYY") }))
    setFormData((prev) => ({ ...prev, email: response.data[0].emailid }))
    setFormData((prev) => ({ ...prev, joiningDate: dayjs(response.data[0].joining_date).format("MM/DD/YYYY") }))
    setFormData((prev) => ({ ...prev, permanantAdd: response.data[0].permanat_address }))
    setFormData((prev) => ({ ...prev, qualification: response.data[0].qualification }))
    setFormData((prev) => ({ ...prev, mobileno: response.data[0].mobileno }))
    setFormData((prev) => ({ ...prev, bloodG: response.data[0].blood_group }))
    setFormData((prev) => ({ ...prev, designation: response.data[0].designation }))

    setFormData((prev) => ({ ...prev, curr_state: response.data[0].corresp_state }))
    setFormData((prev) => ({ ...prev, curr_city: response.data[0].corresp_city }))
    setFormData((prev) => ({ ...prev, curr_pincode: response.data[0].corresp_pincode }))
    setFormData((prev) => ({ ...prev, per_state: response.data[0].permanat_state }))
    setFormData((prev) => ({ ...prev, per_city: response.data[0].permanat_city }))
    setFormData((prev) => ({ ...prev, per_pincode: response.data[0].permanat_pincode }))

    setIsLoading(false)

  }

  useEffect(() => {
    if (empid === undefined) {
      return;
    } else {
      setEmployeeData();
    }
  }, [])

  const handleAddEmployee = async () => {
    let response;
    if (!validate()) {
      return;
    }
    else {
      if (empid == undefined) {
        setIsLoading(true)
        response = await addEmployee(formData)
      }
      else {
        setIsLoading(true)
        response = await updateEmployee({ ...formData, empid: empid })
      }
      if (response.status == 200) {
        setIsLoading(false)
        navigate('/employees')
        return;
      }
    }
    setIsLoading(false)
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


  const handleCancel = () => {
    navigate('/Employees'); // Adjust the path as necessary to match your route
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            {empid != undefined ? "Update Employee" : "Add Employee"}
          </Typography>
        </Grid>
      </Grid>


      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="empId"
            label=" Employee ID"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.empId}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="empname"
            label=" Employee Name"
            fullWidth
            variant="outlined"
            size='small'
            error={errors.empNameError}
            helperText={errors.empNameError ? errors.empName : ""}
            value={formData.empname}
            onChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="department"
            label=" Department"
            fullWidth
            variant="outlined"
            size='small'
            error={errors.departmentError}
            helperText={errors.departmentError ? errors.department : ""}
            value={formData.department}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="designation"
            label=" Designation"
            fullWidth
            variant="outlined"
            size='small'
            error={errors.designationError}
            helperText={errors.designationError ? errors.designation : ""}
            value={formData.designation}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="joiningDate"
                  format="MM-DD-YYYY"
                  label="Date Of Joining"
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.joiningDate ? dayjs(formData.joiningDate) : null}
                  onChange={(date) => { handleDateChange(date, 'joiningDate') }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="email"
            label=" Email Id"
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
            label=" MobileNo"
            fullWidth
            variant="outlined"
            size='small'
            error={errors.mobilenoError}
            helperText={errors.mobilenoError ? errors.mobileno : ""}
            value={formData.mobileno}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="qualification"
            label=" Qualification"
            fullWidth
            variant="outlined"
            size='small'
            error={errors.qualificationError}
            helperText={errors.qualificationError ? errors.qualification : ""}
            value={formData.qualification}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="birthdate"
                  format="MM-DD-YYYY"
                  label="Date Of Birth"
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.birthdate ? dayjs(formData.birthdate) : null}
                  onChange={(date) => { handleDateChange(date, 'birthdate') }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <Autocomplete
            options={blood_grp}
            getOptionLabel={(option) => option.label || ""}
            value={{ value: 1, label: formData.bloodG }}
            onChange={(event, value) => {
              setFormData((prev) => ({ ...prev, "bloodG": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Blood Group"
                variant="outlined"
                fullWidth
                size='small'
                name="bloodG"
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>
          <ResizableTextField
            id="outlined-multiline-flexible"
            name='address'
            label="Current Address:"
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
          />
        </Grid>

        <Grid item xs={2.4}>

        </Grid>



        <Grid item xs={2.4}>
          <ResizableTextField
            id="outlined-multiline-flexible"
            label="Permanant Address:"
            multiline
            maxRows={10}
            size='small'
            fullWidth
            variant="outlined"
            name='permanantAdd'
            error={errors.permanantAddError}
            helperText={errors.permanantAddError ? errors.permanantAdd : ""}
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
          />
        </Grid>

        <Grid item xs={2.4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <FormControlLabel control={<Checkbox {...label} onChange={handleCheckBox} />} label="Same as Current" />
        </Grid>





      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
            onClick={handleAddEmployee}
          >
            {empid != undefined ? "Update" : "Add"}
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

export default Add_Employees
