import { Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from '@mui/styles';
import { SelectBranch } from "../../../lib/api-branch";
import { RegisterUser, getEmployeeList, getUserDetails, updateUserDetails } from "../../../lib/api-user";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

const ResizableTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    resize: 'both',
    overflow: 'auto',
  },
});

function Registration() {

  const navigate = useNavigate()
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [branches, setBranches] = useState([])
  const [branchAuto, setBranchAuto] = useState("")
  const [userType, setUserType] = useState([
    { value: 1, label: "Normal User" },
    { value: 2, label: "Admin" },
  ])
  const [userTypeAuto, setUserTypeAuto] = useState("")
  const [employee, setEmployee] = useState([])
  const [employeeAuto, setEmployeeAuto] = useState("")
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    branch: "",
    userType: "",
    employee: "",
    username: "",
    password: "",
    confrimPassword: ""
  })


  const getBranchData = async () => {
    const response = await SelectBranch()
    const response1 = await getEmployeeList()

    setBranches(() => {
      const branchOp = response.data.map((row) => {
        return {
          value: row.branch_id, label: row.branch_name
        };
      });
      return branchOp;
    })

    setEmployee(() => {
      const branchOp = response1.data.map((row) => {
        return {
          value: row.emp_id, label: row.employee_name
        };
      });
      return branchOp;
    })
  }

  const setSetUserData = async () => {
    setIsLoading(true)
    const response = await getUserDetails(username)
    console.log("d resp", response);

    const response1 = await SelectBranch()
    const response2 = await getEmployeeList()

    setFormData((prev) => ({ ...prev, username: response.data[0].username }))
    setFormData((prev) => ({ ...prev, password: response.data[0].password }))
    setFormData((prev) => ({ ...prev, confrimPassword: response.data[0].password }))
    setFormData((prev) => ({ ...prev, status: response.data[0].status }))
    setFormData((prev) => ({ ...prev, id: response.data[0].id }))

    const branchesData = response1.data.map((row) => ({ value: row.branch_id || null, label: row.branch_name }))
    setBranches(branchesData)
    const brAuto = branchesData.filter(x => x.value == response.data[0].branch)
    setBranchAuto({ value: brAuto[0]?.value || "", label: brAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "branch": brAuto[0]?.value || "" }))

    const utAuto = userType.filter(x => x.value == response.data[0].usertype)
    setUserTypeAuto({ value: utAuto[0]?.value || "", label: utAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "userType": utAuto[0]?.value || "" }))
    setIsLoading(false)

    const employeeData = response2.data.map((row) => ({ value: row.emp_id || null, label: row.employee_name }))
    setEmployee(employeeData)
    const empAuto = employeeData.filter(x => x.value == response.data[0].employee_id)
    setEmployeeAuto({ value: empAuto[0]?.value || "", label: empAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "employee": empAuto[0]?.value || "" }))
  }

  useEffect(() => {
    if (username == undefined) {
      getBranchData()
    } else {
      // getBranchData()
      setSetUserData()
    }
  }, [])

  const validate = () => {
    let errors = {};

    if (formData.branch == "") {
      errors.branchError = true
      errors.branch = "Branch is required";
    }

    if (formData.userType == "") {
      errors.userTypeError = true
      errors.userType = "User Type is required";
    }

    if (formData.employee == "") {
      errors.employeeError = true
      errors.employee = "Employee is required";
    }

    if (formData.username == "") {
      errors.usernameError = true
      errors.username = "Username is required";
    }

    if (formData.password == "") {
      errors.passwordError = true
      errors.password = "Password is required";
    }

    if (formData.confrimPassword == "") {
      errors.confrimPasswordError = true
      errors.confrimPassword = "Confirm Password is required";
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

  const handleSave = async () => {
    let errors = {}
    let response;
    if (!validate()) {
      return;
    }
    if (formData.password != formData.confrimPassword) {
      errors.confrimPasswordError = true
      errors.confrimPassword = "Password not match";
      setErrors(errors);
      return;
    }
    setIsLoading(true)
    if (username == undefined) {
      console.log("f dataa : ", formData);
      response = await RegisterUser(formData)
    } else {
      console.log("f dataa : ", formData);
      response = await updateUserDetails(formData)
    }
    if (response.status == 200) {
      navigate('/user-registration')
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  const handleCancel = () => {
    navigate('/user-registration')
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div style={{
        // backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100%',
        width: '100%',
        padding: '20px'
      }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={6} md={2}>
            <Typography
              sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginLeft: 2 }}
            >
              Grant Permissions
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ marginTop: '2px', justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
          <Grid item xs={6} md={3} marginBottom={errors.userTypeError ? 3 : 0}>
            <Autocomplete
              options={branches}
              getOptionLabel={(option) => option.label || ""}
              value={branchAuto || null}
              onChange={(event, value) => {
                setBranchAuto(value)
                setFormData((prev) => ({ ...prev, "branch": value?.value || null }))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Branch:"
                  variant="outlined"
                  fullWidth
                  size='small'
                  name="assignedCrew"
                  error={errors.branchError}
                  helperText={errors.branchError ? errors.branch : ""}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={3} marginBottom={errors.branchError ? 3 : 0}>
            <Autocomplete
              options={userType}
              getOptionLabel={(option) => option.label || ""}
              value={userTypeAuto || null}
              onChange={(event, value) => {
                setUserTypeAuto(value)
                setFormData((prev) => ({ ...prev, "userType": value?.value || null }))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="User Type:"
                  variant="outlined"
                  fullWidth
                  size='small'
                  name="assignedCrew"
                  error={errors.userTypeError}
                  helperText={errors.userTypeError ? errors.userType : ""}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ marginTop: '2px', justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
          <Grid item xs={6} md={3} marginBottom={errors.usernameError ? 3 : 0}>
            <Autocomplete
              options={employee}
              getOptionLabel={(option) => option.label || ""}
              value={employeeAuto || null}
              onChange={(event, value) => {
                setEmployeeAuto(value)
                setFormData((prev) => ({ ...prev, "employee": value?.value || null }))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Employee: "
                  variant="outlined"
                  fullWidth
                  size='small'
                  name="assignedCrew"
                  error={errors.employeeError}
                  helperText={errors.employeeError ? errors.employee : ""}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={3} marginBottom={errors.employeeError ? 3 : 0}>
            <TextField
              className="customTextField"
              name="username"
              label="Username"
              fullWidth
              variant="outlined"
              size='small'
              error={errors.usernameError}
              helperText={errors.usernameError ? errors.username : ""}
              value={formData.username}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ marginTop: '2px', justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
          <Grid item xs={6} md={3} marginBottom={errors.confrimPasswordError ? 3 : 0}>
            <TextField
              type="password"
              className="customTextField"
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              size='small'
              error={errors.passwordError}
              helperText={errors.passwordError ? errors.password : ""}
              value={formData.password}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6} md={3} marginBottom={errors.confrimPasswordError ? 3 : 0}>
            <TextField
              type="password"
              className="customTextField"
              name="confrimPassword"
              label="Confirm Password"
              fullWidth
              variant="outlined"
              size='small'
              error={errors.confrimPasswordError}
              helperText={errors.confrimPasswordError ? errors.confrimPassword : ""}
              value={formData.confrimPassword}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
          <Grid item>
            <Button variant="contained" color="primary" style={{ backgroundColor: 'blue' }}
              onClick={handleSave}
            >
              {username != undefined ? "Update" : "Save"}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" style={{ backgroundColor: '#D92445' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>

        </Grid>


      </div>
    </>


  )

}
export default Registration