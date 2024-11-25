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
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { SelectBranch } from "../../../../lib/api-branch";
import dayjs from "dayjs";
import { Selectvehicle } from "../../../../lib/api-vehicle";
import { getDeliverchallanReport } from "../../../../lib/api-reports";
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


function DateWiseReportt() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
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
      console.log(response)
      setVehicleOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch customer options:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchvehicle()
  }, []);
  const fetchDataWithPagination = async () => {
    setLoading(true);
    try {
      const response = await getDeliverchallanReport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedVehicle ? selectedVehicle.vehicle_id : "",
        paginationModel.page,
        paginationModel.pageSize
      );
      const misReport = response.data.DeliverchallanReport;
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
      const response = await getDeliverchallanReport(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedVehicle ? selectedVehicle.vehicle_id : "",
      );
      const Report = response.data.DeliverchallanReport;
   
      const formattedData = Report.map((item, index) => {
        return {

          "srNo": item.srNo == "undefined" || item.srNo == null || item.srNo == "null" ? "" : item.srNo ?? "",
          "dc_no": item.dc_no == "undefined" || item.dc_no == null || item.dc_no == "null" ? "" : item.dc_no ?? "",
          "dc_date": item.dc_date == "undefined" || item.dc_date == null || item.dc_date == "null" ? "" : item.dc_date ?? "",
          "LR_No": item.lrNumber == "undefined" || item.lrNumber == null || item.lrNumber == "null" ? "" : item.lrNumber ?? "",
          "LR_Date": item.lr_date == "undefined" || item.lr_date == null || item.lr_date == "null" ? "" : item.lr_date ?? "",
          "Consignor_name": item.consigner == "undefined" || item.consigner == null || item.consigner == "null" ? "" : item.consigner ?? "",
          "from": item.from_loc == "undefined" || item.from_loc == null || item.from_loc == "null" ? "" : item.from_loc ?? "",
          "Invoice_No": item.inv_id == "undefined" || item.inv_id == null || item.inv_id == "null" ? "" : item.inv_id ?? "",
          "Invoice_Date": item.inv_date == "undefined" || item.inv_date == null || item.inv_date == "null" ? "" : item.inv_date ?? "",
          "Invoice_amt": item.inv_amt == "undefined" || item.inv_amt == null || item.inv_amt == "null" ? "" : item.inv_amt ?? "",
          "eway_no": item.eway_no == "undefined" || item.eway_no == null || item.eway_no == "null" ? "" : item.eway_no ?? "",
          "eway_date": item.eway_exp_date == "undefined" || item.eway_exp_date == null || item.eway_exp_date == "null" ? "" : item.eway_exp_date ?? "",
          "eway_ex_date": item.eway_date == "undefined" || item.eway_date == null || item.eway_date == "null" ? "" : item.eway_date ?? "",
          "articles": item.articles == "undefined" || item.articles == null || item.articles == "null" ? "" : item.articles ?? "",
          "quantity": item.quantity == "undefined" || item.quantity == null || item.quantity == "null" ? "" : item.quantity ?? "",
          "no_of_articles": item.no_of_articles == "undefined" || item.no_of_articles == null || item.no_of_articles == "null" ? "" : item.no_of_articles ?? "",
          "consignor_part_no": item.cnpartno == "undefined" || item.cnpartno == null || item.cnpartno == "null" ? "" : item.cnpartno ?? "",
          "Consignor_description": item.description == "undefined" || item.description == null || item.description == "null" ? "" : item.description ?? "",
          "consignee_name": item.consignee == "undefined" || item.consignee == null || item.consignee == "null" ? "" : item.consignee ?? "",
          "to": item.to_loc == "undefined" || item.to_loc == null || item.to_loc == "null" ? "" : item.to_loc ?? "",
          "part": item.partno == "undefined" || item.partno == null || item.partno == "null" ? "" : item.partno ?? "",
          "total_packages": item.total_packages == "undefined" || item.total_packages == null || item.total_packages == "null" ? "" : item.total_packages ?? "",
          "total_weight": item.total_weight == "undefined" || item.total_weight == null || item.total_weight == "null" ? "" : item.total_weight ?? "",
          "transport_mode": item.transport_mode == "undefined" || item.transport_mode == null || item.transport_mode == "null" ? "" : item.transport_mode ?? "",
          "vehicle_number": item.vehicle_number == "undefined" || item.vehicle_number == null || item.vehicle_number == "null" ? "" : item.vehicle_number ?? "",
          "driver_name": item.driver_name == "undefined" || item.driver_name == null || item.driver_name == "null" ? "" : item.driver_name ?? "",
          "mobile_no": item.mobile_no == "undefined" || item.mobile_no == null || item.mobile_no == "null" ? "" : item.mobile_no ?? "",
          "license_name": item.license_name == "undefined" || item.license_name == null || item.license_name == "null" ? "" : item.license_name ?? "",
          "delivery_type": item.delivery_type == "undefined" || item.delivery_type == null || item.delivery_type == "null" ? "" : item.delivery_type ?? "",
    
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
      const fileName = `DC_Report_export_${formattedDate}_${formattedTime}.xlsx`;
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
            Delivery Challan Report
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

          <Grid item xs={2.9}>
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
        <Table size="small">
          <TableHead>
            <TableRow>
            <TableCell className={classes.blueHeader}>Sr No</TableCell>
              <TableCell className={classes.blueHeader}>DC No</TableCell>
              <TableCell className={classes.blueHeader}>DC Date</TableCell>
              <TableCell className={classes.blueHeader}>Lr No</TableCell>
              <TableCell className={classes.blueHeader}>Lr Date	</TableCell>
              <TableCell className={classes.blueHeader}>Consignor	</TableCell>
              <TableCell className={classes.blueHeader}>From</TableCell>
              <TableCell className={classes.blueHeader}>Inv No</TableCell>
              <TableCell className={classes.blueHeader}>Inv Date</TableCell>
              <TableCell className={classes.blueHeader}>Inv Amt</TableCell>
              <TableCell className={classes.blueHeader}>Eway No</TableCell>
              <TableCell className={classes.blueHeader}>Eway Date</TableCell>
              <TableCell className={classes.blueHeader}>
              Eway Ex. Date
              </TableCell>
              <TableCell className={classes.blueHeader}>
              Articles Name
              </TableCell>
              <TableCell className={classes.blueHeader}>Quantity</TableCell>
              <TableCell className={classes.blueHeader}>No of Articles</TableCell>
              <TableCell className={classes.blueHeader}>Consignor Part No</TableCell>
              <TableCell className={classes.blueHeader}>Consignor Description	</TableCell>
              <TableCell className={classes.blueHeader}>Consignee</TableCell>
              <TableCell className={classes.blueHeader}>
              To
              </TableCell>
              <TableCell className={classes.blueHeader}>Consignee Part No</TableCell>
              <TableCell className={classes.blueHeader}>Total Pkgs</TableCell>
              <TableCell className={classes.blueHeader}>Total Weight</TableCell>
              <TableCell className={classes.blueHeader}>Trans Mode</TableCell>
              <TableCell className={classes.blueHeader}>Vehicle No</TableCell>
              <TableCell className={classes.blueHeader}>Driver Name</TableCell>
              <TableCell className={classes.blueHeader}>Mobile No</TableCell>
              <TableCell className={classes.blueHeader}>Licence No</TableCell>
              <TableCell className={classes.blueHeader}>Delivery Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.inv_id}>
                
                   <TableCell className={classes.tableCell}>{ row.srNo == "undefined" || row.srNo == null ? "" : row.srNo ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.dc_no == "undefined" || row.dc_no == null ? "" : row.dc_no ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.dc_date == "undefined" || row.dc_date == null ? "" : row.dc_date ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.lrNumber == "undefined" || row.lrNumber == null ? "" : row.lrNumber ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.lr_date == "undefined" || row.lr_date == null ? "" : row.lr_date ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.consigner == "undefined" || row.consigner == null ? "" : row.consigner ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.from_loc == "undefined" || row.from_loc == null ? "" : row.from_loc ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.inv_id == "undefined" || row.inv_id == null ? "" : row.inv_id ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.inv_date == "undefined" || row.inv_date == null ? "" : row.inv_date ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.inv_amt == "undefined" || row.inv_amt == null ? "" : row.inv_amt ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.eway_no == "undefined" || row.eway_no == null ? "" : row.eway_no ?? ""}</TableCell>
            
                <TableCell className={classes.tableCell}>{ row.eway_date == "undefined" || row.eway_date == null ? "" : row.eway_date ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.eway_exp_date == "undefined" || row.eway_exp_date == null ? "" : row.eway_exp_date ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.articles == "undefined" || row.articles == null ? "" : row.articles ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.quantity == "undefined" || row.quantity == null ? "" : row.quantity ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.no_of_articles == "undefined" || row.no_of_articles == null ? "" : row.no_of_articles ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.cnpartno == "undefined" || row.cnpartno == null ? "" : row.cnpartno ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.description == "undefined" || row.description == null ? "" : row.description ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.consignee == "undefined" || row.consignee == null ? "" : row.consignee ?? ""}</TableCell>

                <TableCell className={classes.tableCell}>{ row.to_loc == "undefined" || row.to_loc == null ? "" : row.to_loc ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.partno == "undefined" || row.partno == null ? "" : row.partno ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.total_packages == "undefined" || row.total_packages == null ? "" : row.total_packages ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.total_weight == "undefined" || row.total_weight == null ? "" : row.total_weight ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.transport_mode == "undefined" || row.transport_mode == null ? "" : row.transport_mode ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.vehicle_number == "undefined" || row.vehicle_number == null ? "" : row.vehicle_number ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.driver_name == "undefined" || row.driver_name == null ? "" : row.driver_name ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.mobile_no == "undefined" || row.mobile_no == null ? "" : row.mobile_no ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.license_name == "undefined" || row.license_name == null ? "" : row.license_name ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.delivery_type == "undefined" || row.delivery_type == null ? "" : row.delivery_type ?? ""}</TableCell>
        
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

export default DateWiseReportt;
