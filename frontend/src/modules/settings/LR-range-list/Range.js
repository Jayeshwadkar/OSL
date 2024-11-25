import React from 'react';
import {DataGrid,gridPageCountSelector,gridPageSelector,useGridApiContext,useGridSelector,} from '@mui/x-data-grid';
import { Box, styled, InputBase, alpha, Button, Autocomplete, TextField, Grid, IconButton, Checkbox, Typography, Divider } from '@mui/material';
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

function Range() {
  const classes = useStyles();
   const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5, // Initial page size
    page: 0,     // Initial page index
  });

  const handlePageSizeChange = (newPageSize) => {
    setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }));
  };

  const columns = [
    { field: 'Sr No', headerName: 'sr No', flex: 1 , headerClassName: classes.blueHeader , cellClassName: classes.columnBorder, resizable: true },
    { field: 'Branch	', headerName: 'Branch', flex: 1 , headerClassName: classes.blueHeader , cellClassName: classes.columnBorder, resizable: true },
    { field: 'Year', headerName: 'Year', flex: 1, headerClassName: classes.blueHeader , cellClassName: classes.columnBorder, resizable: true  },
    { field: 'Consignment Book Start	', headerName: 'Consignment Book Start	', flex: 1 , headerClassName: classes.blueHeader , cellClassName: classes.columnBorder, resizable: true },
    { field: 'Consignment Book End	', headerName: 'Consignment Book End	', flex: 1 , headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true  },
    { field: 'Consignment Start No	', headerName: 'Consignment Start No		', flex: 1 , headerClassName: classes.blueHeader , cellClassName: classes.columnBorder, resizable: true },
    { field: 'Consignment End No	', headerName: 'Consignment End No		', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true   },
    {field: 'Option',headerName:'Option',flex:1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true  },
    
    
  ];
  
  const rows = [
    {
      id: 1,
      sn: 1,

    }
  ];
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Grid item xs={6} md={2}>
          <Autocomplete
             options={[]}
            // getOptionLabel={(option) => option.label}
            // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
            // value={formik.values.assignedCrew}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch"
                variant="outlined"
                fullWidth
                size="small"
                name="assignedCrew"
                // error={formik.errors.assignedCrew && formik.touched.assignedCrew}
                // helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
                // onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Typography
            sx={{
              fontFamily: 'poppins',
              fontSize: '1.75rem',
              marginBottom: 2,
            }}
          >
            Consignment Range List
          </Typography>
        </Grid>
        <Grid item xs={6} md={2}>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '2px 20px', marginRight: '1%', backgroundColor: 'white' }}>
              <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ width: '150px' }} />
            </div>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }} />

      <Box  sx={{
        height: 500,
        width: '100%',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
>
      <StyledDataGrid
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

export default Range;
