import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  ImageList,
  ImageListItem,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});
function AddRegularBill() {
  const [rows, setRows] = useState([]);
  const [manuallyEnter, setManuallyEnter] = useState(false);
  const [tax, setTax] = useState(false);
  const [load909, setLoad909] = useState(false);
  const [load407, setLoad407] = useState(false);
  const [loadLCV, setLoadLCV] = useState(false);
  const [loadft, setLoadFT] = useState(false);
  const [load1109, setLoad1109] = useState(false);
  const [mathadi, setMathadi] = useState(false);
  const [loadingcharges, setLoadingCharges] = useState(false);
  const [unloadingcharges, setUnloadingCharges] = useState(false);

  const handleCheckboxChange = (setter) => (event) => {
    setter(event.target.checked);
  };












  const classes = useStyles();
  const columns = [
    { field: "id", headerName: "SN", flex: 1 ,headerClassName: classes.blueHeader},
    {
      field: "invNo",
      headerName: "InvNo",
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "invDate",
      headerName: "InvDate",
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "desc",
      headerName: "Description",
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "articles",
      headerName: "Articles",
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "noArticles",
      headerName: "No.Articles",
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "qty",
      headerName: "Qty",
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "invAmt",
      headerName: "InvAmt",
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "lrNo",
      headerName: "LR No",
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "lrDate",
      headerName: "LRDate",
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "consignor",
      headerName: "Consignor",
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "from",
      headerName: "From",
      sortable: false,
      flex: 1 ,headerClassName: classes.blueHeader
    },
    {
      field: "consignee",
      headerName: "Consignee",
      sortable: false,
      flex: 1 ,headerClassName: classes.blueHeader
    },
    {
      field: "to",
      headerName: "To",
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
    {
      field: "weight",
      headerName: "Weight",
      sortable: false,
      flex: 1,headerClassName: classes.blueHeader
    },
  ];
  

  return (
    <>
   
    <Grid container spacing={3}>
  <Grid item xs={6} md={2} >
    
    <Autocomplete
options={[]}
      //getOptionLabel={(option) => option.label}
      //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      //value={formik.values.assignedCrew}
      renderInput={(params) => (
        
        <TextField
        {...params}
        label="Branch"
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
  <Grid item xs={6} md={2} >
 
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    value="superadmin"
    InputProps={{
      readOnly: true,
      
      style: { color: 'darkblack' }
    }}
  />
</Grid>

        <Grid item xs={6} md={2} ml={16} sx={{ float: "center" }}>
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: "1.75rem",
              marginBottom: 2,
              marginLeft: 2,
            }}
          >
            Regular Bill
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Divider sx={{ backgroundColor: "black" }} />
      <br />

      <Grid container spacing={3} sx={{ marginTop: "0px" }}>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="wrNo"
            label="Bill No"
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="Bill Date"
                  format="MM-DD-YYYY"
                  label="Bill Date "
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        {/* Bill Type */}
        <Grid item xs={2.4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Bill Type</InputLabel>
            <Select
              className="customTextField"
              name="Bill Type"
              label="Bill Type"
              defaultValue=""
            >
              <MenuItem value="ACK">ACK</MenuItem>
              {/* Add other MenuItem components as needed */}
            </Select>
          </FormControl>
        </Grid>

      
      <Grid item xs={2.4} >
        
        <Autocomplete
options={[]}
      //getOptionLabel={(option) => option.label}
      //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      //value={formik.values.assignedCrew}
      renderInput={(params) => (
        
        <TextField
          {...params}
          
          label="Consigner name"
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
     
      <TextField
        className="customTextField"
        name="wrNo"
        label="Rate/Kg"
        fullWidth
        size='small'
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              &#8377;
            </InputAdornment>
          ),
        }}
      />
      </Grid>
      <Grid item xs={2.4} >
      
        <TextField
          className="customTextField"
          name="wrNo"
          label='Delievery Trip'
          fullWidth
          variant="outlined"
          size='small'
        
        />
      </Grid>
     <Grid item xs={2.4} >
      
        <TextField
          className="customTextField"
          name="wrNo"
          label='Delievery Charges'
          fullWidth
          variant="outlined"
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                &#8377;
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={2.4} >
      
      <TextField
        className="customTextField"
        name="wrNo"
        label='Collection Trip'
        fullWidth
        variant="outlined"
        size='small'
      
      />
    </Grid>
      <Grid item xs={2.4}>
      <TextField
          className="customTextField"
          name="wrNo"
          label="Collection Charges"
          fullWidth
          size='small'
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                &#8377;
              </InputAdornment>
            ),
          }}
      />
      </Grid>
      
      <Grid item xs={2.4}>
        <TextField
          className="customTextField"
          name="wrNo"
          label="PO Number"
          fullWidth
          size='small'
          variant="outlined"
        // error={formik.errors.wrNo && formik.touched.wrNo}
        // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
        // onBlur={formik.handleBlur}
        // onChange={formik.handleChange}
        // value={formik.values.wrNo}
        />
      </Grid>
      </Grid>

      <br />
      <Divider sx={{ backgroundColor: "black" }} />
      <br />

      <Grid container alignItems="center" item xs={12}>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={manuallyEnter}
                onChange={handleCheckboxChange(setManuallyEnter)}
              />
            }
            label="Manually Enter Bill Name "
            labelPlacement="start" // Positions the label on the left side of the checkbox
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox checked={tax} onChange={handleCheckboxChange(setTax)} />
            }
            label="Tax "
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={load909}
                onChange={handleCheckboxChange(setLoad909)}
              />
            }
            label="909 Load "
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={load407}
                onChange={handleCheckboxChange(setLoad407)}
              />
            }
            label="407 Load "
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={loadLCV}
                onChange={handleCheckboxChange(setLoadLCV)}
              />
            }
            label="LCV Load "
            labelPlacement="start"
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center" item xs={12}>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={loadft}
                onChange={handleCheckboxChange(setLoadFT)}
              />
            }
            label="FT Load "
            labelPlacement="start" // Positions the label on the left side of the checkbox
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={load1109}
                onChange={handleCheckboxChange(setLoad1109)}
              />
            }
            label="1109 Load "
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={mathadi}
                onChange={handleCheckboxChange(setMathadi)}
              />
            }
            label="Mathadi "
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={loadingcharges}
                onChange={handleCheckboxChange(setLoadingCharges)}
              />
            }
            label="Loading Charges "
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={unloadingcharges}
                onChange={handleCheckboxChange(setUnloadingCharges)}
              />
            }
            label="Unloading Charges "
            labelPlacement="start"
          />
        </Grid>
      </Grid>

      <br />
      <Divider sx={{ backgroundColor: "black" }} />
      <br />

      <Paper elevation={3} sx={{ backgroundColor: "#f5f5f5" }}>
        <Grid container>
          <Grid item xs={6} md={2} sx={{ marginTop: 1 }}>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: "1.5rem",
                marginBottom: 2,
                marginLeft: 2,
              }}
            >
              LR Details
            </Typography>
          </Grid>

          <Grid item xs={6} md={2} sx={{ float: "center" }}></Grid>
          <Grid item xs={6} md={2} sx={{ float: "center" }}></Grid>
          <Grid item xs={6} md={3.7} sx={{ float: "center" }}></Grid>
          <Grid item xs={6} md={2} sx={{ marginTop: 1 }}>
            <TextField
              className="customTextField"
              name="wrNo"
              label="Search ..."
              fullWidth
              size="small"
              variant="outlined"
              // error={formik.errors.wrNo && formik.touched.wrNo}
              // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // value={formik.values.wrNo}
            />
          </Grid>
        </Grid>
        <Divider sx={{ backgroundColor: "black" }} />
        <br />
        <br />
        <br />
        <br /> <br />
        <br />
        <br />
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          sx={{ float: "left", marginLeft: 2 }}
        >
          Add
        </Button>
        <br />
        <br />
        <Divider sx={{ backgroundColor: "black" }} />
        <br />
        <DataGrid
          autoHeight
          density="compact"
          rows={rows}
          columns={columns}
          pageSize={5}
        />
        <br />
        <br />
        <br />
      </Paper>
      <br />
      <br />
      <br />
      <Paper elevation={3} sx={{ backgroundColor: "#f5f5f5" }}>
        <Grid container spacing={2} sx={{ margin: "0px auto" }}>
          <Grid item xs={2.8} mt={1} mb={1}>
            <TextField
              className="customTextField"
              name="wrNo"
              label="Total Invoice Weight"
              fullWidth
              variant="outlined"
              size="small"
              // error={formik.errors.wrNo && formik.touched.wrNo}
              // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // value={formik.values.wrNo}
            />
          </Grid>
          <Grid item xs={2.8} mt={1} mb={1}>
            <TextField
              className="customTextField"
              name="wrNo"
              label="LR Freight Charges"
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    &#8377;
                  </InputAdornment>
                ),
              }}
              // error={formik.errors.wrNo && formik.touched.wrNo}
              // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // value={formik.values.wrNo}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0} sx={{ margin: "0px auto" }}>
          <Grid item xs={4.0} mt={1} mb={1}></Grid>
          <Grid item xs={1.5} mt={5} mb={2}>
            <Button variant="contained" sx={{ backgroundColor: "#18c5a9" }}>
              Save
            </Button>
          </Grid>

          <Grid item xs={1.5} mt={5} mb={2}>
            <Button variant="contained" sx={{ backgroundColor: "#D92445" }}>
              cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default AddRegularBill;
