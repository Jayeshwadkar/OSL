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
import { SelectCustomers } from "../../../lib/api-customer";
import { Selectvehicle } from "../../../lib/api-vehicle";
import { SelectBranch } from "../../../lib/api-branch";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import dayjs from "dayjs";
import { getunlodingreport } from "../../../lib/api-reports";
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

const memoOptions = [
  { id: 1, title: 'Select Memo Type' },
  { id: 2, title: 'Collection' },
  { id: 3, title: 'Line' },
  { id: 4, title: 'Customer End' },
  { id: 5, title: 'Touching' },
  { id: 6, title: 'FTL(Direct Delivery)' },
];

function Unloading_Report() {
  const classes = useStyles();
  const [branchOptions, setBranchOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState(dayjs());
  const [rows, setRows] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState(null);
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
    fetchvehicle();
  }, []);


  const fetchDataWithPagination = async () => {
    setLoading(true);
    try {
      const response = await getunlodingreport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedVehicle ? selectedVehicle.vehicle_id : "",
        selectedCustomer ? selectedCustomer.customer_id : "",
        selectedMemo ? selectedMemo.id : "",
        paginationModel.page,
        paginationModel.pageSize
      );
      const misReport = response.data.unlodingreport;
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
      const response = await getunlodingreport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedVehicle ? selectedVehicle.vehicle_id : "",
      );
      console.log(response)
      const Report = response.data.unlodingreport;
      const formattedData = Report.map((item) => {
        return {
          "Sr No": item.srNo == "undefined" || item.srNo == null ? "" : item.srNo ?? "",
          "Memo No": item.memo_no == "undefined" || item.memo_no == null ? "" : item.memo_no ?? "",
          "Memo Date": item.memo_date == "undefined" || item.memo_date == null ? "" : item.memo_date ?? "",
          "DC No": item.dc_no == "undefined" || item.dc_no == null ? "" : item.dc_no ?? "",
          "DC Date": item.dc_date == "undefined" || item.dc_date == null ? "" : item.dc_date ?? "",
          "Memo From": item.from_loc == "undefined" || item.from_loc == null ? "" : item.from_loc ?? "",
          "Memo To": item.to_loc == "undefined" || item.to_loc == null ? "" : item.to_loc ?? "",
          "Memo Status": item.memo_status == "undefined" || item.memo_status == null ? "" : item.memo_status ?? "",
          "OSL Bill No": item.billno == "undefined" || item.billno == null ? "" : item.billno ?? "",
          "OSL Bill Date": item.billdate == "undefined" || item.billdate == null ? "" : item.billdate ?? "",
          "Transporter Bill No": item.trbillno == "undefined" || item.trbillno == null ? "" : item.trbillno ?? "",
          "Transporter Bill Date": item.date == "undefined" || item.date == null ? "" : item.date ?? "",
          "Transporter Name": item.transporterName == "undefined" || item.transporterName == null ? "" : item.transporterName ?? "",
          "LR No": item.lr_no == "undefined" || item.lr_no == null ? "" : item.lr_no ?? "",
          "LR Date": item.lr_date == "undefined" || item.lr_date == null ? "" : item.lr_date ?? "",
          "Consignor": item.consigner == "undefined" || item.consigner == null ? "" : item.consigner ?? "",
          "From": item.lrfrom == "undefined" || item.lrfrom == null ? "" : item.lrfrom ?? "",
          "Inv No": item.inv_no == "undefined" || item.inv_no == null ? "" : item.inv_no ?? "",
          "Inv Date": item.inv_date == "undefined" || item.inv_date == null ? "" : item.inv_date ?? "",
          "Articles": item.articles == "undefined" || item.articles == null ? "" : item.articles ?? "",
          "No of Articles": item.no_of_articles == "undefined" || item.no_of_articles == null ? "" : item.no_of_articles ?? "",
          "Quantity": item.quantity == "undefined" || item.quantity == null ? "" : item.quantity ?? "",
          "Consignor Part No": item.cnpartno == "undefined" || item.cnpartno == null ? "" : item.cnpartno ?? "",
          "Consignor Description": item.description == "undefined" || item.description == null ? "" : item.description ?? "",
          "Consignee": item.consignee == "undefined" || item.consignee == null ? "" : item.consignee ?? "",
          "To": item.to_loc == "undefined" || item.to_loc == null ? "" : item.to_loc ?? "",
          "Consignee Part No": item.partno == "undefined" || item.partno == null ? "" : item.partno ?? "",
          "Trans Mode": item.transport_mode == "undefined" || item.transport_mode == null ? "" : item.transport_mode ?? "",
          "Vehicle No": item.vehicle_number == "undefined" || item.vehicle_number == null ? "" : item.vehicle_number ?? "",
          "Driver Name": item.driver_name == "undefined" || item.driver_name == null ? "" : item.driver_name ?? "",
          "Mobile No": item.mobile_no == "undefined" || item.mobile_no == null ? "" : item.mobile_no ?? "",
          "Licence No": item.license_name == "undefined" || item.license_name == null ? "" : item.license_name ?? "",
          "Delivery Type": item.delivery_type == "undefined" || item.delivery_type == null ? "" : item.delivery_type ?? "",
          "Total Pkgs": item.total_packages == "undefined" || item.total_packages == null ? "" : item.total_packages ?? "",
          "Total Weight": item.total_weight == "undefined" || item.total_weight == null ? "" : item.total_weight ?? "",
          "Total Freight": item.total_freight == "undefined" || item.total_freight == null ? "" : item.total_freight ?? "",
          "Advance Amount": item.advance_amount == "undefined" || item.advance_amount == null ? "" : item.advance_amount ?? "",
          "Balance Amount": item.balance_amount == "undefined" || item.balance_amount == null ? "" : item.balance_amount ?? "",
          "Vehicle Pass": item.vehicle_pass == "undefined" || item.vehicle_pass == null ? "" : item.vehicle_pass ?? "",
          "Parking Charges": item.parking_charges == "undefined" || item.parking_charges == null ? "" : item.parking_charges ?? "",
          "Diesel": item.diesel == "undefined" || item.diesel == null ? "" : item.diesel ?? "",
          "Other Charges": item.other_charges == "undefined" || item.other_charges == null ? "" : item.other_charges ?? "",
          "Delivery Charges": item.delivery_charges == "undefined" || item.delivery_charges == null ? "" : item.delivery_charges ?? "",
          "Mathadi": item.mathadi == "undefined" || item.mathadi == null ? "" : item.mathadi ?? "",
          "Seal": item.seal == "undefined" || item.seal == null ? "" : item.seal ?? "",
          "Adv Ref Name": item.advance_ref == "undefined" || item.advance_ref == null ? "" : item.advance_ref ?? "",
          "Remark": item.remarks == "undefined" || item.remarks == null ? "" : item.remarks ?? "",
         
    
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
      const fileName = `Vehicle_Hire_Report_export_${formattedDate}_${formattedTime}.xlsx`;
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
    Vehicle Hire Report 
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

          <Grid item xs={2.2}>
          <Autocomplete
      options={memoOptions}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.title}
        </li>
      )}
      onChange={(event, newValue) => setSelectedMemo(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Memo Type"
          variant="outlined"
          fullWidth
          size="small"
          name="assignedCrew"
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
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell className={classes.blueHeader}>Sr No</TableCell>
        <TableCell className={classes.blueHeader}>Memo No</TableCell>
        <TableCell className={classes.blueHeader}>Memo Date</TableCell>
        <TableCell className={classes.blueHeader}>DC No</TableCell>
        <TableCell className={classes.blueHeader}>DC Date</TableCell>
        <TableCell className={classes.blueHeader}>Memo From</TableCell>
        <TableCell className={classes.blueHeader}>Memo To</TableCell>
        <TableCell className={classes.blueHeader}>Memo Status</TableCell>
        <TableCell className={classes.blueHeader}>OSL Bill No</TableCell>
        <TableCell className={classes.blueHeader}>OSL Bill Date</TableCell>
        <TableCell className={classes.blueHeader}>Transporter Bill No</TableCell>
        <TableCell className={classes.blueHeader}>Transporter Bill Date</TableCell>
        <TableCell className={classes.blueHeader}>Transporter Name</TableCell>
        <TableCell className={classes.blueHeader}>LR No</TableCell>
        <TableCell className={classes.blueHeader}>LR Date</TableCell>
        <TableCell className={classes.blueHeader}>Consignor</TableCell>
        <TableCell className={classes.blueHeader}>From</TableCell>
        <TableCell className={classes.blueHeader}>Inv No</TableCell>
        <TableCell className={classes.blueHeader}>Inv Date</TableCell>
        <TableCell className={classes.blueHeader}>Articles</TableCell>
        <TableCell className={classes.blueHeader}>No of Articles</TableCell>
        <TableCell className={classes.blueHeader}>Quantity</TableCell>
        <TableCell className={classes.blueHeader}>Consignor Part No</TableCell>
        <TableCell className={classes.blueHeader}>Consignor Description</TableCell>
        <TableCell className={classes.blueHeader}>Consignee</TableCell>
        <TableCell className={classes.blueHeader}>To</TableCell>
        <TableCell className={classes.blueHeader}>Consignee Part No</TableCell>
        <TableCell className={classes.blueHeader}>Trans Mode</TableCell>
        <TableCell className={classes.blueHeader}>Vehicle No</TableCell>
        <TableCell className={classes.blueHeader}>Driver Name</TableCell>
        <TableCell className={classes.blueHeader}>Mobile No</TableCell>
        <TableCell className={classes.blueHeader}>Licence No</TableCell>
        <TableCell className={classes.blueHeader}>Delivery Type</TableCell>
        <TableCell className={classes.blueHeader}>Total Pkgs</TableCell>
        <TableCell className={classes.blueHeader}>Total Weight</TableCell>
        <TableCell className={classes.blueHeader}>Total Freight</TableCell>
        <TableCell className={classes.blueHeader}>Advance Amount</TableCell>
        <TableCell className={classes.blueHeader}>Balance Amount</TableCell>
        <TableCell className={classes.blueHeader}>Vehicle Pass</TableCell>
        <TableCell className={classes.blueHeader}>Parking Charges</TableCell>
        <TableCell className={classes.blueHeader}>Diesel</TableCell>
        <TableCell className={classes.blueHeader}>Other Cahrges</TableCell>
        <TableCell className={classes.blueHeader}>Delivery Charges</TableCell>
        <TableCell className={classes.blueHeader}>Mathadi</TableCell>
        <TableCell className={classes.blueHeader}>Seal</TableCell>
        <TableCell className={classes.blueHeader}>Adv Ref Name</TableCell>
        <TableCell className={classes.blueHeader}>Remark</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>

          <TableCell className={classes.tableCell}>{ row.srNo == "undefined" || row.srNo == null ? "" : row.srNo ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.memo_no == "undefined" || row.memo_no == null ? "" : row.memo_no ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.memo_date == "undefined" || row.memo_date == null ? "" : row.memo_date ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.dc_no == "undefined" || row.dc_no == null ? "" : row.dc_no ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.dc_date == "undefined" || row.dc_date == null ? "" : row.dc_date ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.from_loc == "undefined" || row.from_loc == null ? "" : row.from_loc ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.to_loc == "undefined" || row.to_loc == null ? "" : row.to_loc ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.memo_status == "undefined" || row.memo_status == null ? "" : row.memo_status ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.billno == "undefined" || row.billno == null ? "" : row.billno ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.billdate == "undefined" || row.billdate == null ? "" : row.billdate ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.trbillno == "undefined" || row.trbillno == null ? "" : row.trbillno ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.date == "undefined" || row.date == null ? "" : row.date ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.transporterName == "undefined" || row.transporterName == null ? "" : row.transporterName ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.lr_no == "undefined" || row.lr_no == null ? "" : row.lr_no ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.lr_date == "undefined" || row.lr_date == null ? "" : row.lr_date ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.consigner == "undefined" || row.consigner == null ? "" : row.consigner ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.lrfrom == "undefined" || row.lrfrom == null ? "" : row.lrfrom ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.inv_no == "undefined" || row.inv_no == null ? "" : row.inv_no ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.inv_date == "undefined" || row.inv_date == null ? "" : row.inv_date ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.articles == "undefined" || row.articles == null ? "" : row.articles ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.no_of_articles == "undefined" || row.no_of_articles == null ? "" : row.no_of_articles ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.quantity == "undefined" || row.quantity == null ? "" : row.quantity ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.cnpartno == "undefined" || row.cnpartno == null ? "" : row.cnpartno ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.description == "undefined" || row.description == null ? "" : row.description ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.consignee == "undefined" || row.consignee == null ? "" : row.consignee ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.to_loc == "undefined" || row.to_loc == null ? "" : row.to_loc ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.partno == "undefined" || row.partno == null ? "" : row.partno ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.transport_mode == "undefined" || row.transport_mode == null ? "" : row.transport_mode ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.vehicle_number == "undefined" || row.vehicle_number == null ? "" : row.vehicle_number ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.driver_name == "undefined" || row.driver_name == null ? "" : row.driver_name ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.mobile_no == "undefined" || row.mobile_no == null ? "" : row.mobile_no ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.license_name == "undefined" || row.license_name == null ? "" : row.license_name ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.delivery_type == "undefined" || row.delivery_type == null ? "" : row.delivery_type ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.total_packages == "undefined" || row.total_packages == null ? "" : row.total_packages ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.total_weight == "undefined" || row.total_weight == null ? "" : row.total_weight ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.total_freight == "undefined" || row.total_freight == null ? "" : row.total_freight ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.advance_amount == "undefined" || row.advance_amount == null ? "" : row.advance_amount ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.balance_amount == "undefined" || row.balance_amount == null ? "" : row.balance_amount ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.vehicle_pass == "undefined" || row.vehicle_pass == null ? "" : row.vehicle_pass ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.parking_charges == "undefined" || row.parking_charges == null ? "" : row.parking_charges ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.diesel == "undefined" || row.diesel == null ? "" : row.diesel ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.other_charges == "undefined" || row.other_charges == null ? "" : row.other_charges ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.delivery_charges == "undefined" || row.delivery_charges == null ? "" : row.delivery_charges ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.mathadi == "undefined" || row.mathadi == null ? "" : row.mathadi ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.seal == "undefined" || row.seal == null ? "" : row.seal ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.advance_ref == "undefined" || row.advance_ref == null ? "" : row.advance_ref ?? ""}</TableCell>
          <TableCell className={classes.tableCell}>{ row.remarks == "undefined" || row.remarks == null ? "" : row.remarks ?? ""}</TableCell>
 
  
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

export default Unloading_Report;
