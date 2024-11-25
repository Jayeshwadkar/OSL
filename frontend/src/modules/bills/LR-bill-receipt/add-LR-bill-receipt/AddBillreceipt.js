import React, { useState, useEffect, memo } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { SelectBranch } from '../../../../lib/api-branch';
import { getLrNumberPodReceipts, addLrBillReport } from '../../../../lib/api-LRbillreceipt';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import { FixedSizeList as List } from 'react-window';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from '../../../../components/ui/SnackbarComponent';
const fixedHeight = {
  height: '40%'
};

const scrollableBoxStyle = {
  maxHeight: '300px',
  overflowY: 'auto'
};


const Row = memo(({ index, style, data }) => {
  const { lrNumbers, selectedLrIds, handleCheckboxChange } = data;

  
  const checkboxesPerRow = 5;

 
  const startIndex = index * checkboxesPerRow;
  const endIndex = Math.min(startIndex + checkboxesPerRow, lrNumbers.length);


  const rowItems = lrNumbers.slice(startIndex, endIndex);

  return (
    <div style={style}>
      <Grid container spacing={1}>
        {rowItems.map((lr) => (
          <Grid item xs={12 / checkboxesPerRow} key={lr.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedLrIds.includes(lr.id)}
                  onChange={handleCheckboxChange(lr.id)}
                />
              }
              label={lr.lrNo}
              sx={{ display: 'block', textAlign: 'center' }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
});

function AddBillreceipt() {
  const [loading, setLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [selectedBranch1, setSelectedBranch1] = useState(null);
  const [selectedBranch2, setSelectedBranch2] = useState(null);
  const [billDate, setBillDate] = useState(dayjs());
  const [lrNumbers, setLrNumbers] = useState([]);
  const [selectedLrIds, setSelectedLrIds] = useState([]);
  const [billNumber, setBillNumber] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green'); 
  const navigate = useNavigate();
  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await SelectBranch();
      const { data } = response;
      const branchList = data.map((branch) => ({
        branch_id: branch.branch_id,
        branch_name: branch.branch_name
      }));
      setBranchOptions(branchList);
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleGetLr = async () => {
    if (selectedBranch2) {
      setLoading(true);
      try {
        const branchId = selectedBranch2.branch_id;
        const response = await getLrNumberPodReceipts(branchId);
        setLrNumbers(response.data.records);
      } catch (error) {
        console.error("Error fetching LR Number Pod Receipts:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("No branch selected");
    }
  };

  const handleCheckboxChange = (id) => (event) => {
    setSelectedLrIds((prev) =>
      event.target.checked
        ? [...prev, id]
        : prev.filter((item) => item !== id)
    );
  };

  const handleSave = async () => {
    const data = {
      billNumber,
      billDate: billDate.format('YYYY-MM-DD'),
      billAmount,
      lrIds: selectedLrIds
    };

   
    try {
      setLoading(true);
      const response = await addLrBillReport(data);
      setSnackbarMessage('Record added Successfully!!');
      setSnackbarColor('green');
      setSnackbarOpen(true); 
      setTimeout(() => {
        navigate('/view-LR-bill-receipt'); 
      }, 2000);
    } catch (error) {
      console.error('Error adding LR bill report:', error);
      setSnackbarMessage('Error adding LR bill report: ' + (error.response?.data?.message || error.message));
      setSnackbarColor('error');
      setSnackbarOpen(true); 
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    navigate('/view-LR-bill-receipt'); 
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <Grid container>
        <Grid item xs={6} md={2}>
          <Autocomplete
            options={branchOptions}
            getOptionLabel={(option) => option.branch_name || ""}
            value={selectedBranch1}
            onChange={(event, newValue) => setSelectedBranch1(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch"
                variant="outlined"
                fullWidth
                size="small"
                name="branch1"
              />
            )}
          />
        </Grid>
        <Grid item xs={6} md={2} sx={{ float: 'center' }}></Grid>
        <Grid item xs={6} md={2} ml={16} sx={{ float: 'center' }}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginLeft: 2 }}
          >
            LR Bill Report Details
          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={2} sx={{ marginTop: '2px', marginBottom: '2%' }}>
        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="Bill Number"
            label="Bill Number"
            fullWidth
            variant="outlined"
            size="small"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="Bill Date"
                  format="MM-DD-YYYY"
                  label="Bill Date"
                  value={billDate}
                  onChange={(date) => setBillDate(date)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="Bill Amount"
            label="Bill Amount"
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  &#8377;
                </InputAdornment>
              ),
            }}
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
          />
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={0} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>LR Number</Grid>

      <Grid container spacing={3} sx={{ marginTop: '2px', marginBottom: '2%' }} alignItems="center">
        <Grid item xs={3}>
          <Autocomplete
            options={branchOptions}
            getOptionLabel={(option) => option.branch_name || ""}
            value={selectedBranch2}
            onChange={(event, newValue) => setSelectedBranch2(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Branch"
                variant="outlined"
                fullWidth
                size="small"
                name="branch2"
              />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" sx={{ backgroundColor: '#PC6BC0' }} fullWidth onClick={handleGetLr}>
            Get LR
          </Button>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Search"
            type="search"
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={0} sx={{ margin: '0px auto' }}>
        <Grid item xs={12} mt={1} mb={1}>
          <Box style={scrollableBoxStyle}>
            {lrNumbers.length > 0 ? (
              <List
                height={300}
                itemCount={Math.ceil(lrNumbers.length / 5)}
                itemSize={30}
                width="100%"
                itemData={{ lrNumbers, selectedLrIds, handleCheckboxChange }}
              >
                {Row}
              </List>
            ) : (
              <Typography></Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={4.0} mt={1} mb={1}></Grid>

        <Grid item xs={4} mt={5} mb={2}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={5}>
              <Button variant="contained" sx={{ backgroundColor: '#18c5a9' }} onClick={handleSave}>
                Save
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button variant="contained" sx={{ backgroundColor: '#D92445' }}  onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4.0} mt={1} mb={1}></Grid>
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

export default AddBillreceipt;
