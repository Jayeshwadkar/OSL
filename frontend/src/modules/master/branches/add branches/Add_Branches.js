import { Autocomplete, Button, Divider, Grid, styled, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getPlacesList, addBranch, findBranchById, updateBranch, getAllPlacesList } from '../../../../lib/api-master';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

const ResizableTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    resize: 'both',
    overflow: 'auto',
  },
});

function Add_Branches() {

  const navigate = useNavigate();
  const { branchid } = useParams()
  const [places, setPlaces] = useState([])
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState("")
  const [formData, setFormData] = useState({
    branchCode: "",
    abbreviation: "",
    branchName: "",
    description: "",
    placeId: "",
    address: "",
    state: "",
    city: "",
    pincode: ""
  })

  const validate = () => {
    let errors = {};

    if (formData.branchCode == "") {
      errors.branchCodeError = true
      errors.branchCode = "Branch code is required";
    }

    if (formData.abbreviation == "") {
      errors.abbreviationError = true
      errors.abbreviation = "Abbreviation is required";
    }

    if (formData.branchName == "") {
      errors.branchNameError = true
      errors.branchName = "Branch name is required";
    }

    if (formData.description == "") {
      errors.descriptionError = true
      errors.description = "Description is required";
    }

    if (formData.placeId == "") {
      errors.placeIdError = true
      errors.placeId = "Place Id is required";
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

    if (formData.pincode.length < 6) {
      if (/^\d{6}$/.test(formData.pincode)) {
        errors.pincodeError = true
        errors.pincode = "Pincode must be 6 digit";
        return;
      }
      if (formData.pincode == "") {
        errors.pincodeError = true
        errors.pincode = "Pincode is required";
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };


  const getPlaceData = async () => {
    const response = await getPlacesList()

    setPlaces(() => {
      const placeOp = response.data.place.map((row) => {
        return {
          value: row.place_id, label: row.place_name
        };
      });
      return placeOp;
    })
  }

  const setBranch_Data = async () => {
    setIsLoading(true)
    const response = await getAllPlacesList();
    const result = await findBranchById(branchid)
    // console.log("branch resp : ", result);

    setFormData((prev) => ({ ...prev, branchCode: result.data[0].branch_code || "" }))
    setFormData((prev) => ({ ...prev, abbreviation: result.data[0].branch_abbreviation || "" }))
    setFormData((prev) => ({ ...prev, branchName: result.data[0].branch_name || "" }))
    setFormData((prev) => ({ ...prev, description: result.data[0].description || "" }))
    setFormData((prev) => ({ ...prev, address: result.data[0].address || "" }))
    setFormData((prev) => ({ ...prev, state: result.data[0].state || "" }))
    setFormData((prev) => ({ ...prev, city: result.data[0].city || "" }))
    setFormData((prev) => ({ ...prev, pincode: result.data[0].pincode || "" }))

     const Autocomplevalue = response.data.filter((item) => item.place_id == result.data[0].place_id);
     setSelectedPlace(Autocomplevalue ? { value: Autocomplevalue[0].place_id, label: Autocomplevalue[0].place_name } : null)
     setFormData((prev) => ({ ...prev, placeId: Autocomplevalue[0].place_id }))
    setIsLoading(false)
  }

  useEffect(() => {
    if (branchid == undefined) {
      getPlaceData();
    } else {
      getPlaceData();
      setBranch_Data();
    }
  }, [])


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate('/Branches'); // Adjust the path as necessary to match your route
  }

  const handleAddBranches = async () => {

    let response;
    if (!validate()) {
      return;
    }
    else {
      if (branchid == undefined) {
        setIsLoading(true)
        response = await addBranch(formData)
      } else {
        setIsLoading(true)
        response = await updateBranch({ ...formData, branchid: branchid })
      }
      if (response.status == 200) {
        setIsLoading(false)
        navigate('/branches')
        return;
      }
    }
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            {branchid !== undefined ? "Update Branches" : "Add Branches"}

          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '1%' }}>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="branchCode"
            label="Branch Code"
            fullWidth
            variant="outlined"
            size="small"
            error={errors.branchCodeError}
            helperText={errors.branchCodeError ? errors.branchCode : ""}
            value={formData.branchCode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="abbreviation"
            label="Abbrevation"
            fullWidth
            variant="outlined"
            size="small"
            error={errors.abbreviationError}
            helperText={errors.abbreviationError ? errors.abbreviation : ""}
            value={formData.abbreviation}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="branchName"
            label="Name"
            fullWidth
            variant="outlined"
            size="small"
            error={errors.branchNameError}
            helperText={errors.branchNameError ? errors.branchName : ""}
            value={formData.branchName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
            size="small"
            error={errors.descriptionError}
            helperText={errors.descriptionError ? errors.description : ""}
            value={formData.description}
            onChange={handleInputChange}
          />
        </Grid>



        <Grid item xs={2.4} >
          <Autocomplete
            options={places}
            getOptionLabel={(option) => option.label || ""}
            value={selectedPlace || null}
            onChange={(event, value) => {
              setSelectedPlace(value)
              setFormData((prev) => ({ ...prev, placeId: value?.value || null })); // Assuming setBranchId sets the branch id somewhere else
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Place "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.placeIdError}
                helperText={errors.placeIdError ? errors.placeId : ""}
              />
            )}
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

        <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
          <Grid item xs={2.4} >
            <ResizableTextField
              name='address'
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
            <TextField
              className="customTextField"
              name="state"
              label="State"
              fullWidth
              variant="outlined"
              size="small"
              error={errors.stateError}
              helperText={errors.stateError ? errors.state : ""}
              value={formData.state}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              className="customTextField"
              name="city"
              label="City"
              fullWidth
              variant="outlined"
              size="small"
              error={errors.cityError}
              helperText={errors.cityError ? errors.city : ""}
              value={formData.city}
              onChange={handleInputChange}
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

        <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2} mt={2}>
          <Grid item>
            <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
              onClick={handleAddBranches}
            >
              {branchid !== undefined ? "Update" : "Add"}
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

export default Add_Branches
