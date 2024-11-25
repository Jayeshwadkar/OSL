import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Checkbox, Divider, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Tooltip from '@mui/material/Tooltip';
import { SelectBranch } from '../../../../lib/api-branch';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSalesInvoice, getSalesInvoiceMasterList } from '../../../../lib/api-salesInvoice1';
import { makeStyles } from '@mui/styles';
import CustomSnackbar from '../../../../components/ui/SnackbarComponent';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});

function ViewSalesInvoiceList() {
  const classes = useStyles();
  const navigate = useNavigate(); 
  const [branchOptions, setBranchOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [rows, setRows] = useState([]);
  const [pageState, setPageState] = useState({
    total: 0,
  });
  const [searchValue, setSearchValue] = useState(''); // For input field
  const [searchQuery, setSearchQuery] = useState(''); // For the search query

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

  const fetchSalesInvoiceData = async () => {
    setLoading(true);
    try {
      const response = await getSalesInvoiceMasterList(
        paginationModel.page,
        paginationModel.pageSize,
        searchQuery, 
        selectedBranch?.branch_id
      );
      const totc = response.data.records[0]?.totalRecords;
      const startIndex = paginationModel.page * paginationModel.pageSize;
      const recordsWithSrNo = response.data.records.map((record, index) => ({
        ...record,
        sr_no: startIndex + index + 1,
      }));
      setRows(recordsWithSrNo || []);
      setPageState({
        total: totc,
      });
    } catch (error) {
      console.error("Error fetching sales invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    fetchSalesInvoiceData();
  }, [paginationModel.page, paginationModel.pageSize, searchQuery, selectedBranch]);

  const handleSearch = () => {
    setSearchQuery(searchValue);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      setSnackbarMessage('Select at least one Sale Invoice');
      setSnackbarColor('orange');
      setSnackbarOpen(true);
      return;
    }

    try {
      const result = await deleteSalesInvoice(selectedRows);
      console.log('Delete successful:', result.data.message);
      setSelectedRows([]);
      await fetchSalesInvoiceData();
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
  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleEditClick = (id) => {
    navigate(`/EditSalesInvoice/${id}`); 
  };

  const columns = [
    { field: 'sr_no', headerName: 'SR No', flex: 0.2, headerClassName: classes.blueHeader },
    { field: 'billNumber', headerName: 'Bill No', flex: 0.4, headerClassName: classes.blueHeader },
    { field: 'billdate', headerName: 'Bill Date', flex: 0.4, headerClassName: classes.blueHeader },
    { field: 'consigner', headerName: 'Customer Name', flex: 2, headerClassName: classes.blueHeader },
    { field: 'po_no', headerName: 'PO NO', flex: 0.6, headerClassName: classes.blueHeader },
    {
      field: 'action', headerAlign: 'center', headerName: 'Action', flex: 1.3, headerClassName: classes.blueHeader, renderCell: (params) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'left' }}>
          <Tooltip title="Edit">
            <IconButton style={{ color: 'black' }} onClick={() => handleEditClick(params.row.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton style={{ color: 'black' }}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton style={{ color: 'black' }}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Block">
            <IconButton style={{ color: 'black' }}>
              <BlockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mail">
            <IconButton style={{ color: 'black' }}>
              <MailOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton style={{ color: 'black' }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Grid item>
            <Checkbox
              checked={selectedRows.includes(params.row.id)}
              onChange={(event) => handleCheckboxChange(params.row.id, event.target.checked)}
            />
          </Grid>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && <LoadingSpinner />}
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 16 }}>
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: "1.75rem",
            }}
          >
            Sale Invoice List
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={3} display="flex" alignItems="center">
            <Autocomplete
              options={branchOptions}
              getOptionLabel={(option) => option.branch_name || ""}
              onChange={(event, newValue) => setSelectedBranch(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Branch"
                  variant="outlined"
                  size="small"
                  name="branch"
                />
              )}
              style={{ minWidth: 200 }} // Adjust width as needed
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              size="small"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} display="flex" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} md={3} display="flex" alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: "black", margin: "2% 0" }} />

      <Grid container>
        <Grid item xs={12}>
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
          <CustomSnackbar
            open={snackbarOpen}
            message={snackbarMessage}
            onClose={handleSnackbarClose}
            color={snackbarColor}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ViewSalesInvoiceList;
