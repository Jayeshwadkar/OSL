import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Divider,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { SelectBranch } from "../../../lib/api-branch";
import dayjs from "dayjs";
import { Selectvehicle, Selectvehicleowner } from "../../../lib/api-vehicle";
import { SelectCustomers } from "../../../lib/api-customer";
import { getTransportbillreport } from "../../../lib/api-reports";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import * as XLSX from "xlsx";
const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: "#004aad",
    color: "white",
    padding: 5,
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

function TransporterBillReporttally() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [rows, setRows] = useState([]);
  const [toDate, setToDate] = useState(dayjs());
  const [initialLoad, setInitialLoad] = useState(false);

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
      console.log(response);
      setVehicleOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch customer options:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleOwners = async () => {
    setLoading(true);
    try {
        const response = await Selectvehicleowner();
        console.log(response);
        
        // Extract only the vod_id and vehical_owner_name from the response
        const filteredData = response.data.map(owner => ({
            id: owner.vod_id,
            vehical_owner_name: owner.vehical_owner_name
        }));
        
        setCustomerOptions(filteredData);
    } catch (error) {
        console.error("Failed to fetch customer options:", error);
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    fetchBranches();
    fetchvehicle();
    fetchVehicleOwners();
  }, []);


  const fetchDataWithPagination = async () => {
    setLoading(true);
    try {
      const response = await getTransportbillreport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedVehicle ? selectedVehicle.vehicle_id : "",
        selectedCustomer ? selectedCustomer.id : "",
        paginationModel.page,
        paginationModel.pageSize
      );
      const misReport = response.data.TransportBillReport;
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
      const response = await getTransportbillreport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedVehicle ? selectedVehicle.vehicle_id : "",
        selectedCustomer ? selectedCustomer.id : "",
      );
      const Report = response.data.TransportBillReport;
   
      const formattedData = Report.map(item => ({
        srNo: item.srNo ?? "",
        bill_no: item.billno ?? "",
        oslbilldate: item.oslbilldate ?? "",
        trbill_no: item.trbillno ?? "",
        Transporter_name: item.vehical_owner_name ?? "",
        vehicle_no: item.vehicleno ?? "",
        vehicle_type: item.vehicletype ?? "",
        telephone_no: item.telephoneno ?? "",
        address: item.address ?? "",
        memo_no: item.memo_no ?? "",
        from_loc: item.from_loc ?? "",
        to_loc: item.to_loc ?? "",
        total_freight: item.total_freight ?? "",
        advance_amount: item.advance_amount ?? "",
        balance_amount: item.balance_amount ?? "",
        total: item.total ?? "",
        cgst: item.cgst ?? "",
        sgst: item.sgst ?? "",
        igst: item.igst ?? "",
        bank: item.bank ?? "",
        account_name: item.accountname ?? "",
        account_number: item.accountnumber ?? "",
        ifsc_code: item.ifsccode ?? "",
        check_no: item.checkno ?? "",
        date: item.date ?? "",
        actual_freight: item.actual_freight ?? "",
        deduction: item.deduction ?? "",
        add_amt: item.add_amt ?? "",
        remark: item.remark ?? "",
        tds: item.tds ?? "",
        oslbill_date: item.oslbilldate ?? "",
        amount_with_gst: item.amountwithgst ?? "",
        subtotal: item.subtotal ?? "",
        tds_val: item.tdsval ?? "",
        city: item.city ?? "",
        vendor_gst_no: item.vendorgstno ?? "",
        hsn_code: item.HSNcode ?? "",
        memo_date: item.memo_date ?? "",
      }));
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
      const fileName = `Transport_Bill_Report_export_${formattedDate}_${formattedTime}.xlsx`;
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
        Transport Bill (Tally)
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
              getOptionLabel={(option) => option.vehical_owner_name}
              onChange={(event, newValue) => setSelectedCustomer(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Transporter"
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
              options={[]}
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
              <TableCell className={classes.blueHeader}>OSL Bill No</TableCell>
              <TableCell className={classes.blueHeader}>OSL Bill Date</TableCell>
              <TableCell className={classes.blueHeader}>Transporter Bill No</TableCell>
              <TableCell className={classes.blueHeader}>Transporter Name</TableCell>
              <TableCell className={classes.blueHeader}>Vehicle No</TableCell>
              <TableCell className={classes.blueHeader}>Vehicle Type</TableCell>
              <TableCell className={classes.blueHeader}>Contact No</TableCell>
              <TableCell className={classes.blueHeader}>Address</TableCell>
              <TableCell className={classes.blueHeader}>Memo No</TableCell>
              <TableCell className={classes.blueHeader}>FM From</TableCell>
              <TableCell className={classes.blueHeader}>FM To</TableCell>
              <TableCell className={classes.blueHeader}>
             Total Freight
              </TableCell>
              <TableCell className={classes.blueHeader}>
              Actual Freight
              </TableCell>
              <TableCell className={classes.blueHeader}>Advance</TableCell>
              <TableCell className={classes.blueHeader}>Balance</TableCell>
              <TableCell className={classes.blueHeader}>Pay Amount</TableCell>
              <TableCell className={classes.blueHeader}>Add Amount</TableCell>
              <TableCell className={classes.blueHeader}>Deduction Amount:</TableCell>
              <TableCell className={classes.blueHeader}>
          CGST %
              </TableCell>
              <TableCell className={classes.blueHeader}>SGST %</TableCell>
              <TableCell className={classes.blueHeader}>IGST %</TableCell>
              <TableCell className={classes.blueHeader}>Total Pay Amount</TableCell>
              <TableCell className={classes.blueHeader}>Bank Name</TableCell>
              <TableCell className={classes.blueHeader}>Account Number</TableCell>
              <TableCell className={classes.blueHeader}>IFSC Code</TableCell>
              <TableCell className={classes.blueHeader}>Cheque No/UTR No/Cash</TableCell>
              <TableCell className={classes.blueHeader}>Date</TableCell>
              <TableCell className={classes.blueHeader}>Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
              <TableCell className={classes.tableCell}>{row.srNo || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.billno || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.oslbilldate || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.trbillno || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.vehical_owner_name || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.vehicleno || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.vehicletype || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.telephoneno || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.address || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.memo_no || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.from_loc || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.to_loc || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.total_freight || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.actual_freight || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.advance_amount || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.balance_amount || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.total || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.add_amt || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.deduction || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.cgst || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.sgst || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.igst || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.totalpay || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.bank || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.accountnumber || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.ifsccode || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.checkno || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.date || ""}</TableCell>
              <TableCell className={classes.tableCell}>{row.remark || ""}</TableCell>
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

export default TransporterBillReporttally;

