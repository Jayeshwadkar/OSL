import React, { useState, useEffect } from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, } from '@mui/x-data-grid';
import InputBase from '@mui/material/InputBase';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import BlockIcon from '@mui/icons-material/Block';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { getArticleList, deleteArticle, updateFlagStatus, getallArticleList } from '../../../lib/api-master';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import DeleteIcon from '@mui/icons-material/Delete';
import { BiEdit } from "react-icons/bi";
import Icon from '@mdi/react';
import ConfirmationDialog from "../../../components/Notification/ConfirmationDialog"
import CustomSnackbar from '../../../components/ui/SnackbarComponent';
import BusinessIcon from '@mui/icons-material/Business';
import CustomPagination from '../../../components/ui/CustomPagination'



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


function Articles() {
  const [articles, setArticles] = useState([])
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [confirmmessage,setConfirmmessage] = useState("")
  const [isConfirmationopen,setConfirmationopen] = useState(false)
  const [color,setColor]=useState('')

  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });
  const [pageState, setPageState] = useState({
    total: 0,
  });
  const [deleteid,setDeleteid]=useState(null)
  const [searchModel, setSearchModel] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const getJsonData = async () => {
    setIsLoading(true)
    const response = await getArticleList(
      30,
      paginationModel.page,
      paginationModel.pageSize,
      searchModel);
    
    const startIdx = paginationModel.page * paginationModel.pageSize;
    const jsonData = response.data.articles.map((row, index) => ({
      id: row.articles_id,
      sn: startIdx + index + 1,
      status: row.flagStatus,
      ...row
    }))
    const total = response.data.total
    setArticles(jsonData)
    setPageState({ total: total });
    setIsLoading(false)
  }

  useEffect(() => {
    getJsonData();
  }, [paginationModel])


  const handleSearch = () => {
    setPaginationModel({ ...paginationModel, page: 0 }); 
      getJsonData()
  }
  const handleCancelDelete = () => {
    setOpenConfirm(false);
  };
  const handleConfirmDelete = async () => {
    setOpenConfirm(false);
    setIsLoading(true)
    try {
      let response

    if( selectedArticles.length === 0){
       response = await deleteArticle([deleteid])
       setDeleteid(null)
       getJsonData();
       setSelectedArticles([])
       
    }else if(!deleteid){
       response = await deleteArticle(selectedArticles)
    }
      
      if (response.status == 200) {
        setConfirmmessage('Articles delete successfully');
        setConfirmationopen(true);
        setColor('success')
      }else{
        setConfirmmessage('Something Went Wrong!');
        setConfirmationopen(true);
        setColor('error')
      }
      
        getJsonData();
        setSelectedArticles([])
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

  const handleDelete = async () => {
    if (selectedArticles.length > 0) {
      setOpenConfirm(true);
    } else {
      setConfirmmessage('Please select at least one article to delete.');
      setConfirmationopen(true);
       setColor('warning')
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
    setAlertMessage('');
  };
  
  const ActionsCell = ({ id, status }) => {
    const handleEditClick = () => {
      navigate(`/Edit_Articles/${id}`)
    };
    const handleViewClick = () => {
      console.log("View button clicked for row with ID:", id);
    };
    const handlePrintClick = () => {
      console.log("Print button clicked for row with ID:", id);
    };
    const handleToggle = async () => {
      setIsLoading(true)
      const respnse = await updateFlagStatus({ id, status, name: "articles", colname: "articles_id" })
      if (respnse.status == 200) {
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
      <>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
          <Tooltip title="Edit">
            <IconButton style={{ color: 'black' }} onClick={handleEditClick}>
              <BiEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Block">
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
      </>
    );
  };





  const columns = [
    { field: 'sn', headerName: 'SN', flex: 0.1,     resizable: true },
    { field: 'articles_name', headerName: 'Article Name', flex: 0.5,     resizable: true },
    {
      field: 'select',
      headerName: 'Select',
      width: 150,
      renderCell: (params) => (
        <Checkbox color='primary' checked={selectedArticles.includes(params.row.id)} onChange={(event) => handleSelectArticle(event, params.row.id)} />
      ),     resizable: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: "center",
      width: 350, // Increased width to accommodate buttons
      renderCell: (params) => 
      <ActionsCell id={params.row.id} status={params.row.flagStatus} />,     resizable: true
    }
  ];



  const handleClick = () => {
    navigate('/Add_Articles');
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
  setIsLoading(true)
    try {
        const allarticle = await getallArticleList();
      const filteredRows = allarticle.data.map((item, index) => ({
            Srno: index + 1, 
            Article: item.articles_name
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Articles");
        XLSX.writeFile(workbook, "Articles.xlsx");
    } catch (error) {
        console.error("Error exporting to Excel:", error);
    }finally{
      setIsLoading(false)
    }
};

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontFamily: 'Poppins' }}>Articles List</div>
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
            Add Articles
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
  <button
    style={{
    backgroundColor:'green',
      border: 'none',
      padding: '5px 20px',
     color:'#fff',
      textAlign: 'left',
      marginLeft: '0',
      display: 'flex',  // Change to flex to align icon and text
      alignItems: 'center',
      width: 'auto',
      marginRight: '30px',
      whiteSpace: 'nowrap',
    }}
    onClick={exportToExcel}
  >
    <BusinessIcon  style={{ marginRight: '10px' }} />
   
    Export To Excel
  </button>
</div>

            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '2px 20px', marginRight: '2%', backgroundColor: 'white' }}>
              <InputBase placeholder="Search…" style={{ width: '150px' }}
                value={searchModel}
                onChange={(e) =>
                  setSearchModel(e.target.value.trim())
                }
              />
            </div>
            <button onClick={handleSearch} style={{ marginRight:'4px',padding: '5px 10px', color: 'white', background: '#5c6bc0', border: '1px solid transparent', boxShadow: '0 5px 20px #d6dee4', cursor: 'pointer' }}>Serach</button>
            
            <button onClick={handleDelete} style={{ padding: '5px 10px', color: 'white', background: '#5c6bc0', border: '1px solid transparent', boxShadow: '0 5px 20px #d6dee4', cursor: 'pointer' }}>Delete</button>
          </div>
        </div>
        
        <Box sx={{
          height: 590,
          width: '100%',
          
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        >
          
          <StyledDataGrid
                density="compact"
                rows={articles}
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
      <Dialog
        open={alertOpen}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    
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

export default Articles;
