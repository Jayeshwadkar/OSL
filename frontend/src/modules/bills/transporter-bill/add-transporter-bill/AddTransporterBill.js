import {Autocomplete,Box,Button,Checkbox,Container,Divider,FormControl,Grid,IconButton,InputAdornment,TextField,Tooltip,Typography,} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { makeStyles, styled } from '@mui/styles';
import PrintIcon from '@mui/icons-material/Print';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});
function AddTransporterBill() {
  const formContainerStyle = {
    width: "100%", // Make sure the container takes full width
    margin: 0, // Remove any default margin
  };
  const classes = useStyles();

  const columns1 = [
    { field: "sn", headerName: "SN", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "memoNo", headerName: "Memo No", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "fmFrom", headerName: "FM From", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "fmTo", headerName: "FM To", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "totalFreight", headerName: "Total Freight", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "actualFreight", headerName: "Actual Freight", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "cgst", headerName: "CGST 0%", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "sgst", headerName: "SGST 0%", flex: 1,headerClassName: classes.blueHeader },
    { field: "igst", headerName: "IGST 0%", flex: 1,headerClassName: classes.blueHeader },
    { field: "tds", headerName: "TDS %", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "subTotal", headerName: "Sub Total", flex: 1,headerClassName: classes.blueHeader },
    { field: "advance", headerName: "Advance", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "balance", headerName: "Balance", flex: 1,headerClassName: classes.blueHeader },
  ];

  const rows1 = [
    {
      id: 1,
      sn: "",
      memoNo: "",
      fmFrom: "",
      fmTo: "",
      totalFreight: "",
      actualFreight: "",
      cgst: 0,
      sgst: 0,
      igst: 0,
      tds: 0,
      subTotal: 0,
      advance: 0,
      balance: 0,
    },
  ];

  const ActionsCell = ({ id }) => {
    const handleEditClick = () => {
      console.log("Edit button clicked for row with ID:", id);
    };
    const handleViewClick = () => {
      console.log("View button clicked for row with ID:", id);
    };
    const handlePrintClick = () => {
      console.log("Print button clicked for row with ID:", id);
    };
    const handleBlockClick = () => {
      console.log("Block button clicked for row with ID:", id);
    };

    return (
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
        <Tooltip title="Edit">
          <IconButton style={{ color: 'black' }} onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View">
          <IconButton style={{ color: 'black' }} onClick={handleViewClick}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton style={{ color: 'black' }} onClick={handlePrintClick}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Block">
          <IconButton style={{ color: 'black' }} onClick={handleBlockClick}>
            <BlockIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton style={{ color: 'black' }} onClick={handleBlockClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const columns = [
    { field: "sn", headerName: "SN", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "Vehicle  No		", headerName: "Vehicle No		", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "Vehicle Type", headerName: "Vehicle Type", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "Contact No", headerName: "Contact No", flex: 1 ,headerClassName: classes.blueHeader},
    { field: "Address", headerName: "Address", flex: 1 ,headerClassName: classes.blueHeader},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250, // Increased width to accommodate buttons
      renderCell: (params) => <ActionsCell id={params.id} />, headerClassName: classes.blueHeader
    },
  ];

  const rows = [];
  const fixedHeight = {
    height: "40%",
  };

  const ResizableTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      resize: 'both',
      overflow: 'auto',
    },
  });
  return (
    <>
      <Grid container>
        <Grid item xs={6} md={2}>
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
                size="small"
                name="assignedCrew"
                //error={formik.errors.assignedCrew && formik.touched.assignedCrew}
                //helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
                //onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} md={2} sx={{ float: "center" }}></Grid>
        <Grid item xs={6} md={2} ml={16} sx={{ float: "center" }}>
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: "1.75rem",
              marginBottom: 2,
              marginLeft: 2,
            }}
          >
            Transporter Bill
          </Typography>
        </Grid>
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

