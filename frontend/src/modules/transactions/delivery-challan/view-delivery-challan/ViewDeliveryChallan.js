import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import Checkbox from '@mui/material/Checkbox';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Box, Button, Grid, Switch } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { BiEdit } from "react-icons/bi";
import Icon from '@mdi/react';
import { mdiPrinterSearch } from '@mdi/js';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#f8f5f6',
    color: '#000',
  },
  columnBorder: {
    borderRight: '1px solid #ccc',
  },
  root: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '24px',
    fontFamily: 'Poppins, sans-serif',
  },
  searchContainer: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '50px',
    padding: '2px 20px',
    backgroundColor: 'white',
  },
  searchInput: {
    width: '150px',
  },
  dataGridContainer: {
    height: 500,
    width: '100%',
    '& .MuiDataGrid-cell:hover': {
      color: 'primary.main',
    },
  },
});

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props) => <PaginationItem {...props} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const PAGE_SIZE = 5;

function ViewDeliveryChallan() {
  const classes = useStyles();

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  const handlePageSizeChange = (newPageSize) => {
    setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }));
  };

  const columns = [
    { field: 'sn', headerName: 'SN', width: 50, headerClassName: classes.blueHeader },
    { field: 'dcNo', headerName: 'DC No', flex: 1, headerClassName: classes.blueHeader },
    { field: 'date', headerName: 'DC Date', flex: 1, headerClassName: classes.blueHeader },
    { field: 'vehicleNo', headerName: 'Vehicle No', flex: 1, headerClassName: classes.blueHeader },
    { field: 'vehicleType', headerName: 'Vehicle Type', flex: 1, headerClassName: classes.blueHeader },
    { field: 'from', headerName: 'From Location', flex: 1, headerClassName: classes.blueHeader },
    { field: 'to', headerName: 'To Location', flex: 1, headerClassName: classes.blueHeader },
    { field: 'dsType', headerName: 'DC Type', flex: 1, headerClassName: classes.blueHeader },
    {
      field: 'Select',
      headerName: '',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => <Checkbox />,
    },
    {
      field: 'action',
      headerAlign: 'center',
      headerName: 'Action',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'left' }}>
          <Tooltip title="Edit">
            <IconButton style={{ color: 'black' }}>
              <BiEdit />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="View">
            <IconButton style={{ color: 'green' }}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip> */}
         <Tooltip title="View">
          <IconButton style={{ color: 'black' }}>
          <Icon path={mdiPrinterSearch} size={1} />
          </IconButton>
        </Tooltip>
          <Tooltip title="Block">
        <Switch
      // checked={isChecked}
      // onChange={handleChange}
      color="default"
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: 'green',
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: 'green',
        },
        '& .MuiSwitch-switchBase': {
          color: '#C80036',
        },
        '& .MuiSwitch-track': {
          backgroundColor: 'red',
        },
      }}
    />
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
        </div>
      ),
    },
  ];

  const rows = [
    { id: 1, sn: 1, dcNo: 300326, date: '31-03-2024', vehicleNo: 'MH.14.CP.1272', from: 'PUNE', to: 'BANGALORE' },
    { id: 2, sn: 2, dcNo: 300325, date: '09-03-2024', vehicleNo: 'MH.38.E.3147', from: 'PUNE', to: 'FIAT (RANJANGAON)' },
    { id: 3, sn: 3, dcNo: 300318, date: '09-03-2024', vehicleNo: 'MH.12.KP.9029', from: 'PUNE', to: 'PV CLEAN (CHAKAN-PUNE)' },
    { id: 4, sn: 4, dcNo: 300317, date: '09-03-2024', vehicleNo: 'MH.14.GU.0622', from: 'PUNE', to: 'MVML (CHAKAN)' },
    { id: 5, sn: 5, dcNo: 300313, date: '09-03-2024', vehicleNo: 'MH.14.KU.6903', from: 'PUNE', to: 'VARROC (CHAKAN PUNE)' },
    { id: 6, sn: 6, dcNo: 300309, date: '09-03-2024', vehicleNo: 'MH.12.LQ.2317', from: 'PUNE', to: 'MVML (CHAKAN)' },
    { id: 7, sn: 7, dcNo: 300308, date: '09-03-2024', vehicleNo: 'MH.12.PN.9277', from: 'PUNE', to: 'ENDURANCE (AURANGABAD)' },
    { id: 8, sn: 8, dcNo: 300300, date: '09-03-2024', vehicleNo: 'MH.12.DV.2037', from: 'PUNE', to: 'ENDURANCE (AURANGABAD)' },
    { id: 9, sn: 9, dcNo: 300294, date: '09-03-2024', vehicleNo: 'MH.14.KV.2041', from: 'PUNE', to: 'AMW (BHOSARI)' },
  ];

  return (
    <>
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontFamily: 'Poppins, sans-serif' }}> Delivery Challan</div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '200px' }}>
            <Autocomplete
                options={[]} // Add your options here
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Branch"
                        variant="outlined"
                        fullWidth
                        size="small"
                    />
                )}
            />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc',  padding: '2px 20px', marginRight: '1%', backgroundColor: 'white' }}>
                <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ width: '150px' }} />
            </div>
            {/* <button onClick={handleDelete} style={{ padding: '5px 10px', color: 'white', background: '#5c6bc0', borderRadius: '50px', border: '1px solid transparent', boxShadow: '0 5px 20px #d6dee4', cursor: 'pointer' }}>Delete</button> */}
        </div>
    </div>
    </div> 
    <Box  sx={{
        height: 600,
        width: '100%',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
>
      <StyledDataGrid
      density='compact'
        rows={rows}
        columns={columns}
        pageSize={paginationModel.pageSize}
        onPageSizeChange={handlePageSizeChange}
        paginationMode="server"
        pagination
        rowCount={rows.length}
        page={paginationModel.page}
        onPageChange={(newPage) => setPaginationModel((prev) => ({ ...prev, page: newPage }))}
        components={{
          Pagination: () => (
            <CustomPagination pageSize={paginationModel.pageSize} onPageSizeChange={handlePageSizeChange} />
          ),
        }}
  //        slots={{
  //   pagination: CustomPagination,
  // }}
  EnableColumnResize={true}  // You don't need this since it's false by default
      />
    </Box>
  </>
  );
}

export default ViewDeliveryChallan;
