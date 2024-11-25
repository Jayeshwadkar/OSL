import { Autocomplete, Box, Button, Divider, Grid, TextField, Typography, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { addPartNo, updatePartNo, findPartNoById, getCustomersList } from '../../../../lib/api-master';
import { SelectBranch } from '../../../../lib/api-branch';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: '#004aad',
    color: 'white',
  },
});

function Add_Part_No() {
  const { partnoid } = useParams()
  const navigate = useNavigate()
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [customers, setCustomers] = useState([])
  const [customerAuto, setCustomerAuto] = useState("")
  const [branches, setBranches] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [branchAuto, setBranchAuto] = useState("")
  // consignor
  const [formData, setFormData] = useState({
    branch: "",
    consignor_name: "",
    part_no: "",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // consinee
  const [consineePartNo, setConsineePartNo] = useState([])
  const [consineeFormData, setConsineeFormData] = useState({
    sn: "",
    consinee_id: "",
    consinee_name: "",
    consinee_partno: "",
    description: ""
  })
  const [cpId, setCpId] = useState(1)
  const [consigneeNameAuto, setConsigneeNameAuto] = useState("")

  const handleAddConsineePart = () => {
    if (isUpdate) {
      let updatedArr = consineePartNo.map(obj =>
        obj.sn == consineeFormData.sn ? {
          ...obj,
          sn: consineeFormData.sn,
          consinee_id: consineeFormData.consinee_id,
          consinee_name: consineeFormData.consinee_name,
          consinee_partno: consineeFormData.consinee_partno,
          description: consineeFormData.description
        } : obj
      );
      setConsineePartNo(updatedArr)
      setIsUpdate(false)
      handleReset()
    }
    else {
      const newConsinee = { ...consineeFormData, id: cpId, sn: cpId };
      setConsineePartNo((prevUsers) => [...prevUsers, newConsinee]);
      setCpId((prev) => prev + 1)
      handleReset();
    }
  };

  const handleDeleteContactPerson = (idToDelete) => {
    setConsineePartNo((prevUsers) => prevUsers.filter((user) => user.id !== idToDelete));
    setCpId((prev) => prev - 1)
    console.log("dele id con", idToDelete);
  };

  const handleReset = () => {
    setConsineeFormData({
      sn: "",
      consinee_id: "",
      consinee_name: "",
      consinee_partno: "",
      description: ""
    })
    setConsigneeNameAuto("")
  }

  const handleEditContactPerson = (id, sn) => {
    setIsUpdate(true)
    const cp = consineePartNo.filter((user) => user.id == id)
    const cuAuto = customers.filter(x => x.value == cp[0].consinee_id)
    setConsigneeNameAuto({ value: cuAuto[0]?.value || "", label: cuAuto[0]?.label || "" })

    setConsineeFormData({
      sn: cp[0].sn,
      consinee_id: cp[0].consinee_id,
      consinee_name: cp[0].consinee_name,
      consinee_partno: cp[0].consinee_partno,
      description: cp[0].description
    })
  }

  const handleConsineeInputChange = (event) => {
    const { name, value } = event.target;
    setConsineeFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getBranchData = async () => {
    const response = await SelectBranch();
    setBranches(() => {
      const branchOp = response.data.map((row) => {
        return {
          value: row.branch_id || null, label: row.place_name
        };
      });
      return branchOp;
    })
  };

  const getCustomersData = async () => {
    const response = await getCustomersList();
    setCustomers(() => {
      const custdata = response.data.map((row) => {
        return {
          value: row.customer_id, label: row.customer_name
        };
      });
      return custdata;
    })

  }

  const setPartNoData = async () => {
    setIsLoading(true)
    const result1 = await getCustomersList()
    setCustomers(() => {
      const custdata = result1.data.map((row) => {
        return {
          value: row.customer_id, label: row.customer_name
        };
      });
      return custdata;
    })


    const response = await findPartNoById(partnoid)
    // console.log("part id resp : ", response);

    setFormData((prev) => ({ ...prev, part_no: response.data.partNo[0].consignor_partnumber }))

    const customerData = result1.data.map((row) => ({ value: row.customer_id || null, label: row.customer_name }))
    const cuAuto = customerData.filter(x => x.value == response.data.partNo[0].consignor_id)
    setCustomerAuto({ value: cuAuto[0]?.value || "", label: cuAuto[0]?.label || "" })
    setFormData((prev) => ({ ...prev, "consignor_name": cuAuto[0]?.value || "" }))

    const setDetails = response.data.details.map((x, index) => ({
      sn: index + 1,
      id: x.id,
      consinee_id: x.consignee_id,
      consinee_name: x.consigneename,
      consinee_partno: x.consignee_partnumber,
      description: x.description
    }))
    setConsineePartNo(setDetails)
    setCpId(setDetails.length + 1)
    setIsLoading(false)
  }

  useEffect(() => {
    if (partnoid == undefined) {
      getBranchData()
      getCustomersData()
    } else {
      getBranchData()
      // getCustomersData()
      setPartNoData()
    }
  }, [])

  const validate = () => {
    let errors = {};

    if (formData.branch == "") {
      errors.branchError = true
      errors.branch = "Branch  is required";
    }

    if (formData.consignor_name == "") {
      errors.consignor_nameError = true
      errors.consignor_name = "Consignor Name is required";
    }

    if (formData.part_no == "") {
      errors.part_noError = true
      errors.part_no = "Part No is required";
    }


    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  const handleAddPartNo = async () => {
    let response;
    if (!validate()) {
      return;
    }
    else {
      if (partnoid == undefined) {
        // console.log("form data : ", formData);
        setIsLoading(true)
        response = await addPartNo({ ...formData, consineePartNo })
      } else {
        // console.log("form data : ", formData);
        setIsLoading(true)
        response = await updatePartNo({ ...formData, partnoid: Number(partnoid), consineePartNo })
      }
      if (response.status == 200) {
        navigate('/Part_no')
      }
      setIsLoading(false)
    }
  }

  const columns = [
    { field: 'sn', headerName: 'SN', flex: 1, headerClassName: classes.blueHeader },
    { field: 'consinee_name', headerName: 'consignee', flex: 1, headerClassName: classes.blueHeader },
    { field: 'consinee_partno', headerName: 'consignee part no	', flex: 1, headerClassName: classes.blueHeader },
    { field: 'description', headerName: 'Description', flex: 1, headerClassName: classes.blueHeader },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
          <IconButton style={{ color: 'black' }} onClick={() => handleEditContactPerson(params.id, params.row.sn)}>
            <EditIcon />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => handleDeleteContactPerson(params.id)}>
            <DeleteIcon />
          </IconButton>
        </div >
      ),
    },
  ];

 const handleCancel = ()=>{
  navigate('/Part_no')
 }
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            {partnoid != undefined ? "Update Part Number" : "Add Part Number"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end" sx={{ marginTop: 2, marginBottom: '2%' }}>
        <Grid item xs={6} md={2}>
          <Autocomplete
            options={branches}
            getOptionLabel={(option) => option.label || ""}
            // value={branchAuto}
            onChange={(event, value) => {
              // setBranchAuto(value)
              setFormData((prev) => ({ ...prev, "branch": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch"
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.branchError}
                helperText={errors.branchError ? errors.branch : ''}
              />
            )}
          />
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: 'black', marginBottom: '2%' }} />

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={3} >
          <Autocomplete
            options={customers}
            getOptionLabel={(option) => option.label || ""}
            value={customerAuto}
            onChange={(event, value) => {
              setCustomerAuto(value)
              setFormData((prev) => ({ ...prev, "consignor_name": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Consignor Name: "
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={errors.consignor_nameError}
                helperText={errors.consignor_nameError ? errors.consignor_name : ''}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="part_no"
            label="Part No"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.part_no}
            onChange={handleInputChange}
            error={errors.part_noError}
            helperText={errors.part_noError ? errors.part_no : ''}
          />
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>Consinee Part No</Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={3} >
          <Autocomplete
            options={customers}
            getOptionLabel={(option) => option.label || ""}
            value={consigneeNameAuto}
            onChange={(event, value) => {
              setConsigneeNameAuto(value)
              setConsineeFormData((prev) => ({ ...prev, "consinee_name": value?.label || null }))
              setConsineeFormData((prev) => ({ ...prev, "consinee_id": value?.value || null }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                // label="Select Consinee Part No"
                label="Select Consinee Name"
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
              //error={formik.errors.assignedCrew && formik.touched.assignedCrew}
              //helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
              //onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="consinee_partno"
            label="Consinee Part No"
            fullWidth
            variant="outlined"
            size='small'
            value={consineeFormData.consinee_partno}
            onChange={handleConsineeInputChange}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            className="customTextField"
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
            size='small'
            value={consineeFormData.description}
            onChange={handleConsineeInputChange}
          />
        </Grid>
      </Grid>

      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
        <Grid item>
          <Button variant="contained" color="success" style={{ padding: '5px 50px' }}
            onClick={handleAddConsineePart}
          >
            {isUpdate ? "Update" : "Add"}
          </Button>
        </Grid>
      </Grid>

      <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

      <Box sx={{ height: 200, width: '100%', marginBottom: '2%' }}>
        <DataGrid
          rows={consineePartNo}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}

        />
      </Box>

      <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
            onClick={handleAddPartNo}
          >
            {partnoid != undefined ? "Update" : "Add"}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" style={{ backgroundColor: '#D92445' }} onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>

      </Grid>

    </>
  )
}

export default Add_Part_No
