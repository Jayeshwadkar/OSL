import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Box, Button, Checkbox, IconButton, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import BlockIcon from '@mui/icons-material/Block';
import Tooltip from '@mui/material/Tooltip';
import { getPlacesList, deletePlace, updateFlagStatus, getAllPlacesList } from '../../../lib/api-master';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { BiEdit } from "react-icons/bi";
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import CustomPagination from '../../../components/ui/CustomPagination';
import * as XLSX from 'xlsx';
import ConfirmationDialog from "../../../components/Notification/ConfirmationDialog"
import CustomSnackbar from '../../../components/ui/SnackbarComponent';
const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#f8f5f6',
    color: '#000',
  },
  columnBorder: {
    borderRight: '1px solid #ccc', // Add border to the right of each column cell
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
}));




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
}));




function Places() {
  const classes = useStyles();
  const [places, setPlaces] = useState([])
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [alert, setAlert] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [confirmmessage,setConfirmmessage] = useState("")
  const [isConfirmationopen,setConfirmationopen] = useState(false)
  const [color,setColor]=useState('')
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const [deleteid,setDeleteid]=useState(null)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });
  const [pageState, setPageState] = useState({
    total: 0,
  });
  const [searchModel, setSearchModel] = useState(null);

  const getJsonData = async () => {
    setIsLoading(true)
    const response = await getPlacesList(
      paginationModel.page,
      paginationModel.pageSize,
      searchModel
    );
     
    const startIdx = paginationModel.page * paginationModel.pageSize;
    const jsonData = response.data.place.map((row, index) => ({
      sn: startIdx + index + 1,
      id: row.place_id,
      name: row.place_name,
      distance: row.place_abbreviation,
      status: row.flagStatus
    }))
    setPlaces(jsonData)
    const total = response.data.total
    setPageState({ total: total });
    setIsLoading(false)
  }

  useEffect(() => {

    getJsonData();
  }, [paginationModel])

  const handleSearch = (event) => {
    setPaginationModel({ ...paginationModel, page: 0 }); 
    getJsonData();
  }


  const handleSelectArticle = (event, sn) => {
    const { checked } = event.target;
    if (checked == true) {
      setSelectedArticles((prevSelectedRows) => [...prevSelectedRows, sn]);
    } else {
      setSelectedArticles((prevSelectedRows) =>
        prevSelectedRows.filter((row) => row !== sn)
      );
    }
  };
  const handleCancelDelete = () => {
    setOpenConfirm(false);
  };
  const handleConfirmDelete = async () => {
    setOpenConfirm(false);
    setIsLoading(true)
    try {
      let response
      if( selectedArticles.length === 0){
        response = await deletePlace([deleteid])
        setDeleteid(null)
        getJsonData();
        setSelectedArticles([])
        
     }else if(!deleteid){
        response = await deletePlace(selectedArticles)
     }
     
      if (response.status == 200) {
        let msg = "Place already in use : ";
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            msg += response.data[i] + ","
          }
          
          setConfirmmessage(msg);
          setConfirmationopen(true);
          setColor('warning')
        }else{
          setConfirmmessage('Place delete successfully');
          setConfirmationopen(true);
          setColor('success')
        }
        getJsonData();
        setSelectedArticles([])
        
      }
      // setPaginationModel((prevPaginationModel) => ({
      //   ...prevPaginationModel,
      //   page: 0,
      // }));

    } catch (error) {
      console.error("Error deleting articles:", error);
    } finally {
      
      setIsLoading(false)
    }
  };
  const handleDelete = async () => {
    if (selectedArticles.length > 0) {
      setOpenConfirm(true);
    } else {
      setConfirmmessage('No places selected for deletion.');
      setConfirmationopen(true);
       setColor('warning')
    }
  };
 

  const ActionsCell = ({ id, status }) => {
    const handleEditClick = () => {
      console.log("Edit button clicked for row with ID:", id);
      navigate(`/Edit_places/${id}`);
    };
    const handleViewClick = () => {
      console.log("View button clicked for row with ID:", id);
    };
    const handlePrintClick = () => {
      console.log("Print button clicked for row with ID:", id);
    };
    const handleToggle = async () => {
      setIsLoading(true)
      const response = await updateFlagStatus({ id, status, name: "place", colname: "place_id" })
      if (response.status == 200) {
        getJsonData()
      }
    };
    const handlerowDelete =  () => {
      if( selectedArticles.length === 0){
      
        setDeleteid(id)
      }
      
      console.log(id)
    setOpenConfirm(true);
  
};
    return (
      <div style={{ display: 'flex', gap: '2px', justifyContent: 'left' }}>
        <Tooltip title="Edit">
          <IconButton
            style={{ color: 'black' }}
            onClick={handleEditClick}
          >
            <BiEdit />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="View">
          <IconButton
            style={{ color: 'black' }}
            onClick={handleViewClick}
          >
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip> */}
        {/* <Tooltip title="Print">
          <IconButton
            style={{ color: 'black' }}
            onClick={handlePrintClick}
          >
            <PrintIcon />
          </IconButton>
        </Tooltip> */}
        <Tooltip title="Block">
          {/* <IconButton
            style={{ color: 'red' }}
            onClick={handleBlockClick}
          >
            <BlockIcon />
          </IconButton> */}
          <Switch
            checked={status}
            onChange={handleToggle}
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
        <Tooltip title="Delete">
          <IconButton style={{ color: 'red' }}>
            <DeleteIcon onClick={handlerowDelete}/>
          </IconButton>
        </Tooltip>
      </div>

    );
  };




  const columns = [
    { field: 'sn', headerName: 'SN', flex: 0.2, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'name', headerName: 'Place Name', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    { field: 'distance', headerName: 'Distance(KM)', flex: 1, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true },
    {
      field: 'select',
      headerName: 'Select',
      flex: 0.2,
      renderCell: (params) => (
        <Checkbox color="primary" onChange={(event) => handleSelectArticle(event, params.row.id)} />
      ), headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width:350,
      renderCell: (params) => <ActionsCell id={params.row.id} status={params.row.status} />, headerClassName: classes.blueHeader, cellClassName: classes.columnBorder, resizable: true
    },
  ];

  const handleClick = () => {
    navigate('/Add_Places');
  };

  const handleRowsPerPageChange = (event) => {
    setPaginationModel({
      ...paginationModel,
      pageSize: parseInt(event.target.value, 100),
      page: 0,
    });
  };

  const handlePageChange = (newPage) => {
    setPaginationModel({
      ...paginationModel,
      page: newPage,
    });
  };
  const exportToExcel = async () => {
  
    try {
        const allarticle = await getAllPlacesList();
        
      const filteredRows = allarticle.data.map((item, index) => ({
            Srno: index + 1, 
            Place: item.place_name,
            Distance:item.place_abbreviation
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Place");
        XLSX.writeFile(workbook, "Place.xlsx");
    } catch (error) {
        console.error("Error exporting to Excel:", error);
    }
};
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontFamily: 'Poppins, sans-serif' }}>Places List</div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <button
            style={{
              backgroundColor: '#20c997',
              border: 'none',
              padding: '10px 20px',
              color: '#fff',
              textAlign: 'left',
              marginLeft: '0',
              display: 'block',
              width: 'auto'
            }}
            onClick={handleClick}
          >
            Add Places
          </button>


          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                backgroundColor: 'green',
                border: 'none',
                padding: '5px 20px',
                color: '#fff',
                textAlign: 'left',
                marginLeft: '0',
                display: 'flex',  // Change to flex to align icon and text
                alignItems: 'center',
                width: 'auto',
                marginRight: '20px',
                whiteSpace: 'nowrap',
              }}
              onClick={exportToExcel}
            >
              <BusinessIcon style={{ marginRight: '10px' }} />

              Export To Excel
            </button>

            <Search style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '2px 20px', marginRight: '2%', backgroundColor: 'white' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                style={{ width: '150px' }}
                value={searchModel}
                onChange={(e) =>
                  setSearchModel(e.target.value.trim())
                }
              />
            </Search>
            <button onClick={handleSearch} style={{ marginRight:'4px',padding: '5px 10px', color: 'white', background: '#5c6bc0', border: '1px solid transparent', boxShadow: '0 5px 20px #d6dee4', cursor: 'pointer' }}>Serach</button>
            
            <button onClick={handleDelete} style={{ padding: '5px 10px', color: 'white', background: '#5c6bc0', border: '1px solid transparent', boxShadow: '0 5px 20px #d6dee4', cursor: 'pointer' }}>Delete</button>
          </div>
        </div>
        {alert && <div style={{ color: 'orange', textAlign: 'center', marginBottom: '20px' }}>{alert}</div>}
        {/* <div style={{ height: 800, width: '100%' }}>

          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[20]}
            disableSelectionOnClick
          />
        </div> */}

        <Box sx={{
          height: 590,
          width: '100%',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        >
          <StyledDataGrid
            density='compact'
            rows={places}
            columns={columns}
            hideFooter={true}
          />
            <CustomPagination
                page={paginationModel.page}
                rowsPerPage={paginationModel.pageSize}
                count={pageState.total}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Box>

      </div>

 
      <CustomSnackbar
        open={isConfirmationopen}
        message={confirmmessage}
        onClose={() => setConfirmationopen(false)}
        color={color}
      />
          <ConfirmationDialog
        open={openConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        messages={["Are you sure?", "You won't be able to revert this!"]}
      />
    </>
  );
}

export default Places;
