import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { findVehicleTypeById, addvehicletype, updateVehicleType } from '../../../../lib/api-master';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

function Add_Vehicle_Type() {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("")
  const [tyre_qty, setTyre_qty] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const { vehicletid } = useParams()

  const validate = () => {
    let errors = {};

    if (vehicleType == "") {
      errors.vehicleTyepError = true
      errors.vehicleType = "Branch code is required";
    }

    if (tyre_qty == undefined) {
      errors.tyre_qtyError = true
      errors.tyre_qty = "Branch code is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  const setVehicleType_Data = async () => {
    setIsLoading(true)
    const result = await findVehicleTypeById(vehicletid)
    console.log("vt resp : ", result);
    setVehicleType(result.data[0].vehicle_type)
    setTyre_qty(result.data[0].tyre_qty)
    setIsLoading(false)
  }

  useEffect(() => {
    if (vehicletid == undefined) {

    } else {
      setVehicleType_Data();
    }
  }, [])

  const handleCancel = () => {
    navigate('/vehicle-type'); // Adjust the path as necessary to match your route
  }

  const handleAddVehicleType = async () => {
    let response;
    if (!validate()) {
      return;
    }
    if (vehicletid == undefined) {
      setIsLoading(true)
      response = await addvehicletype({
        vehicleType: vehicleType,
        tyre_qty: tyre_qty
      })
    } else {
      setIsLoading(true)
      response = await updateVehicleType({
        vehicletid: vehicletid,
        vehicleType: vehicleType,
        tyre_qty: tyre_qty
      })
    }
    if (response.status == 200) {
      setIsLoading(false)
      navigate('/vehicle-type')
      return;
    }
  }


  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            Vehicle Type
          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
        <Grid item xs={6}>
          <TextField
            className="customTextField"
            name="Vehicle Type"
            label="Vehicle Type"
            fullWidth
            variant="outlined"
            size="small"
            error={errors.vehicleTyepError}
            helperText={errors.vehicleTyepError ? errors.vehicleType : ""}
            value={vehicleType}
            onChange={(event) => { setVehicleType(event.target.value) }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="customTextField"
            name="Tyre Quantity"
            label="Tyre Quantity"
            fullWidth
            variant="outlined"
            size="small"
            error={errors.tyre_qtyError}
            helperText={errors.tyre_qtyError ? errors.tyre_qty : ""}
            value={tyre_qty}
            onChange={(event) => { setTyre_qty(event.target.value) }}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
            onClick={handleAddVehicleType}
          >
            {vehicletid != undefined ? "Update" : "Add"}
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

export default Add_Vehicle_Type
