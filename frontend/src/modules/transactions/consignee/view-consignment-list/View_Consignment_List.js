import React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, } from '@mui/x-data-grid';
import { Box, styled, InputBase, alpha, Button, Autocomplete, TextField, Grid, IconButton, Checkbox, Switch } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import BlockIcon from '@mui/icons-material/Block';
import { makeStyles } from '@mui/styles';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { BiEdit } from "react-icons/bi";
import Icon from '@mdi/react';
import { mdiPrinterSearch } from '@mdi/js';

// Custom styling and pagination components
const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#f8f5f6',
    color: '#000',
  },
  columnBorder: {
    borderRight: '1px solid #ccc', // Add border to the right of each column cell
  },
});

function customCheckbox(theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }
};


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
  // '& .MuiDataGrid-iconSeparator': {
  //   display: 'none',
  // },
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
  ...customCheckbox(theme),
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
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const PAGE_SIZE = 5;

function View_Consignment_List() {
  const classes = useStyles();

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5, // Initial page size
    page: 0,     // Initial page index
  });

  const columns = [
    { field: 'sn', headerName: 'SN', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'ConsignmentNo', headerName: 'Consignment No', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'Consignmentdate', headerName: 'Consignment Date', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'consigner', headerName: 'Consigner Name', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'from', headerName: 'From', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'consignee', headerName: 'Consignee Name', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'to', headerName: 'To', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'status', headerName: 'Status', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
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
          {/* <Tooltip title="Block">
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
          </Tooltip> */}
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
      resizable: true,
    },
  ];


  const rows = [
    {
      id: 1,
      sn: 1,
      lrNo: 'PUN-2023145832',
      date: '09-03-2024',
      consigner: 'EXOTECH PLASTICS PVT. LTD. (RANJANGAON-PUNE)',
      from: 'PUNE',
      consignee: 'TVS MOTOR COMPANY LTD. (BYTHAHALLI-MYSORE)',
      to: 'MYSORE',
      status: 'New',
    },
    {
      id: 2,
      sn: 2,
      lrNo: 'PUN-2023145832',
      date: '09-03-2024',
      consigner: 'EXOTECH PLASTICS PVT. LTD. (RANJANGAON-PUNE)',
      from: 'PUNE',
      consignee: 'TVS MOTOR COMPANY LTD. (BYTHAHALLI-MYSORE)',
      to: 'MYSORE',
      status: 'In Transit',
    },
    {
      id: 3,
      sn: 3,
      lrNo: 'PUN-2023145832',
      date: '09-03-2024',
      consigner: 'EXOTECH PLASTICS PVT. LTD. (RANJANGAON-PUNE)',
      from: 'PUNE',
      consignee: 'TVS MOTOR COMPANY LTD. (BYTHAHALLI-MYSORE)',
      to: 'MYSORE',
      status: 'Delivered',
    },
    {
      id: 4,
      sn: 4,
      lrNo: 'PUN-2023145832',
      date: '09-03-2024',
      consigner: 'EXOTECH PLASTICS PVT. LTD. (RANJANGAON-PUNE)',
      from: 'PUNE',
      consignee: 'TVS MOTOR COMPANY LTD. (BYTHAHALLI-MYSORE)',
      to: 'MYSORE',
      status: 'New',
    },
    {
      id: 5,
      sn: 5,
      lrNo: 'PUN-2023145832',
      date: '09-03-2024',
      consigner: 'EXOTECH PLASTICS PVT. LTD. (RANJANGAON-PUNE)',
      from: 'PUNE',
      consignee: 'TVS MOTOR COMPANY LTD. (BYTHAHALLI-MYSORE)',
      to: 'MYSORE',
      status: 'In Transit',
    },
  ];
  const handlePageSizeChange = (newPageSize) => {
    setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }));
  };
  return (
    <>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontFamily: 'Poppins, sans-serif' }}>Consignment List</div>
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
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '2px 20px', marginRight: '1%', backgroundColor: 'white' }}>
              <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ width: '150px' }} />
            </div>
            {/* <button onClick={handleDelete} style={{ padding: '5px 10px', color: 'white', background: '#5c6bc0', borderRadius: '50px', border: '1px solid transparent', boxShadow: '0 5px 20px #d6dee4', cursor: 'pointer' }}>Delete</button> */}
          </div>
        </div>
      </div>
      <Box sx={{
        height: 500,
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

export default View_Consignment_List;
