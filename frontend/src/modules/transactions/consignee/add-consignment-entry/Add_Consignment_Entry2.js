import { Autocomplete,  Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles,styled } from '@mui/styles';
import dayjs from 'dayjs';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSnackbar from '../../../../components/ui/SnackbarComponent';


// const useStyles = makeStyles({
//     blueHeader: {
//       backgroundColor: '#004aad',
//       color: 'white',
//     },
//   });
  

function Add_Consignment_Entry2({
  handlerowsData,
  articles
}) {
  const [editMode, setEditMode] = useState(false);
      const [rows, setRows] = useState([])
      const [selectedArticle, setSelectedArticle] = useState(null);
      const [editId, setEditId] = useState(null);
      const [confirmmessage,setConfirmmessage] = useState("")
      const [isConfirmationopen,setConfirmationopen] = useState(false)
      const [color,setColor]=useState('')
      const [formData,setFormData]=useState({
        invno:'',
        invdate:dayjs().format("YYYY-MM-DD HH:mm:ss"),
        ewaybillno:'',
        description:'',
        consigneepartno:'',
        noarticles:0,
        article:'',
        quantity:0,
        invamt:0,
        cftL:0,
        cftW:0,
        cftH:0,
        CFTConvFactor:0,
        CFT:0,
        ActWt:0,
        CharWt:0,
        Rateper:'fixed',
        Rate:0,
        Ewaydate:dayjs().format("YYYY-MM-DD HH:mm:ss"),
        EwayBillExpDate:dayjs().format("YYYY-MM-DD HH:mm:ss"),
      })
    const columns = [
        { field: 'id', headerName: 'SN', flex: 0.1,  },
        {
          field: 'invNo',
          headerName: 'InvNo',
          flex: 0.1, 
        },
        {
          field: 'invDate',
          headerName: 'InvDate',
          flex: 0.1,
          renderCell: (params) => {
            const date = new Date(params.value);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            
            return `${day}-${month}-${year}`;
          },
        },
        
        {
          field: 'EwayNo',
          headerName: 'Eway No	',
          flex: 0.1, 
        },
        {
          field: 'EwayDate',
          headerName: 'Eway Date',
          flex: 0.1,
          renderCell: (params) => {
            const date = new Date(params.value);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            
            return `${day}-${month}-${year}`;
          },
        },
        {
          field: 'EwayExpDate',
          headerName: 'Eway Exp Date',
          flex: 0.1,
          renderCell: (params) => {
            const date = new Date(params.value);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            
            return `${day}-${month}-${year}`;
          },
        },
        {
          field: 'ConsignorPartNo',
          headerName: 'Consignor Part No	',
          sortable: false,
          flex: 0.1, 
        },
        {
          field: 'ConsigneePartNo',
          headerName: 'Consignee Part No	',
          sortable: false,
          flex: 0.1, 
        },
        {
          field: 'Desc',
          headerName: 'Desc',
          sortable: false,
          flex: 0.5, 
        },
        {
          field: 'Articles',
          headerName: 'Articles',
          sortable: false,
          flex: 0.6, 
        },
        {
          field: 'NoArticles',
          headerName: 'No. Articles	',
          sortable: false,
          flex: 0.1, 
        },
        {
          field: 'Qty',
          headerName: 'Qty',
          sortable: false,
          flex: 0.1, 
        },
        {
          field: 'InvAmt',
          headerName: 'Inv Amt	',
          sortable: false,
          flex: 0.1, 
        },
        {
          field: 'CFT(L)',
          headerName: 'CFT (L)	',
          sortable: false,
          flex: 0.1, 
        },
        {
          field: 'CFT(W)',
          headerName: 'CFT (W)	',
          sortable: false,
          flex: 0.1, 
        },
        {
          field: 'CFT(H)',
          headerName: 'CFT (H)	',
          sortable: false,
          flex: 0.2, 
        },
        {
          field: 'CFTConvFactor',
          headerName: 'CFTConvFactor',
          sortable: false,
          flex: 0.2, 
        },
        {
          field: 'CFT',
          headerName: 'CFT	',
          sortable: false,
          flex: 0.2, 
        },
        {
          field: 'ActWt',
          headerName: 'Act. Wt		',
          sortable: false,
          flex: 0.1, 
        },
        {
          field: 'CharWt',
          headerName: 'Char. Wt		',
          sortable: false,
          flex: 0.1, 
        },
        {
          field: 'RatePer',
          headerName: 'Rate Per	',
          sortable: false,
          flex: 0.2, 
        },
        {
          field: 'Rate',
          headerName: 'Rate',
          sortable: false,
          flex: 0.1,
          renderCell: (params) => {
            const rate = params.value;
            return (
              <div>
                ₹ {rate}
              </div>
            );
          },
        },        
        {
          field: 'Action',
          headerName: 'Action',
          sortable: false,
          flex: 1,
           
          renderCell: (params) => (
            <>
              <IconButton
                onClick={() => handleEditClick(params.row)} 
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteClick(params.row.id)}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )
        }
      ];
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleAutocompleteChange = (type, event, value) => {
        let selectedType;
      
        if (type === 'article') {
          
          selectedType = articles.find((item) => item.articles_name === value);
          setFormData({
            ...formData,
            article: selectedType ? selectedType.articles_name : "",
          });
          setSelectedArticle(selectedType.articles_name);
        } else {
          setFormData({
            ...formData,
            articles: "",
          });
          setSelectedArticle(null);
        } 
       
      };
      const handleDateChange = (date,fieldName) => {
        if (!date) {
          console.error("handleDateChange: Invalid date received:", date);
          return;
        }
      
        if (!dayjs.isDayjs(date)) {
          console.error("handleDateChange: Date is not a Day.js object:", date);
      
          date = dayjs(date);
        }
      
        const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");
      
        setFormData((prevData) => ({
          ...prevData,
          [fieldName]: formattedDate,
        }));
      };
      useEffect(() => {
        handlerowsData(rows);
      }, [rows]);
      const handleEditClick = (row) => {
        setEditMode(true);
        setEditId(row.id);
console.log(row)
        setFormData({
          ...formData,
          invno: row["invNo"],
          invdate: row["invDate"],
          ewaybillno: row["EwayNo"],
          Ewaydate: row["EwayDate"],
          EwayBillExpDate: row["EwayExpDate"],
          ConsigneePartNo: row["ConsigneePartNo"],
          description: row["Desc"],
          article: row["Articles"],
          noarticles: row["NoArticles"],
          quantity: row["Qty"],
          invamt: row["InvAmt"],
          cftL: row["CFT(L)"],
          cftW: row["CFT(W)"],
          cftH: row["CFT(H)"],
          CFTConvFactor: row["CFTConvFactor"],
          CFT: row["CFT"],
          ActWt: row["ActWt"],
          CharWt: row["CharWt"],
          Rateper: row["RatePer"],
          Rate: row["Rate"],
        });
       setSelectedArticle(row["Articles"]);
      };
      const handleAddClick = () => {
        if (!formData.article) {
          setConfirmmessage("Please Select article first!!!");
          setConfirmationopen(true);
          setColor('warning')
          return;
        }
        
        if (editMode) {
          console.log(rows)
          const updatedRows = rows.map((row) =>
            row.id === editId
              ? {
                  ...row,
                  invNo: formData.invno,
                  invDate: formData.invdate,
                  EwayNo: formData.ewaybillno,
                  EwayDate: formData.Ewaydate,
                  EwayExpDate: dayjs(formData.EwayBillExpDate),
                  ConsignorPartNo: "",
                  ConsigneePartNo: formData.consigneepartno,
                  Desc: formData.description,
                  Articles:formData.article,
                  NoArticles:formData.noarticles,
                  Qty:formData.quantity,
                  InvAmt:formData.invamt,
                  "CFT(L)":formData.cftL,
                 "CFT(W)":formData.cftW,
                 "CFT(H)":formData.cftH,
                 CFTConvFactor:formData.CFTConvFactor,
                 CFT:formData.CFT,
                 ActWt:formData.ActWt,
                 CharWt:formData.CharWt,
                 RatePer:formData.Rateper,
                 Rate:formData.Rate,
                }
              : row
          );
          setRows(updatedRows);
          setEditMode(false);
          setEditId(null);
        } else {
          // Add new row
          const newRow = {
            id: rows.length + 1,
            invNo: formData.invno,
            invDate: formData.invdate,
            EwayNo: formData.ewaybillno,
            EwayDate: formData.Ewaydate,
            EwayExpDate: formData.EwayBillExpDate,
            ConsignorPartNo: "",
            ConsigneePartNo: formData.consigneepartno,
            Desc: formData.description,
            Articles:formData.article,
            NoArticles:formData.noarticles,
            Qty:formData.quantity,
            InvAmt:formData.invamt,
            "CFT(L)":formData.cftL,
           "CFT(W)":formData.cftW,
           "CFT(H)":formData.cftH,
           CFTConvFactor:formData.CFTConvFactor,
           CFT:formData.CFT,
           ActWt:formData.ActWt,
           CharWt:formData.CharWt,
           RatePer:formData.Rateper,
           Rate:formData.Rate,
          };
          const updatedRows = [...rows, newRow];
          setRows(updatedRows);
        }
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          invno:'',
          invdate:dayjs().format("YYYY-MM-DD HH:mm:ss"),
          ewaybillno:'',
          description:'',
          consigneepartno:'',
          noarticles:0,
          quantity:0,
          invamt:0,
          cftL:0,
          cftW:0,
          cftH:0,
          CFTConvFactor:0,
          CFT:0,
          ActWt:0,
          CharWt:0,
          Rateper:'fixed',
          Rate:0,
          Ewaydate:dayjs().format("YYYY-MM-DD HH:mm:ss"),
          EwayBillExpDate:dayjs().format("YYYY-MM-DD HH:mm:ss"),
        }));
    
        setSelectedArticle(null);
      };
      const handleDeleteClick = (id) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        const resetRows = updatedRows.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setRows(resetRows);
      
      };
  return (
   <>
    <CustomSnackbar
        open={isConfirmationopen}
        message={confirmmessage}
        onClose={() => setConfirmationopen(false)}
        color={color}
      />
      <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={2} style={{marginLeft:'0.1%',fontSize:'20px',fontFamily:'Poppins',marginBottom:'1.5%'}}>Transactions Details</Grid>

<Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

<Grid container spacing={1} sx={{ marginTop: '2px',marginBottom:'2%' }}>
  
<Grid item xs={12} sm={2.4}>
  
  <TextField
    className="customTextField"
    name="invno"
    label="Inv. No"
    fullWidth
    variant="outlined"
    value={formData.invno}
    size='small'
    onChange={handleInputChange}
  />
</Grid>

<Grid item xs={12} sm={2.4}>
        <Box >
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="invdate"
                format="DD-MM-YYYY"
                label="Inv Date "
                value={dayjs(formData.invdate)}
                onChange={(date) => handleDateChange(date, "invdate")}
                
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12} sm={2.4}>
  
  <TextField
    className="customTextField"
    name="ewaybillno"
    label="E-way Bill No"
    fullWidth
    value={formData.ewaybillno}
    variant="outlined"
    size='small'
    onChange={handleInputChange}
  />
