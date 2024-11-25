import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { Selectvehicle } from "../../../../lib/api-vehicle";
import { SelectCustomers } from "../../../../lib/api-customer";
import { SelectBranch } from "../../../../lib/api-branch";
import dayjs from "dayjs";
import { getPODReceiptReport } from "../../../../lib/api-reports";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: "#004aad",
    color: "white",
    padding:5
  },  
  tableCell: {
    padding: "5px", // Adjust padding as needed
    fontSize: "0.800rem", // Adjust font size as needed
  },
});

const fixedHeight = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100px", // Adjust the height as needed
};

function CustomerEndFreightReport() {
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
  const [rows, setRows] = useState([]);
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
  const fetchDataWithPagination = async () => {
    setLoading(true);
    try {
      const response = await getPODReceiptReport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedCustomer ? selectedCustomer.customer_id : "",
        paginationModel.page,
        paginationModel.pageSize
      );
      const misReport = response.data.PODReceiptReport;
      setRows(misReport);
      setPageState(response.data.total);
    } catch (error) {
      console.error("Error fetching MIS reports:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (initialLoad) {
      fetchDataWithPagination();
    }
  }, [paginationModel, initialLoad]);

  const handleSearchAndExport = async () => {
    // Set initialLoad to true to allow data fetching
    setInitialLoad(true);
    // Fetch data with pagination
    fetchDataWithPagination();
    // Fetch all data without pagination
    // await fetchAllData();
  };
  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "memoNo",
      headerName: "Consignment No.",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "memoDate",
      headerName: "Consignment Date",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "consigner",
      headerName: "Consignor",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "loc_from",
      headerName: "From",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "consignee",
      headerName: "Consignee",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "loc_to",
      headerName: "To",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "memoStatus",
      headerName: "Delivery Date",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "oslBillNo",
      headerName: "Consignment Status",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "oslBillDate",
      headerName: "Receipt Date",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "transporterBillNo",
      headerName: "Receipt Status",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPaginationModel((prevModel) => ({ ...prevModel, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      pageSize: parseInt(event.target.value, 10),
      page: 0,
    }));
  }


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
            Receipt Reports
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
              onClick={handleSearchAndExport}
            >
              Search and Export
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>
<TableContainer component={Paper}>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell className={classes.blueHeader}>Sr No</TableCell>
        <TableCell className={classes.blueHeader}>Consignment No.</TableCell>
        <TableCell className={classes.blueHeader}>Consignment Date</TableCell>
        <TableCell className={classes.blueHeader}>Consignor</TableCell>
        <TableCell className={classes.blueHeader}>From</TableCell>
        <TableCell className={classes.blueHeader}>Consignee</TableCell>
        <TableCell className={classes.blueHeader}>To</TableCell>
        <TableCell className={classes.blueHeader}>Delivery Date</TableCell>
        <TableCell className={classes.blueHeader}>Consignment Status</TableCell>
        <TableCell className={classes.blueHeader}>Receipt Date</TableCell>
        <TableCell className={classes.blueHeader}>Receipt Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          <TableCell className={classes.tableCell}>{row.srNo}</TableCell>
          <TableCell className={classes.tableCell}>{row.memoNo}</TableCell>
          <TableCell className={classes.tableCell}>{row.memoDate}</TableCell>
          <TableCell className={classes.tableCell}>{row.consigner}</TableCell>
          <TableCell className={classes.tableCell}>{row.loc_from}</TableCell>
          <TableCell className={classes.tableCell}>{row.consignee}</TableCell>
          <TableCell className={classes.tableCell}>{row.loc_to}</TableCell>
          <TableCell className={classes.tableCell}>{row.memoStatus}</TableCell>
          <TableCell className={classes.tableCell}>{row.oslBillNo}</TableCell>
          <TableCell className={classes.tableCell}>{row.oslBillDate}</TableCell>
          <TableCell className={classes.tableCell}>{row.transporterBillNo}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={pageState}
        rowsPerPage={paginationModel.pageSize}
        page={paginationModel.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default CustomerEndFreightReport;