<Grid container spacing={1} sx={{ marginTop: "2px", marginBottom: "2%" }}>
  <Grid item xs={3}>
    <TextField
      className="customTextField"
      name="OSL Bill No"
      label="OSL Bill No"
      fullWidth
      variant="outlined"
      size="small"
    />
  </Grid>

  <Grid item xs={3}>
    <TextField
      className="customTextField"
      name="OSL Bill Date"
      label="OSL Bill Date"
      fullWidth
      variant="outlined"
      size="small"
    />
  </Grid>

  <Grid item xs={3}>
    <TextField
      className="customTextField"
      name="Transporter Bill No"
      label="Transporter Bill No"
      fullWidth
      variant="outlined"
      size="small"
    />
  </Grid>

  <Grid item xs={3}>
    <Box style={fixedHeight}>
      <FormControl fullWidth size="small">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="Transporter Bill date"
            format="MM-DD-YYYY"
            label="Transporter Bill date"
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  </Grid>

  <Grid item xs={3}>
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Transporter"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
        />
      )}
    />
  </Grid>

  <Grid item xs={3}>
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Transporter"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
        />
      )}
    />
  </Grid>

  <Grid item xs={3}>
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Transporter"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
        />
      )}
    />
  </Grid>

  <Grid item xs={3}>
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Transporter"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
        />
      )}
    />
  </Grid>

  <Grid item xs={3}>
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="OSL GST No"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
        />
      )}
    />
  </Grid>

  <Grid item xs={3}>
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="GST State"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
        />
      )}
    />
  </Grid>

  <Grid item xs={3}>
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="GST Tax Name"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
        />
      )}
    />
  </Grid>

  <Grid item xs={3}>
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="TDS Code"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
        />
      )}
    />
  </Grid>
</Grid>




      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

<Grid container justifyContent="center" alignItems="center" >
      <Grid item xs={6} md={2}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "1.75rem",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          Vehicle Details
        </Typography>
      </Grid>
    </Grid>

      <div style={{ height: 200, width: "100%", marginBottom: "2%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="success"
            style={{ padding: "5px 50px" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2%",
        }}
      >
        <Box
          sx={{
            width: "100%", // Full width
            maxWidth: "800px", // Maximum width
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            borderRadius: "8px",
            boxShadow: 3, // Adding a box shadow for better visibility
          }}
        >
          <Typography variant="h4" gutterBottom>
           Vehicle Hire Details
          </Typography>
          <Box display="flex" alignItems="center" mb={2} width="100%">
            <Checkbox />
            <Typography variant="body1">Select All</Typography>
            <Box flexGrow={1} />
            <TextField label="Search..." variant="outlined" size="small" />
          </Box>
          <Button variant="contained" color="success">
            +Add
          </Button>
        </Box>
      </Container>

      {/* <div style={{ height: 200, width: "100%" }}>
        <DataGrid
          rows={rows1}
          columns={columns1}
          pageSize={5}
          checkboxSelection={false}
        />
      </div> */}

<table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th
        colSpan="3"
        style={{
          backgroundColor: '#fff',
          color: '#000',
          padding: '8px',
          textAlign: 'center',
          border: '1px solid #000',
        }}
      >
        State:
      </th>

      <th
        colSpan="2"
        style={{
          backgroundColor: '#fff',
          color: '#000',
          padding: '8px',
          textAlign: 'center',
          border: '1px solid #000',
        }}
      >
        GST Name:
      </th>

      <th
        colSpan="1"
        style={{
          backgroundColor: '#fff',
          color: '#000',
          padding: '8px',
          textAlign: 'center',
          border: '1px solid #000',
        }}
      >
        GST%
      </th>

      <th
        colSpan="3"
        style={{
          backgroundColor: '#fff',
          color: '#000',
          padding: '8px',
          textAlign: 'center',
          border: '1px solid #000',
        }}
      >
        TDS Code
      </th>

      <th
        colSpan="3"
        style={{
          backgroundColor: '#fff',
          color: '#000',
          padding: '8px',
          textAlign: 'center',
          border: '1px solid #000',
        }}
      >
       Status
      </th>

      <th
        colSpan="1"
        style={{
          backgroundColor: '#fff',
          color: '#000',
          padding: '8px',
          textAlign: 'center',
          border: '1px solid #000',
        }}
      >
      TDS%
      </th>
    </tr>
    <tr>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        SN
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        Memo No
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        FM From
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        FM To
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        Total Freight
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        Actual Freight
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        CGST 0%
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        SGST 0%
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        IGST 0%
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        TDS%
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        Sub Total
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        Advance
      </th>
      <th style={{ backgroundColor: '#5f70b1', color: '#fff', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>
        Balance
      </th>
     
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}></td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}></td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}></td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}></td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>0</td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>0</td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>0</td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>0</td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>0</td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>0</td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>0</td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>0</td>
      <td style={{ backgroundColor: '#dae2f3', color: '#000', padding: '8px', textAlign: 'center', border: '1px solid #fff' }}>0</td>
   
    </tr>
  </tbody>
