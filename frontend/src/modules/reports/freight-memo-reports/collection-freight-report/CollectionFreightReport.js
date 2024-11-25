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
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { SelectCustomers } from "../../../../lib/api-customer";
import { SelectBranch } from "../../../../lib/api-branch";
import { Selectvehicle } from "../../../../lib/api-vehicle";
import { getUploadReport } from "../../../../lib/api-reports";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import * as XLSX from "xlsx";
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

function CollectionFreightReport() {
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
      console.log(response);
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
      const response = await getUploadReport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedCustomer ? selectedCustomer.customer_id : "",
        paginationModel.page,
        paginationModel.pageSize
      );
      const misReport = response.data.UploadReport;
      setRows(misReport);
      setPageState(response.data.total);
    } catch (error) {
      console.error("Error fetching MIS reports:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const response = await getUploadReport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedCustomer ? selectedCustomer.customer_id : "",
      );
      const Report = response.data.UploadReport;
   
      const formattedData = Report.map((item, index) => {
        return {
          "srNo": item.srNo == "undefined" || item.srNo == null ? "" : item.srNo ?? "",
          "podno": item.podno == "undefined" || item.podno == null ? "" : item.podno ?? "",
          "poddate": item.poddate == "undefined" || item.poddate == null ? "" : item.poddate ?? "",
          "branch_name": item.branch_name == "undefined" || item.branch_name == null ? "" : item.branch_name ?? "",
          "Upload Status": item.Upload_Status == "undefined" || item.Upload_Status == null ? "" : item.Upload_Status ?? "",  
        };
      });
  
      // Create a new workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "MIS Report");
  
      // Generate Excel file and download it
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
  
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-GB").replace(/\//g, "-");
      const formattedTime = now.toLocaleTimeString("en-GB", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(/ /g, ":");
      const fileName = `Upload_Report_export_${formattedDate}_${formattedTime}.xlsx`;
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
  
      // Clean up and revoke object URL
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    } catch (error) {
      console.error("Error fetching MIS reports:", error);
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "podno",
      headerName: "POD No",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "poddate",
      headerName: "POD Uploading Date",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "branch_name",
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
    await fetchAllData();
  };

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
            Upload Reports
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
              <TableCell className={classes.blueHeader}>POD No</TableCell>
              <TableCell className={classes.blueHeader}>POD Uploading Date</TableCell>
              <TableCell className={classes.blueHeader}>Branch</TableCell>
              <TableCell className={classes.blueHeader}>Upload Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className={classes.tableCell}>{row.srNo}</TableCell>
                <TableCell className={classes.tableCell}>{row.podno}</TableCell>
                <TableCell className={classes.tableCell}>{row.poddate}</TableCell>
                <TableCell className={classes.tableCell}>{row.branch_name}</TableCell>
                <TableCell className={classes.tableCell}>{row.Upload_Status}</TableCell>
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

export default CollectionFreightReport;
