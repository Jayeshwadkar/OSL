import { Autocomplete, Button, Divider, Grid, TextField, Typography, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addArticle, findArticleById, updateArticle } from '../../../../lib/api-master';
import { SelectBranch } from '../../../../lib/api-branch';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';


function Add_Articles() {

  const [articleName, setArticleName] = useState("")
  const [artNamEerror, setArtNameError] = useState(false)
  const [branches, setBranches] = useState([])
  const [branchId, setBranchId] = useState(null)
  const [articleData, setArticleData] = useState()
  const [branchName, setBranchName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { articleId } = useParams();
  const navigate = useNavigate();

  const getBranchData = async () => {
    const response = await SelectBranch();
    setBranches(() => {
      const branchOp = response.data.map((row) => {
        return {
          value: row.branch_id, label: row.branch_name
        };
      });
      return branchOp;
    })
  };
useEffect(()=>{
  getBranchData() 
},[])

  const setArticle_Data = async () => {
    setIsLoading(true)

    const result = await findArticleById(articleId)
    
    setArticleName(result.data.articles_name)
    const bid = result.data.branch
    if(branches.length != 0){
      const Autocomplevalue = branches.filter((item) => item.value == bid || null);
      setBranchName({ value: Autocomplevalue[0].value, label: Autocomplevalue[0].label })
    }else{
      getBranchData()
    }
   
    setIsLoading(false)
  }

  useEffect(() => {
   
    if (articleId && branches) {
      setArticle_Data();
    }
  }, [articleId,branches])

  const handleCancel = () => {
    navigate('/Articles'); 
  }

  const handleAddArticle = async () => {
   const branch_id= branchName.value
   
    setIsLoading(true)
    if (articleName == "" && branchName == "") {
      setArtNameError(true)
      setIsLoading(false)
    }
    else {
      let response;
      if (articleId == undefined) {
        response = await addArticle({ articleName: articleName, branchId: branchId })
      } else {
        console.log(branch_id,branchId)
        response = await updateArticle({ articleName: articleName, branchId: branch_id || branchId, articleId: articleId })
      }
      if (response.status == 200) {
        setIsLoading(false)
        navigate('/Articles')
      }
    }
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid container justifyContent="center">
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
          >
            {articleId !== undefined ? "Update Articles" : "Add Articles"}

          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end" sx={{ marginTop: 2, marginBottom: '2%' }}>
        <Grid item xs={6} md={2}>
          <Autocomplete
            options={branches}
            getOptionLabel={(option) => option.label || ""}
            value={branchName || null}
            onChange={(event, value) => {
              setBranchName(value); // Update branchName state with the selected value
              setBranchId(value?.value || null); // Assuming setBranchId sets the branch id somewhere else
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch"
                variant="outlined"
                fullWidth
                size='small'
                name="assignedCrew"
                error={artNamEerror}
                helperText={artNamEerror ? "Please select branch" : ""}
              //error={formik.errors.assignedCrew && formik.touched.assignedCrew}
              //helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
              //onBlur={formik.handleBlur}
              />
            )}
          />
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: 'black', marginBottom: '2%' }} />

      <Grid container spacing={1} sx={{ marginTop: '0px', marginBottom: '2%' }}>
        <Grid item xs={6}>
          <TextField
            className="customTextField"
            name="Article Name"
            label="Article Name"
            fullWidth
            variant="outlined"
            size='small'
            error={artNamEerror}
            helperText={artNamEerror ? "Please enter article name" : ""}
            // error={formik.errors.wrNo && formik.touched.wrNo}
            // helperText={formik.touched.wrNo ? formik.errors.wrNo : ''}
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
            // value={formik.values.wrNo}
            value={articleName}
            onChange={(e) => { setArticleName(e.target.value) }}
          />
        </Grid>

        {/* <Grid item xs={6}>
        </Grid> */}
        <Grid item>
          <Button
            variant="contained" color="primary" style={{ backgroundColor: '#6573c3' }}
            onClick={handleAddArticle}
          >
            {articleId !== undefined ? "Update" : "Add"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#D92445' }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>

      {/* <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#6573c3', borderRadius: '50px' }}>
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#D92445', borderRadius: '50px' }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Grid>

      </Grid> */}

    </>
  )
}

export default Add_Articles
