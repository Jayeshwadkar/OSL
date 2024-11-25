import { Autocomplete, Box, Button, Divider, FormControl, Grid, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SelectBranch } from '../../../../lib/api-branch'
import { findGSTmasterbyid, addGSTmaster, updateGSTmaster } from '../../../../lib/api-master'
import { indiaStates } from '../../../../constants'
import dayjs from 'dayjs'
import LoadingSpinner from '../../../../components/ui/LoadingSpinner'

function Add_GST_No() {

  const { gstmid } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [branches, setBranches] = useState([])
  const [branchAuto, setBranchAuto] = useState("")
  const [formData, setFormData] = useState({
    branch: "",
    state: "",
    state_code: "",
    gst_name: "",
    wef_date: null,
    end_date: null,
    rate: "",
    gst_rate_category: "",
    gst_category: "",
    sac_code: "",
    type: "",
    igst: "",
    igst_posting_output: "",
    igst_posting_input: "",
    cgst: "",
    cgst_posting_output: "",
    cgst_posting_input: "",
    sgst: "",
    sgst_posting_output: "",
    sgst_posting_input: "",
    remarks: ""
  })

  const [statAuto, setStateAuto] = useState("")
  const [gstRateCategoryAuto, setGstRateCategoryAuto] = useState("")
  const [gstCategoryAuto, setGstCategoryAuto] = useState("")
  const [sacCodeAuto, setSacCodeAuto] = useState("")
  const [typeAuto, setTypeAuto] = useState("")

  const gstRateCategoryAutoData = [
    { value: 1, label: "EXEMPT" },
    { value: 2, label: "NOT ZERO" },
    { value: 3, label: "REVERSE CHARGES" },
    { value: 4, label: "NILL RATED" },
  ]

  const gstCategoryAutoData = [
    { value: 1, label: "SERVICES" },
    { value: 2, label: "WAREHOUSE SERVICES" },
    { value: 3, label: "MANAGEMENT FEES" },
  ]

  const sacCodeAutoData = [
    { value: 1, label: "996511" },
    { value: 2, label: "996531" },
    { value: 3, label: "996729" },
    { value: 4, label: "998311" },
    { value: 5, label: "997311" },
  ]

  const typeAutoData = [
    { value: 1, label: "EXCLUDING" }
  ]

  const getBranchData = async () => {
    const response = await SelectBranch();
    setBranches(() => {
      const branchOp = response.data.map((row) => {
        return {
          value: row.branch_id || null, label: row.place_name
        };
      });
      return branchOp;
    })
  };

  const setGstMasterData = async () => {
    setIsLoading(true)
    const result = await SelectBranch();
    const response = await findGSTmasterbyid(gstmid)

    setFormData((prev) => ({ ...prev, state_code: response.data[0].stateCode }))
    setFormData((prev) => ({ ...prev, gst_name: response.data[0].gstName }))
    setFormData((prev) => ({ ...prev, wef_date: response.data[0].effectiveDate }))
    setFormData((prev) => ({ ...prev, end_date: response.data[0].endDate }))
    setFormData((prev) => ({ ...prev, rate: response.data[0].taxRate }))
    setFormData((prev) => ({ ...prev, igst: response.data[0].igst }))
    setFormData((prev) => ({ ...prev, igst_posting_output: response.data[0].igstPostingOut }))
    setFormData((prev) => ({ ...prev, igst_posting_input: response.data[0].igstPostingIn }))
    setFormData((prev) => ({ ...prev, cgst: response.data[0].cgst }))
    setFormData((prev) => ({ ...prev, cgst_posting_output: response.data[0].cgstPostingOut }))
    setFormData((prev) => ({ ...prev, cgst_posting_input: response.data[0].cgstPostingIn }))
    setFormData((prev) => ({ ...prev, sgst: response.data[0].sgst }))
    setFormData((prev) => ({ ...prev, sgst_posting_output: response.data[0].sgstPostingOut }))
    setFormData((prev) => ({ ...prev, sgst_posting_input: response.data[0].sgstPostingIn }))
    setFormData((prev) => ({ ...prev, remarks: response.data[0].remarks }))

    const branchesData = result.data.map((row) => ({ value: row.branch_id || null, label: row.place_name }))
    const brAuto = branchesData.filter(x => x.value == response.data[0].branch)
    setBranchAuto({ value: brAuto[0]?.value || "", label: brAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "branch": brAuto[0]?.value || "" }))

    const stAuto = indiaStates.filter(x => x.label == response.data[0].state)
    setStateAuto({ value: stAuto[0]?.value || "", label: stAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "state": stAuto[0]?.label || "" }))

    const gtsrauto = gstRateCategoryAutoData.filter(x => x.label == response.data[0].gstRateCategory)
    setGstRateCategoryAuto({ value: gtsrauto[0]?.value || "", label: gtsrauto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "gst_rate_category": gtsrauto[0]?.label || "" }))

    const gtscauto = gstCategoryAutoData.filter(x => x.label == response.data[0].gstCategory)
    setGstCategoryAuto({ value: gtscauto[0]?.value || "", label: gtscauto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "gst_category": gtscauto[0]?.label || "" }))

    const sacAuto = sacCodeAutoData.filter(x => x.label == response.data[0].sacCode)
    setSacCodeAuto({ value: sacAuto[0]?.value || "", label: sacAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "sac_code": sacAuto[0]?.label || "" }))

    const typeAutoo = typeAutoData.filter(x => x.label == response.data[0].type)
    setTypeAuto({ value: typeAutoo[0]?.value || "", label: typeAutoo[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "type": typeAutoo[0]?.label || "" }))
    setIsLoading(false)
  }

  useEffect(() => {
    if (gstmid == undefined) {
      getBranchData()
    }
    else {
      getBranchData()
      setGstMasterData()
    }
  }, [])

  const validate = () => {
    let errors = {};

    if (formData.branch == "") {
      errors.branchError = true
      errors.branch = "Branch  is required";
    }

    if (formData.state == "") {
      errors.stateError = true
      errors.state = "State Name is required";
    }

    if (formData.state_code == "") {
      errors.state_codeError = true
      errors.state_code = "State Code is required";
    }

    if (formData.gst_name == "") {
      errors.gst_nameError = true
      errors.gst_name = "Gst Name is required";
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

  const handleAddGstMaster = async () => {
    let response;
    if (!validate()) {
      return;
    }
    else {
      if (gstmid == undefined) {
        // console.log("Form data : ", formData);
        setIsLoading(true)
        response = await addGSTmaster(formData)

      } else {
        // console.log("Form data : ", formData);
        setIsLoading(true)
        response = await updateGSTmaster({ ...formData, gstmid: Number(gstmid) })
      }
      if (response.status == 200) {
        navigate('/GST_master')
        setIsLoading(false)
      }
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/GST_master')
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
            {gstmid != undefined ? "Update GST Master" : "Add GST Master"}
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
              setFormData((prev) => ({ ...prev, "branch": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch"
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.branchError}
                helperText={errors.branchError ? errors.branch : ''}
              />
            )}
          />
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: 'black', marginBottom: '2%' }} />

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={2.4} >
          <Autocomplete
            options={indiaStates}
            getOptionLabel={(option) => option.label || ""}
            value={statAuto}
            onChange={(event, value) => {
              setStateAuto(value)
              setFormData((prev) => ({ ...prev, "state": value?.label || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select State  "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.stateError}
                helperText={errors.stateError ? errors.state : ''}
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="state_code"
            label="State Code"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.state_code}
            onChange={handleInputChange}
            error={errors.state_codeError}
            helperText={errors.state_codeError ? errors.state_code : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="gst_name"
            label="GST Name"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.gst_name}
            onChange={handleInputChange}
            error={errors.gst_nameError}
            helperText={errors.gst_nameError ? errors.gst_name : ''}
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="W.E.F. Date"
                  format="MM-DD-YYYY"
                  label="W.E.F. Date"
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.wef_date ? dayjs(formData.wef_date) : null}
                  onChange={(date) => { handleDateChange(date, 'wef_date') }}
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
                  name="End Date"
                  format="MM-DD-YYYY"
                  label="End Date"
                  slotProps={{ textField: { size: 'small' } }}
                  value={formData.end_date ? dayjs(formData.end_date) : null}
                  onChange={(date) => { handleDateChange(date, 'end_date') }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="rate"
            label="Rate"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.rate}
            onChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={2.4} >
          <Autocomplete
            options={gstRateCategoryAutoData}
            getOptionLabel={(option) => option.label || ""}
            value={gstRateCategoryAuto}
            onChange={(event, value) => {
              setGstRateCategoryAuto(value)
              setFormData((prev) => ({ ...prev, "gst_rate_category": value?.label || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="GST Rate Category  "
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

        <Grid item xs={2.4} >
          <Autocomplete
            options={gstCategoryAutoData}
            getOptionLabel={(option) => option.label || ""}
            value={gstCategoryAuto}
            onChange={(event, value) => {
              setGstCategoryAuto(value)
              setFormData((prev) => ({ ...prev, "gst_category": value?.label || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="GST  Category "
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

        <Grid item xs={2.4} >
          <Autocomplete
            options={sacCodeAutoData}
            getOptionLabel={(option) => option.label || ""}
            value={sacCodeAuto}
            onChange={(event, value) => {
              setSacCodeAuto(value)
              setFormData((prev) => ({ ...prev, "sac_code": value?.label || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="SAC CODE "
                variant="outlined"
                fullWidth
                size='small'
                name="sac_code"
                value={formData.sac_code}
                onChange={handleInputChange}
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4} >
          <Autocomplete
            options={typeAutoData}
            getOptionLabel={(option) => option.label || ""}
            value={typeAuto}
            onChange={(event, value) => {
              setTypeAuto(value)
              setFormData((prev) => ({ ...prev, "type": value?.label || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type"
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

        <Grid container justifyContent="center">
          <Grid item xs={6} md={2}>
            <Typography
              sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginTop: 2, textAlign: 'center' }}
            >
              Posting Details
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="igst"
            label="IGST"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.igst}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="igst_posting_output"
            label="IGST Posting A/C (Output)"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.igst_posting_output}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="igst_posting_input"
            label="IGST Posting A/C (Input)"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.igst_posting_input}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="cgst"
            label="CGST"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.cgst}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="cgst_posting_output"
            label="CGST Posting A/C (Output)"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.cgst_posting_output}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="cgst_posting_input"
            label="CGST Posting A/C (Input)"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.cgst_posting_input}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="sgst"
            label="SGST"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.sgst}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="sgst_posting_output"
            label="SGST Posting A/C (Output)"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.sgst_posting_output}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="sgst_posting_input"
            label="SGST Posting A/C (Input)"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.sgst_posting_input}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className="customTextField"
            name="remarks"
            label="Remarks"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.remarks}
            onChange={handleInputChange}
          />
        </Grid>

      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
            onClick={handleAddGstMaster}
          >
            {gstmid != undefined ? "Update" : "Add"}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" style={{ backgroundColor: '#D92445'  }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Grid>

      </Grid>
    </>
  )
}

export default Add_GST_No
