import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Divider,
  TablePagination,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  TableContainer,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { SelectBranch } from "../../../lib/api-branch";
import { SelectCustomers } from "../../../lib/api-customer";
import dayjs from "dayjs";
import { getstockreport } from "../../../lib/api-reports";
import * as XLSX from "xlsx";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import CustomSnackbar from "../../../components/ui/SnackbarComponent";

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
function StockReport() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState(dayjs());
  const [initialLoad, setInitialLoad] = useState(false);
  const [rows, setRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [pageState, setPageState] = useState(0);

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

  useEffect(() => {
    fetchBranches();
    fetchCustomers();
  }, []);


  const fetchDataWithPagination = async () => {
    setLoading(true);
    try {
      const response = await getstockreport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedCustomer ? selectedCustomer.customer_id : "",
        paginationModel.page,
        paginationModel.pageSize
      );
  
      console.log(response);
      const Report = response.data.stockReport;
      setRows(Report);
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
      const response = await getstockreport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedCustomer ? selectedCustomer.customer_id : "",
      );
  
      const Report = response.data.stockReport;
      if (Report.length === 0) {
        setSnackbarMessage('No data available');
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
   
      const formattedData = Report.map((item, index) => {
        return {
          "Sr No": index + 1,
        
          "LR Number": item.lrNumber == "undefined" || item.lrNumber == null ? "" : item.lrNumber ?? "",
          "LR Date": item.lrDate == "undefined" || item.lrDate == null ? "" : item.lrDate ?? "",
          "Consignor": item.consignor == "undefined" || item.consignor == null ? "" : item.consignor ?? "",
          "Loc_from": item.lrFrom == "undefined" || item.lrFrom == null ? "" : item.lrFrom ?? "",
          "Inv_No": item.invoiceNo == "undefined" || item.invoiceNo == null ? "" : item.invoiceNo ?? "",
          "Inv_Date": item.invoiceDate == "undefined" || item.invoiceDate == null ? "" : item.invoiceDate ?? "",
          "Articles": item.articles == "undefined" || item.articles == null ? "" : item.articles ?? "",
          "No_Of_Articles": item.numberOfArticles == "undefined" || item.numberOfArticles == null ? "" : item.numberOfArticles ?? "",
          "quantity": item.quantity == "undefined" || item.quantity == null ? "" : item.quantity ?? "",
          "Actual_Wt": item.actualWeight == "undefined" || item.actualWeight == null ? "" : item.actualWeight ?? "",
          "Char_Wt": item.chargeWeight == "undefined" || item.chargeWeight == null ? "" : item.chargeWeight ?? "",
          "Consignor_Description": item.description == "undefined" || item.description == null ? "" : item.description ?? "",
          "Consignee": item.consignee == "undefined" || item.consignee == null ? "" : item.consignee ?? "",
          "loc_To": item.lrTo == "undefined" || item.lrTo == null ? "" : item.lrTo ?? "",
          "truck_tempo_number": item.vehicleNo == "undefined" || item.vehicleNo == null ? "" : item.vehicleNo ?? "",
          "DC_No": item.dcNo == "undefined" || item.dcNo == null ? "" : item.dcNo ?? "",
          "DC_Date": item.dcDate == "undefined" || item.dcDate == null ? "" : item.dcDate ?? "",
          "DC_From": item.dcFrom == "undefined" || item.dcFrom == null ? "" : item.dcFrom ?? "",
          "DC_To": item.dcTo == "undefined" || item.dcTo == null ? "" : item.dcTo ?? "",
          "Memo_No": item.memoNo == "undefined" || item.memoNo == null ? "" : item.memoNo ?? "",
          "MemoFrom_loc": item.fmFrom == "undefined" || item.fmFrom == null ? "" : item.fmFrom ?? "",
          "MemoTo_loc": item.fmTo == "undefined" || item.fmTo == null ? "" : item.fmTo ?? "",
          "Vehicle Number": item.dcVehicleNumber == "undefined" || item.dcVehicleNumber == null ? "" : item.dcVehicleNumber ?? "",
          "Delivery Date": item.deliveryDate == "undefined" || item.deliveryDate == null ? "" : item.deliveryDate ?? "",
          "DC_Status": item.lrStatus == "undefined" || item.lrStatus == null ? "" : item.lrStatus ?? "",
          "Inward_Date": item.inwardDate == "undefined" || item.inwardDate == null ? "" : item.inwardDate ?? "",
          "IR Branch": item.irBranch == "undefined" || item.irBranch == null ? "" : item.irBranch ?? "",
          "consignor_part_no": item.cnPartNo == "undefined" || item.cnPartNo == null ? "" : item.cnPartNo ?? "",
          "Eway_No": item.ewayNo == "undefined" || item.ewayNo == null ? "" : item.ewayNo ?? "",
          "Eway_Date": item.ewayDate == "undefined" || item.ewayDate == null ? "" : item.ewayDate ?? "",
          "Eway_Expiry_Date": item.ewayExpDate == "undefined" || item.ewayExpDate == null ? "" : item.ewayExpDate ?? "",
          "consignee_part_no": item.partNo == "undefined" || item.partNo == null ? "" : item.partNo ?? "",
  
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
      const fileName = `Stock_Report_export_${formattedDate}_${formattedTime}.xlsx`;
  
      // Create a link element and trigger download
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
      setSnackbarMessage('Data exported successfully');
      setSnackbarOpen(true);
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
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
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
            Stock Report
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
          <Grid item xs={2.9}>
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

          <Grid item xs={2.9}>
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
          <Grid item xs={3}>
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

          <Grid item xs={2.9}>
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
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: "#33b249", borderRadius: "50px" }}
            >
              Send Email
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

<TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.blueHeader}>Sr. No</TableCell>
              <TableCell className={classes.blueHeader}>LR No</TableCell>
              <TableCell className={classes.blueHeader}>Date</TableCell>
              <TableCell className={classes.blueHeader}>Consignor</TableCell>
              <TableCell className={classes.blueHeader}>From</TableCell>
              <TableCell className={classes.blueHeader}>Inv No</TableCell>
              <TableCell className={classes.blueHeader}>Inv Date</TableCell>
              <TableCell className={classes.blueHeader}>Art.</TableCell>
              <TableCell className={classes.blueHeader}>No Art</TableCell>
              <TableCell className={classes.blueHeader}>Qty</TableCell>
              <TableCell className={classes.blueHeader}>Act.wt</TableCell>
              <TableCell className={classes.blueHeader}>ch.wt</TableCell>
              <TableCell className={classes.blueHeader}>
                Consignor Part No
              </TableCell>
              <TableCell className={classes.blueHeader}>
                Consignor Decription
              </TableCell>
              <TableCell className={classes.blueHeader}>Eway No</TableCell>
              <TableCell className={classes.blueHeader}>Eway Date</TableCell>
              <TableCell className={classes.blueHeader}>Eway Ex Date</TableCell>
              <TableCell className={classes.blueHeader}>Consignee</TableCell>
              <TableCell className={classes.blueHeader}>To</TableCell>
              <TableCell className={classes.blueHeader}>
                Consignee Part No
              </TableCell>
              <TableCell className={classes.blueHeader}>LR Vehc</TableCell>
              <TableCell className={classes.blueHeader}>DC</TableCell>
              <TableCell className={classes.blueHeader}>DCDate</TableCell>
              <TableCell className={classes.blueHeader}>DC From</TableCell>
              <TableCell className={classes.blueHeader}>DC To</TableCell>
              <TableCell className={classes.blueHeader}>Memo</TableCell>
              <TableCell className={classes.blueHeader}>Memo From</TableCell>
              <TableCell className={classes.blueHeader}>Memo To</TableCell>
              <TableCell className={classes.blueHeader}>Vehc</TableCell>
              <TableCell className={classes.blueHeader}>IW Date</TableCell>
              <TableCell className={classes.blueHeader}>IW Branch</TableCell>
              <TableCell className={classes.blueHeader}>Delivey Date</TableCell>
              <TableCell className={classes.blueHeader}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
           
                <TableCell className={classes.tableCell}>{ row.srNo == "undefined" || row.srNo == null ? "" : row.srNo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.lrNumber == "undefined" || row.lrNumber == null ? "" : row.lrNumber ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.lrDate == "undefined" || row.lrDate == null ? "" : row.lrDate ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.consignor == "undefined" || row.consignor == null ? "" : row.consignor ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.lrFrom == "undefined" || row.lrFrom == null ? "" : row.lrFrom ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.invoiceNo == "undefined" || row.invoiceNo == null ? "" : row.invoiceNo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.invoiceDate == "undefined" || row.invoiceDate == null ? "" : row.invoiceDate ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.articles == "undefined" || row.articles == null ? "" : row.articles ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.numberOfArticles == "undefined" || row.numberOfArticles == null ? "" : row.numberOfArticles ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.quantity == "undefined" || row.quantity == null ? "" : row.quantity ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.actualWeight == "undefined" || row.actualWeight == null ? "" : row.actualWeight ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.chargeWeight == "undefined" || row.chargeWeight == null ? "" : row.chargeWeight ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.cnPartNo == "undefined" || row.cnPartNo == null ? "" : row.cnPartNo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.description == "undefined" || row.description == null ? "" : row.description ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.ewayNo == "undefined" || row.ewayNo == null ? "" : row.ewayNo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.ewayDate == "undefined" || row.ewayDate == null ? "" : row.ewayDate ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.ewayExpDate == "undefined" || row.ewayExpDate == null ? "" : row.ewayExpDate ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.consignee == "undefined" || row.consignee == null ? "" : row.consignee ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.lrTo == "undefined" || row.lrTo == null ? "" : row.lrTo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.partNo == "undefined" || row.partNo == null ? "" : row.partNo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.vehicleNo == "undefined" || row.vehicleNo == null ? "" : row.vehicleNo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.dcNo == "undefined" || row.dcNo == null ? "" : row.dcNo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.dcDate == "undefined" || row.dcDate == null ? "" : row.dcDate ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.dcFrom == "undefined" || row.dcFrom == null ? "" : row.dcFrom ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.dcTo == "undefined" || row.dcTo == null ? "" : row.dcTo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.memoNo == "undefined" || row.memoNo == null ? "" : row.memoNo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.fmFrom == "undefined" || row.fmFrom == null ? "" : row.fmFrom ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.fmTo == "undefined" || row.fmTo == null ? "" : row.fmTo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.dcVehicleNumber == "undefined" || row.dcVehicleNumber == null ? "" : row.dcVehicleNumber ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.inwardDate == "undefined" || row.inwardDate == null ? "" : row.inwardDate ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.irBranch == "undefined" || row.deliveryDate == null ? "" : row.deliveryDate ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.deliveryDate == "undefined" || row.irBranch == null ? "" : row.irBranch ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.lrStatus == "undefined" || row.lrStatus == null ? "" : row.lrStatus ?? ""}</TableCell>
        
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
         <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
     
      />
    </>
  );
}

export default StockReport;
