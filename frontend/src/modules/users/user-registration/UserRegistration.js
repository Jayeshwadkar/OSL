import React, { useEffect, useState } from 'react';
import { Button, Select, MenuItem, InputLabel, FormControl, Box, Typography, Grid, Chip, IconButton, Pagination, PaginationItem, Switch } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import PrintIcon from '@mui/icons-material/Print';
import BlockIcon from '@mui/icons-material/Block';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { SelectBranch } from '../../../lib/api-branch';
import { getUserList, ActivateDeactivateUser, DeleteUser } from '../../../lib/api-user';
import { BiEdit } from "react-icons/bi";
import Icon from '@mdi/react';
import { mdiPrinterSearch } from '@mdi/js';

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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function UserRegistration() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [branches, setBranches] = useState([])
  const [branchId, setBranchId] = useState(30)
  const [users, setUsers] = useState([])
  const [searchText, setSearchText] = useState("")

  const getBranchData = async () => {
    const response = await SelectBranch()

    setBranches(() => {
      const branchOp = response.data.map((row) => {
        return {
          value: row.branch_id, label: row.branch_name
        };
      });
      return branchOp;
    })
  }

  const getUserDetails = async () => {
    setIsLoading(true)
    const response = await getUserList(branchId)

    const jsonData = response.data.map((row, index) => ({
      id: row.id,
      sn: index + 1,
      emp_ID: row.employee_id,
      employeeName: row.employee_name,
      username: row.username,
      password: row.password,
      status: row.status,
    }))

    setUsers(jsonData)
    setIsLoading(false)
  }

  useEffect(() => {
    getBranchData()
    getUserDetails()
  }, [branchId])

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const filteredRows = users.filter((row) => {
    return Object.values(row).some((value) => {
      if (typeof value === 'string' || value instanceof String) {
        return value.toLowerCase().includes(searchText.toLowerCase());
      }
      return false;
    });
  });

  const handleBranchChange = (event) => {
    setIsLoading(true)
    setBranchId(event.target.value);
    getUserDetails()
    setIsLoading(false)
  }

  const handleRegisterClick = () => {
    navigate('/Registration');
  };

  const handleToggle = async (id) => {
    const response = await ActivateDeactivateUser(id)
    if (response.status == 200) {
      getBranchData()
      getUserDetails()
    }
  }

  const handleDeleteUser = async (id) => {
    const response = await DeleteUser(id)
    console.log("del response : ", response);

    if (response.status == 200) {
      getBranchData()
      getUserDetails()
    }
  }

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5, // Initial page size
    page: 0,     // Initial page index
  });

  const columns = [
    { field: 'sn', headerName: 'SN', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    // { field: 'emp_ID', headerName: 'Emp_ID', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'employeeName', headerName: 'Employee Name', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'username', headerName: 'Username', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'password', headerName: 'Password', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    {
      field: 'status', headerName: 'Status', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => (
        <>
          {/* {params.value != 0 ? <Chip label="Activated + Permissions" color="success" /> : <Chip label="Pending" color="error" />} */}
          {params.value == 0 ? <Chip label="Pending" color="error" /> : ""}
          {params.value == 1 ? <Chip label="Activated" color="info" /> : ""}
          {params.value == 2 ? <Chip label="Activated + Permissions" color="success" /> : ""}
          {params.value == 3 ? <Chip label="Deactivated + Permissions" color="warning" /> : ""}
        </>
      ), headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => <ActionsCell id={params.row.id} username={params.row.username} status={params.row.status} />, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true
    },

  ];


  const ActionsCell = ({ id, username, status }) => {
    const handleEditClick = () => {
      navigate(`/Edit_user/${username}`)
    };
    const handleSettingClick = () => {
      navigate(`/user-permission/${username}`)
    }

    return (
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'left' }}>
        <Tooltip title="Edit">
          <IconButton style={{ color: 'black' }} onClick={handleEditClick}>
            <BiEdit />
          </IconButton>
        </Tooltip>
        <Tooltip title="View">
          <IconButton style={{ color: 'black' }}>
            <Icon path={mdiPrinterSearch} size={1} />
          </IconButton>
        </Tooltip>
        <IconButton
          style={{ color: 'black' }}
          onClick={handleSettingClick}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          style={{ color: 'black' }}
        //  onClick={handlePrintClick}
        >
          <PrintIcon />
        </IconButton>
        <Switch
          checked={status == 1 || status == 2}
          color='success'
          onClick={(event) => handleToggle(id)}
        />
        <IconButton
          style={{ color: 'red' }}
          onClick={() => handleDeleteUser(id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  const handlePageSizeChange = (newPageSize) => {
    setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }));
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Box sx={{ p: 3 }}>
        <Typography style={{ marginBottom: '2%' }} variant="h5" gutterBottom>
          User List
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button
            variant="contained"
            color="success"

            onClick={handleRegisterClick}
          >
            Register User
          </Button>

          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FormControl variant="outlined" sx={{ minWidth: 300 }}>
              <InputLabel>Branch</InputLabel>
              <Select
                size='small'
                defaultValue={branchId}
                label="Branch"
                onChange={handleBranchChange}
              >
                {branches.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '2px 20px', marginRight: '1%', backgroundColor: 'white' }}>
            <SearchIcon style={{ padding: '10px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ width: '150px' }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Box>


        {/* <div style={{ height: 400, width: '100%' }}>

          <DataGrid
           rows={filteredRows} 
           columns={columns} 
           pageSize={5} 
           rowsPerPageOptions={[5]} />
        </div> */}
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
            rows={filteredRows}
            columns={columns}
            pageSize={paginationModel.pageSize}
            onPageSizeChange={handlePageSizeChange}
            paginationMode="server"
            pagination
            rowCount={filteredRows.length}
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

        {/* <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="outlined" sx={{ mr: 1 }}>Previous</Button>
          <Button variant="outlined" sx={{ mr: 1 }}>1</Button>
          <Button variant="outlined" sx={{ mr: 1 }}>2</Button>
          <Button variant="outlined" sx={{ mr: 1 }}>3</Button>
          <Button variant="outlined">Next</Button>
        </Grid> */}
      </Box>
    </>
  );
}
