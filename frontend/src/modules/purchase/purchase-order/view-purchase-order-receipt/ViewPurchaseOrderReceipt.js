import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import Tooltip from "@mui/material/Tooltip";
import { SelectCustomers, SelectPoCustomers } from "../../../../lib/api-customer";
import { SelectBranch } from "../../../../lib/api-branch";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import { deletePoMaster, getpomaster, getpomasterWithSearch } from "../../../../lib/api-purchase";
import CustomSnackbar from "../../../../components/ui/SnackbarComponent";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: "#004aad",
    color: "white",
  },
});

function ViewPurchaseOrderReceipt() {
  const classes = useStyles();
 
  const [branchOptions, setBranchOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [poNo, setPoNo] = useState("");
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [pageState, setPageState] = useState({
    total: 0,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green'); 



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
      const response = await SelectPoCustomers();
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

  const fetchPurchaseOrders = async () => {
    setLoading(true);
    try {
      const response = await getpomaster(
        paginationModel.page,
        paginationModel.pageSize
      );
      const totc = response.data.records[0]?.totc; 
  
     
      const startIndex = paginationModel.page * paginationModel.pageSize;
      const recordsWithSrNo = response.data.records.map((record, index) => ({
        ...record,
        sr_no: startIndex + index + 1,
      }));
  
      setRows(recordsWithSrNo);
      setPageState({
        total: totc,
      });
    } catch (error) {
      console.error("Failed to fetch purchase orders:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPurchaseOrders();
  }, [paginationModel]);

  const search = async (search = "", customerId = "") => {
    setLoading(true);
    try {
      const response = await getpomasterWithSearch(
        paginationModel.page,
        paginationModel.pageSize,
        search,
        customerId
      );
      const totc = response.data.records[0]?.totc;
      const startIndex = paginationModel.page * paginationModel.pageSize;
      const recordsWithSrNo = response.data.records.map((record, index) => ({
        ...record,
        sr_no: startIndex + index + 1,
      }));

      setRows(recordsWithSrNo);
      setPageState({
        total: totc,
      });
    } catch (error) {
      console.error("Failed to fetch purchase orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    search(poNo, selectedCustomer?.customer_id);
  };
  const navigate = useNavigate();
      
  const handleEditClick = (id) => {
    navigate(`/Edit_purches-order-recipt/${id}`);
  };
  const columns = [
    {
      field: "sr_no",
      headerName: "sr No",
      flex: 0.1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "po_no",
      headerName: "PO No",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "po_date",
      headerName: "PO date",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "agr_start_date",
      headerName: "PO Start Date",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "agr_end_date",
      headerName: "PO End Date",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "poStatus",
      headerName: "PO Status",
      flex: 0.5,
      headerClassName: classes.blueHeader,
    },
    {
      field: "action",
      headerAlign: "center",
      headerName: "Action",
      flex: 2,
      headerClassName: classes.blueHeader,
      renderCell: (params) => (
        <Grid container spacing={1} justifyContent="center" alignItems="center">
         
          <Grid item>
            <Tooltip title="Edit">
              <IconButton style={{ color: "black" }}     onClick={() => handleEditClick(params.row.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="View">
              <IconButton style={{ color: "black" }}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Print">
              <IconButton style={{ color: "black" }}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Block">
              <IconButton style={{ color: "black" }}>
                <BlockIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Mail">
              <IconButton style={{ color: "black" }}>
                <MailOutlineIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
          <Checkbox
              checked={selectedRows.includes(params.row.id)}
              onChange={(event) => handleCheckboxChange(params.row.id, event.target.checked)}
            />
          </Grid>
        </Grid>
      ),
    },
  ];



  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      setSnackbarMessage('Select at least one PO');
      setSnackbarColor('orange'); 
      setSnackbarOpen(true);
      return;
    }
  
    try {
      const result = await deletePoMaster(selectedRows);
      console.log('Delete successful:', result.data.message);
      setSelectedRows([]);
      await fetchPurchaseOrders();
      setSnackbarMessage(result.data.message);
      setSnackbarColor('green'); 
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting PO Master:', error);
      setSnackbarMessage('Error deleting PO Master');
      setSnackbarColor('red'); 
      setSnackbarOpen(true);
    }
  };
  
  

    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };
  

  return (
    <>
      {loading && <LoadingSpinner />}
      <Grid container>
        <Grid item xs={6} md={2}>
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
        <Grid item xs={6} md={2}></Grid>
        <Grid item xs={6} md={6}>
          <Typography
            sx={{ fontFamily: "poppins", fontSize: "1.75rem", marginBottom: 2 }}
            align="center"
          >
            Purchase Order List
          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: "black", marginBottom: "2%" }} />

      <Grid container spacing={1} style={{ marginBottom: "2%" }}>
        <Grid item xs={12} md={3}>
        <TextField
            name="PO No"
            label="PO No"
            value={poNo}
            onChange={(e) => setPoNo(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            onClick={handleSearch} 
            color="primary"
            style={{
              backgroundColor: "green",
              borderRadius: "50px",
              height: "40px",
              width: "100%",
            }}
          >
            Search
          </Button>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "#D92445",
              borderRadius: "50px",
              height: "40px",
              width: "100%",
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: "black", marginBottom: "2%" }} />

      <Grid container>
        <Grid item xs={12} style={{ flexGrow: 1 }}>
          <DataGrid
            density="compact"
            rows={rows}
            columns={columns}
            rowCount={pageState.total}
            paginationMode="server"
            pageSizeOptions={[paginationModel.pageSize]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            autoHeight
          />
        </Grid>
      </Grid>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        color={snackbarColor}
      />
    </>
  );
}

export default ViewPurchaseOrderReceipt;