</table>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

      <Grid
        container
        spacing={2}
        style={{
          marginLeft: "0.1%",
          fontSize: "20px",
          fontFamily: "Poppins",
          marginBottom: "1.5%",
        }}
      >
        Freight Details
      </Grid>



      <Grid container spacing={1} sx={{ marginTop: "2px", marginBottom: "2%" }}>
        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="Total Freight"
            label="Total Freight"
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
          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="CGST %"
            label="CGST %"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="SGST %"
            label="SGST %"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="IGST %"
            label="IGST %"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="TDS %"
            label="TDS %"
            fullWidth
            variant="outlined"
            size="small"

          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="Other Deduct."
            label="Other Deduct."
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
          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="GST+GrossAmt"
            label="GST+GrossAmt"
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
          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="Statistical"
            label="Statistical"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="Less Advance"
            label="Less Advance"
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
          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <TextField
            className="customTextField"
            name="Net Pay Amt"
            label="Net Pay Amt"
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
          />
        </Grid>
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

<Grid
        container
        spacing={2}
        style={{
          marginLeft: "0.1%",
          fontSize: "20px",
          fontFamily: "Poppins",
          marginBottom: "1.5%",
        }}
      >
        Transpoter Details
      </Grid>

      <Grid container spacing={2} style={formContainerStyle} marginBottom={2}>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="Transporter Name"
            label="Transporter Name"
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

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="PAN Number"
            label="PAN Number"
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

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="GST Number"
            label="GST Number"
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

        <Grid item xs={2.4}>
  
        </Grid>

        <Grid item xs={2.4}>
  
  </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="Bank Name"
            label="Bank Name"
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

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="Account Number"
            label="Account Number"
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

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="IFSC Code"
            label="IFSC Code"
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

        <Grid item xs={2.4}>
         
        <ResizableTextField
        id="outlined-multiline-flexible"
        label="Bank Address"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
        // error={formik.errors.owner_address && formik.touched.owner_address}
        //     helperText={formik.touched.owner_address ? formik.errors.owner_address : ''}
        //     onBlur={formik.handleBlur}
        //     onChange={formik.handleChange}
        //     value={formik.values.owner_address}
      />
        </Grid>

        <Grid item xs={2.4}>
         
        
         </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="cheque No/UTR No/Cash"
            label="cheque No/UTR No/Cash"
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

        <Grid item xs={2.4} mb={2}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dateResolved"
                  format="MM-DD-YYYY"
                  label="Date "
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

       
      </Grid>

      
      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

<Grid container spacing={1} sx={{ marginTop: "2px", marginBottom: "2%" }}>

<Grid item xs={10}>
<ResizableTextField
        id="outlined-multiline-flexible"
        label="Remarks"
        multiline
        maxRows={4}
        size='small'
        fullWidth
        variant="outlined"
        // error={formik.errors.owner_address && formik.touched.owner_address}
        //     helperText={formik.touched.owner_address ? formik.errors.owner_address : ''}
        //     onBlur={formik.handleBlur}
        //     onChange={formik.handleChange}
        //     value={formik.values.owner_address}
      />
        </Grid>
</Grid>



      <Grid container spacing={0} sx={{ margin: "0px auto" }}>
        <Grid item xs={5} mt={1} mb={1}></Grid>
        <Grid item xs={1.9} mt={5} mb={2}>
          <Button variant="contained" sx={{ backgroundColor: "#18c5a9" }}>
            Save & Original Print
          </Button>
        </Grid>
        
        <Grid item xs={1.2} mt={5} mb={2}>
          <Button variant="contained" sx={{ backgroundColor: "#D92445" }}>
            cancel
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default AddTransporterBill;
