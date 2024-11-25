import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { deleteLrBillReports, getLrBillReports } from '../../../../lib/api-LRbillreceipt';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import { SelectBranch } from '../../../../lib/api-branch';
import CustomSnackbar from '../../../../components/ui/SnackbarComponent';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});



function ViewBillreceipt() {
  const [loading, setLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green'); 
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [pageState, setPageState] = useState({
    total: 0,
  });



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

  const fetchLRbillreceipt = async () => {
    setLoading(true);
    try {
      // Fetch the data from the API
      const response = await getLrBillReports(
        paginationModel.page,
        paginationModel.pageSize,
        selectedBranch.branch_id,
      );
      console.log(response)
      const records = response.data.records;
      const totalCount = records.length > 0 ? records[0].totalCount : 0;
      const startIndex = paginationModel.page * paginationModel.pageSize;
      const recordsWithSrNo = records.map((record, index) => ({
        ...record,
        sr_no: startIndex + index + 1,
        id:record.rowNumber,
        DataID:record.id
      }));
      setRows(recordsWithSrNo);
      setPageState({
        total: totalCount, 
      });
    } catch (error) {
      console.error("Failed to fetch LR bill receipts:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log('rows',rows)
  
  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    fetchLRbillreceipt();
  }, [selectedBranch, paginationModel]);

  const classes = useStyles();

  const handleCheckboxChange = (id, checked) => {
    console.log(id)
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      setSnackbarMessage('Select at least one LR Bill Report');
      setSnackbarColor('orange'); 
      setSnackbarOpen(true);
      return;
    }
  
    try {
      const result = await deleteLrBillReports(selectedRows);
      console.log('Delete successful:', result.data.message);
      setSelectedRows([]);
      await fetchLRbillreceipt();
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
  


  const columns = [
    { field: 'sr_no', headerName: 'SN', flex: 1, headerClassName: classes.blueHeader },
    { field: 'lrNo', headerName: 'LR No	', flex: 1, headerClassName: classes.blueHeader },
    { field: 'lrDate', headerName: 'Date', flex: 1, headerClassName: classes.blueHeader },
    { field: 'consigner', headerName: 'Consigner', flex: 1, headerClassName: classes.blueHeader },
    { field: 'locFrom', headerName: 'From', flex: 1, headerClassName: classes.blueHeader },
    { field: 'consignee', headerName: 'Consignee', flex: 1, headerClassName: classes.blueHeader },
    { field: 'locTo', headerName: 'To', flex: 1, headerClassName: classes.blueHeader },
    { field: 'billNumber', headerName: 'Bill No	', flex: 1, headerClassName: classes.blueHeader },
    { field: 'billDate', headerName: 'Bill Date	', flex: 1, headerClassName: classes.blueHeader },
    {
      field: 'billAmount',
      headerName: 'Bill Amt',
      flex: 1,
      headerClassName: classes.blueHeader,

    },
    {
      field: 'Select',
      headerName: 'Select',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => (
        <Checkbox
        checked={selectedRows.includes(params.row.DataID)}
          onChange={(event) => handleCheckboxChange(params.row.DataID, event.target.checked)}
        />
      ),
    },
  ];


  return (
    <>
      {loading && <LoadingSpinner />}
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontFamily: 'Poppins, sans-serif' }}>
          LR Bill Report
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ width: '300px' }}>
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
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '50px', padding: '2px 20px', marginRight: '1%', backgroundColor: 'white' }}>
              <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ width: '150px' }} />
            </div>
            <button onClick={handleDelete} style={{ padding: '5px 10px', color: 'white', background: '#5c6bc0', borderRadius: '50px', border: '1px solid transparent', boxShadow: '0 5px 20px #d6dee4', cursor: 'pointer' }}>Delete</button>
          </div>
        </div>

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

      </div>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        color={snackbarColor}
      />
    </>
  );
}

export default ViewBillreceipt