</Grid>

<Grid item xs={12} sm={2.4}>
        <Box >
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="Ewaydate"
                format="DD-MM-YYYY"
                label="E-way Date "
                value={dayjs(formData.Ewaydate)}
                onChange={(date) => handleDateChange(date, "Ewaydate")}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12} sm={2.4}>
        <Box >
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="EwayBillExpDate"
                format="DD-MM-YYYY"
                label="E-way Bill Exp Date"
                value={dayjs(formData.EwayBillExpDate)}
                onChange={(date) => handleDateChange(date, "EwayBillExpDate")}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12} sm={2.4}>
        
    <Autocomplete
     options={[]}
      // getOptionLabel={(option) => option.label}
      // onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
      // value={formik.values.assignedCrew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Consignor Part No "
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

  <Grid item xs={12} sm={2.4}>
  
  <TextField
    className="customTextField"
    name="description"
    label="Description"
    fullWidth
    value={formData.description}
    variant="outlined"
    size='small'
    onChange={handleInputChange}
  />
</Grid>

<Grid item xs={12} sm={2.4}>
  
  <TextField
    className="customTextField"
    name="consigneepartno"
    label="Consignee Part No"
    value={formData.consigneepartno}
    fullWidth
    variant="outlined"
    size='small'
    onChange={handleInputChange}
  />
