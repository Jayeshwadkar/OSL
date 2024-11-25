import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { SelectBranch } from "../../../../lib/api-branch";
import { SelectCustomers } from "../../../../lib/api-customer";
import { Selectvehicle } from "../../../../lib/api-vehicle";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: "#004aad",
    color: "white",
  },
});

const fixedHeight = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100px", // Adjust the height as needed
};

function LineFreightReport() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [toDate, setToDate] = useState(dayjs());
  // const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [pageState, setPageState] = useState(0);
  const [initialLoad, setInitialLoad] = useState(false);
  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await SelectBranch();
      const { data } = response;
      const branchList = data.map((branch) => ({
        branch_id: branch.branch_id,
        branch_name: branch.branch_name,
      }));
      setBranchOptions(branchList);
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await SelectCustomers();
      setCustomerOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch customer options:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchvehicle = async () => {
    setLoading(true);
    try {
      const response = await Selectvehicle();
      setVehicleOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch customer options:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBranches();
    fetchCustomers();
    fetchvehicle();
  }, []);
  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "memoNo",
      headerName: "POD No",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "memoDate",
      headerName: "POD Uploading Date",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "dcNo",
      headerName: "Branch",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "dcDate",
      headerName: "Upload Status",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
  ];

  const rows = [
    {
      id: 1,
      srNo: 1,
      memoNo: "12345",
      memoDate: "2023-01-01",
      dcNo: "67890",
      dcDate: "2023-01-02",
      memoFrom: "Location A",
      memoTo: "Location B",
      memoStatus: "Delivered",
      oslBillNo: "11111",
      oslBillDate: "2023-01-03",
      transporterBillNo: "22222",
      transporterBillDate: "2023-01-04",
      transporterName: "Transporter XYZ",
      lrNo: "33333",
      lrDate: "2023-01-05",
      consignor: "Consignor ABC",
      from: "City A",
      invNo: "44444",
      invDate: "2023-01-06",
      articles: "Goods",
      noOfArticles: 10,
      quantity: 100,
      consignorPartNo: "55555",
      consignorDescription: "Part Description",
      consignee: "Consignee DEF",
      to: "City B",
      consigneePartNo: "66666",
      weight: 500,
      transMode: "Road",
      vehicleNo: "MH12AB1234",
      driverName: "Driver XYZ",
      mobileNo: "9876543210",
      licenceNo: "LIC12345",
      deliveryType: "Standard",
      totalPkgs: 10,
      totalWeight: 500,
      totalFreight: 1000,
      advanceAmount: 500,
      balanceAmount: 500,
      vehiclePass: "VP123",
      parkingCharges: 100,
      diesel: 50,
      otherCharges: 20,
      deliveryCharges: 30,
      mathadi: 10,
      seal: "Seal123",
      advRefName: "Adv123",
      remark: "No remarks",
    },
  ];
  return (
    <>
      {loading && <LoadingSpinner />}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        marginBottom={2}
      >
        <Grid item>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "1.75rem",
              marginBottom: 2,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Pending Upload Reports
          </Typography>
        </Grid>
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

      <Grid marginBottom={2}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Grid item xs={2.2}>
            <Box style={fixedHeight}>
              <FormControl fullWidth size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="From"
                    format="MM-DD-YYYY"
                    label="From"
                    value={fromDate}
                    onChange={(date) => setFromDate(date)}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={2.2}>
            <Box style={fixedHeight}>
              <FormControl fullWidth size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="To"
                    format="MM-DD-YYYY"
                    label="To"
                    value={toDate}
                    onChange={(date) => setToDate(date)}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={2.2}>
            <Autocomplete
              options={branchOptions}
              getOptionLabel={(option) => option.branch_name || ""}
              onChange={(event, newValue) => setSelectedBranch(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Branch"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="branch"
                />
              )}
            />
          </Grid>

          <Grid item xs={2.2}>
            <Autocomplete
              id="consignor-autocomplete"
              options={customerOptions}
              getOptionLabel={(option) => option.customer_name}
              onChange={(event, newValue) => setSelectedCustomer(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Customer"
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={2.2}>
            <Autocomplete
              id="consignor-autocomplete"
              options={vehicleOptions}
              getOptionLabel={(option) => option.vehicle_number}
              onChange={(event, newValue) => setSelectedVehicle(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Vehicle"
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "royalblue", borderRadius: "50px" }}
            >
              Search and Export
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

      <Box sx={{ height: 790, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </>
  );
}

export default LineFreightReport;
