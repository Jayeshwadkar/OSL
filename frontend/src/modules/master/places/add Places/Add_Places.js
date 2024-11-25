import { Autocomplete, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomersList, addPlaces, findPlaceById, updatePlace } from '../../../../lib/api-master';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';


function Add_Places() {
  const navigate = useNavigate();
  const { placeid } = useParams()
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    customer_id: "",
    place_name: "",
    distance: ""
  })

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

  const setPlace_Data = async () => {
    setIsLoading(true)
    const result = await findPlaceById(placeid)
    const response = await getCustomersList();


    const customerData = response.data.map((row) => ({ value: row.customer_id || null, label: row.customer_name }))
    setCustomers(customerData)
    const cuAuto = customerData.filter(x => x.value == result.data.customer_id)
    setSelectedCustomer(cuAuto.length > 0 ? { value: cuAuto[0]?.value, label: cuAuto[0]?.label } : null)
    setFormData((prev) => ({ ...prev, customer_id: cuAuto[0]?.value || "" }))

    setFormData((prev) => ({ ...prev, place_name: result.data.place_name || "" }))
    setFormData((prev) => ({ ...prev, distance: result.data.place_abbreviation || "" }))
    setIsLoading(false)
  }

  useEffect(() => {
    if (placeid == undefined) {
      getCustomersData();
    } else {
      // getCustomersData();
      setPlace_Data();
    }
  }, [placeid])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate('/Places'); // Adjust the path as necessary to match your route
  }

  const validate = () => {
    let errors = {};

    if (formData.customer_id == "") {
      errors.customer_idError = true
      errors.customer_id = "Customer Name is required";
    }

    if (formData.place_name == "") {
      errors.place_nameError = true
      errors.place_name = "Place Name is required";
    }

    if (formData.distance == "") {
      errors.distanceError = true
      errors.distance = "Abbreviation is required";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  const handleAddPlaces = async () => {
    if (!validate()) {
      return;
    }
    else {
      let response;
      if (placeid == undefined) {
        setIsLoading(true)
        response = await addPlaces(formData)
      } else {
        setIsLoading(true)
        response = await updatePlace({ ...formData, placeid: placeid })
      }
      if (response.status == 200) {
        navigate('/places')
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
            {placeid !== undefined ? "Update Place" : "Add Place"}

          </Typography>
        </Grid>
      </Grid>



      <Divider sx={{ backgroundColor: 'black', marginBottom: '2%' }} />

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>

        <Grid item xs={4} >
          <Autocomplete
            options={customers}
            getOptionLabel={(option) => option.label || ""}
            value={selectedCustomer || null}
            onChange={(event, value) => {
              setSelectedCustomer(value)
              setFormData((prev) => ({ ...prev, customer_id: value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search The Customer "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.customer_idError}
                helperText={errors.customer_idError ? errors.customer_id : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>


          <TextField
            className="customTextField"
            name="place_name"
            label="Place Name"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.place_name}
            onChange={handleInputChange}
            error={errors.place_nameError}
            helperText={errors.place_nameError ? errors.place_name : ""}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="distance"
            label="Distance (KM)"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.distance}
            onChange={handleInputChange}
            error={errors.distanceError}
            helperText={errors.distanceError ? errors.distance : ""}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
            onClick={handleAddPlaces}
          >
            {placeid !== undefined ? "Update" : "Add"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#D92445' }}
            onClick={handleCancel}
          >   Cancel
          </Button>
        </Grid>

      </Grid>

    </>
  )
}

export default Add_Places