</Grid>

<Grid item xs={12} sm={2.4}>
<Autocomplete
value={selectedArticle}
      options={
        articles ? articles.map((type) => type.articles_name) : []
      }
      renderInput={(params) => (
        <TextField
          {...params}
          name="article"
          variant="outlined"
          label="Articles:"
          size="small"
          
          fullWidth
        />
      )}
      onChange={(event, value) =>
        handleAutocompleteChange('article',event, value)
      }
    />
  
      
      </Grid>

  <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="noarticles"
            label="No.Articles"
            fullWidth
            value={formData.noarticles}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="quantity"
            label="Quantity"
            fullWidth
            value={formData.quantity}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="invamt"
            label="Inv Amt"
            fullWidth
            value={formData.invamt}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="cftL"
            label="CFT(L)"
            fullWidth
            value={formData.cftL}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="cftW"
            label="CFT(W)"
            fullWidth
            value={formData.cftW}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="cftH"
            label="CFT(H)"
            fullWidth
            value={formData.cftH}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="CFTConvFactor"
            label="CFT Conv. Factor"
            fullWidth
            value={formData.CFTConvFactor}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="CFT"
            label="CFT"
            fullWidth
            value={formData.CFT}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="ActWt"
            label="Act.Wt"
            fullWidth
            value={formData.ActWt}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
  
          <TextField
            className="customTextField"
            name="CharWt"
            label="Char.Wt"
            fullWidth
            value={formData.CharWt}
            variant="outlined"
            size='small'
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={2.4}>
        <TextField
  className="customTextField"
  sx={{
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  }}
  name="Rateper"
  label="Rate per:"
  fullWidth
  value={formData.Rateper}
  variant="outlined"
  size="small"
  onChange={handleInputChange}
  select 
>
  <MenuItem value="fixed">Fixed</MenuItem>
  <MenuItem value="kg">Kg</MenuItem>
  <MenuItem value="case">Case</MenuItem>
  <MenuItem value="pics">Pics</MenuItem>
</TextField>
   
  </Grid>
  <Grid item xs={12} sm={2.4}>
 
          <TextField
            className="customTextField"
            name="Rate"
            label="Rate"
            fullWidth
            value={formData.Rate}
            onChange={handleInputChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  &#8377;
                </InputAdornment>
              ),
            }}
            size='small'
          />
        </Grid>
  </Grid>


  <Grid container sx={{justifyContent:'center',alignItems:'center',marginBottom:'2%'}}>
      <Grid item>
        <Button variant="contained" color="success" style={{padding:'5px 50px'}} onClick={handleAddClick}>{editMode ? "Update" : "Add"}</Button>
      </Grid>
    </Grid>

    <Divider style={{backgroundColor:'black',marginBottom:'2%'}}></Divider>

    <Grid marginBottom={2}>
    <DataGrid
          autoHeight
          density="compact"
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}

        />
    </Grid>
   </>
  )
}

export default Add_Consignment_Entry2
