import React, { useEffect, useState } from "react";
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
  TableHead,
  Table,
  TableContainer,
  Paper,
  TableBody,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { SelectBranch } from "../../../../lib/api-branch";
import { SelectCustomers } from "../../../../lib/api-customer";
import { getConsignmentReports } from "../../../../lib/api-reports";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import * as XLSX from "xlsx";
import { Selectvehicle } from "../../../../lib/api-vehicle";
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

function DateWiseReport() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState(dayjs());
  const [rows, setRows] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleOptions, setVehicleOptions] = useState([]);
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
    fetchCustomers();
    fetchvehicle()
  }, []);


  const fetchDataWithPagination = async () => {
    setLoading(true);
    try {
      const response = await getConsignmentReports(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedCustomer ? selectedCustomer.customer_id : "",
        paginationModel.page,
        paginationModel.pageSize
      );
      const misReport = response.data.ConsignmentReports;
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
      const response = await getConsignmentReports(
        fromDate ? fromDate.format("YYYY-MM-DD") : "",
        toDate ? toDate.format("YYYY-MM-DD") : "",
        selectedBranch ? selectedBranch.branch_id : "",
        selectedCustomer ? selectedCustomer.customer_id : "",
      );
      const Report = response.data.ConsignmentReports;
   
      const formattedData = Report.map((item, index) => {
        return {
          "LR_No": item.lrNumber == "undefined" || item.lrNumber == null ? "" : item.lrNumber ?? "",
          "LR_Date": item.lr_date == "undefined" || item.lr_date == null ? "" : item.lr_date ?? "",
          "Consignor_name": item.consigner == "undefined" || item.consigner == null ? "" : item.consigner ?? "",
          "from": item.loc_from == "undefined" || item.loc_from == null ? "" : item.loc_from ?? "",
          "Invoice_No": item.inv_no == "undefined" || item.inv_no == null ? "" : item.inv_no ?? "",
          "Invoice_Date": item.inv_date == "undefined" || item.inv_date == null ? "" : item.inv_date ?? "",
          "Invoice_amt": item.inv_amt == "undefined" || item.inv_amt == null ? "" : item.inv_amt ?? "",
          "Consignor_description": item.description == "undefined" || item.description == null ? "" : item.description ?? "",
          "consignee_name": item.consignee == "undefined" || item.consignee == null ? "" : item.consignee ?? "",
          "to": item.loc_to == "undefined" || item.loc_to == null ? "" : item.loc_to ?? "",
          "articles": item.articles == "undefined" || item.articles == null ? "" : item.articles ?? "",
          "no_of_articles": item.no_of_articles == "undefined" || item.no_of_articles == null ? "" : item.no_of_articles ?? "",
          "quantity": item.quantity == "undefined" || item.quantity == null ? "" : item.quantity ?? "",
          "CFTL_CFTW_CFTH": item.cftl_cftw_cfth == "undefined" || item.cftl_cftw_cfth == null ? "" : item.cftl_cftw_cfth ?? "",
          "CFT_conv_factor": item.cft == "undefined" || item.cft == null ? "" : item.cft ?? "",
          "cft_kgs": item.cft_kgs == "undefined" || item.cft_kgs == null ? "" : item.cft_kgs ?? "",
          "actual_weight": item.actual_wt == "undefined" || item.actual_wt == null ? "" : item.actual_wt ?? "",
          "chargeble_wt": item.char_wt == "undefined" || item.char_wt == null ? "" : item.char_wt ?? "",
          "per_rate": item.rate_per == "undefined" || item.rate_per == null ? "" : item.rate_per ?? "",
          "rate": item.rate == "undefined" || item.rate == null ? "" : item.rate ?? "",
          "freight": item.freight == "undefined" || item.freight == null ? "" : item.freight ?? "",
          "eway_no": item.eway_no == "undefined" || item.eway_no == null ? "" : item.eway_no ?? "",
          "eway_date": item.eway_exp_date == "undefined" || item.eway_exp_date == null ? "" : item.eway_exp_date ?? "",
          "eway_ex_date": item.eway_date == "undefined" || item.eway_date == null ? "" : item.eway_date ?? "",
          "consignor_part_no": item.cnpartno == "undefined" || item.cnpartno == null ? "" : item.cnpartno ?? "",
          "part no": item.partno == "undefined" || item.partno == null ? "" : item.partno ?? "",
         
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
      const fileName = `LRReport_export_${formattedDate}_${formattedTime}.xlsx`;
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
            Consignment Reports
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
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.blueHeader}>Consignment No</TableCell>
              <TableCell className={classes.blueHeader}>Consignment Date</TableCell>
              <TableCell className={classes.blueHeader}>Consignor Name</TableCell>
              <TableCell className={classes.blueHeader}>From</TableCell>
              <TableCell className={classes.blueHeader}>Inv No</TableCell>
              <TableCell className={classes.blueHeader}>Inv Date</TableCell>
              <TableCell className={classes.blueHeader}>Inv Amt</TableCell>
              <TableCell className={classes.blueHeader}>Eway No</TableCell>
              <TableCell className={classes.blueHeader}>Eway Date</TableCell>
              <TableCell className={classes.blueHeader}>Eway Ex. Date</TableCell>
              <TableCell className={classes.blueHeader}>Consigner Part No</TableCell>
              <TableCell className={classes.blueHeader}>
              Consigner Description
              </TableCell>
              <TableCell className={classes.blueHeader}>
                Consignee Name
              </TableCell>
              <TableCell className={classes.blueHeader}>To</TableCell>
              <TableCell className={classes.blueHeader}>Consignee Part No</TableCell>
              <TableCell className={classes.blueHeader}>Articles</TableCell>
              <TableCell className={classes.blueHeader}>No of Articles</TableCell>
              <TableCell className={classes.blueHeader}>Quantity</TableCell>
              <TableCell className={classes.blueHeader}>
              CFT(L) CFT(W) CFT(H)
              </TableCell>
              <TableCell className={classes.blueHeader}>CFT Conv Factor</TableCell>
              <TableCell className={classes.blueHeader}>CFT(In Kgs)</TableCell>
              <TableCell className={classes.blueHeader}>Actual Weight</TableCell>
              <TableCell className={classes.blueHeader}>Charge Weight</TableCell>
              <TableCell className={classes.blueHeader}>Per Rate</TableCell>
              <TableCell className={classes.blueHeader}>Rate</TableCell>
              <TableCell className={classes.blueHeader}>Freight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
         
                <TableCell className={classes.tableCell}>{ row.lrNumber == "undefined" || row.lrNumber == null ? "" : row.lrNumber ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.lr_date == "undefined" || row.lr_date == null ? "" : row.lr_date ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.consigner == "undefined" || row.consigner == null ? "" : row.consigner ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.loc_from == "undefined" || row.loc_from == null ? "" : row.loc_from ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.inv_no == "undefined" || row.inv_no == null ? "" : row.inv_no ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.inv_date == "undefined" || row.inv_date == null ? "" : row.inv_date ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.inv_amt == "undefined" || row.inv_amt == null ? "" : row.inv_amt ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.eway_no == "undefined" || row.eway_no == null ? "" : row.eway_no ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.eway_date == "undefined" || row.eway_date == null ? "" : row.eway_date ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.eway_exp_date == "undefined" || row.eway_exp_date == null ? "" : row.eway_exp_date ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.cnpartno == "undefined" || row.cnpartno == null ? "" : row.cnpartno ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.description == "undefined" || row.description == null ? "" : row.description ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.consignee == "undefined" || row.consignee == null ? "" : row.consignee ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.loc_to == "undefined" || row.loc_to == null ? "" : row.loc_to ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.part == "undefined" || row.part == null ? "" : row.part ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.articles == "undefined" || row.articles == null ? "" : row.articles ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.no_of_articles == "undefined" || row.no_of_articles == null ? "" : row.no_of_articles ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.quantity == "undefined" || row.quantity == null ? "" : row.quantity ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.cftl_cftw_cfth == "undefined" || row.cftl_cftw_cfth == null ? "" : row.cftl_cftw_cfth ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.cft == "undefined" || row.cft == null ? "" : row.cft ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.cft_kgs == "undefined" || row.cft_kgs == null ? "" : row.cft_kgs ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.actual_wt == "undefined" || row.actual_wt == null ? "" : row.actual_wt ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.char_wt == "undefined" || row.char_wt == null ? "" : row.char_wt ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.rate_per == "undefined" || row.rate_per == null ? "" : row.rate_per ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.rate == "undefined" || row.rate == null ? "" : row.rate ?? ""}</TableCell>
                <TableCell className={classes.tableCell}>{ row.freight == "undefined" || row.freight == null ? "" : row.freight ?? ""}</TableCell>
           
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

export default DateWiseReport;
