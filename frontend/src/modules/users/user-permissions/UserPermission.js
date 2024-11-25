import { Autocomplete, Button, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import backgroundImage from '../../Image/Antivirus.jpg'; // Adjust the path to where the image is located
import { useNavigate, useParams } from 'react-router-dom';
import { SelectBranch } from '../../../lib/api-branch';
import { getUserList, getUserPermissions, getUserDetails, updateUserPermission } from '../../../lib/api-user';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

function UserPermission() {

  const { username } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [permissions, setPermissions] = useState([])
  const [branches, setBranches] = useState([])
  const [selectedBranch, setSelectedBranch] = useState("")
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [branchId, setBranchId] = useState(undefined)
  const [userId, setUserId] = useState(undefined)
  const [masterCheck, setMasterCheck] = useState([])
  const [operationsCheck, setOperationsCheck] = useState([])
  const [salesCheck, setSalesCheck] = useState([])
  const [accountCheck, setAccountCheck] = useState([])
  const [consignmentCheck, setConsignmentCheck] = useState([])
  const [reportsCheck, setReportsCheck] = useState([])

  const sections = [
    { heading: 'Master', rows: ['Article', 'Places', 'Branches', 'Customer', 'Employee', 'Driver', 'Vehicle', 'Vehicle Types', 'Transporter', 'PO Customer', 'Part Number', 'GST Master', 'TDS Master'], name: ["MART", "MPL", "MBR", "MCUS", "MDV", "MEMP", "MVC", "MVCO", "MVT", "MPOC", "MPN", "MGST", "MTDS"] },
    { heading: 'Operations', rows: ['Consignment', 'Delivery Challan', 'Vehicle Hire', 'Unloading', 'Proof of Delivery'], name: ["TLR", "TDC", "TFM", "TIR", "TPOD", "TPODR"] },
    { heading: 'Account', rows: ['Transporter Bill'], name: ["TRANSB"] },
    { heading: 'Sales', rows: ['Purchase Order', 'Sales Invoice', 'LR Bill Receipt'], name: ["PPO", "PSI", "LRB"] },
    { heading: 'Reports', rows: ['MIS', 'STOCK', 'Operation', 'Proof of Delivery', 'Account', 'Sales', 'Master'], name: ["RMIS", "RSTOCK", "RLRDW", "RPOD", "RTRB", "RBL", "RMST", "RLRBW", "RLRCW", "RDCDW", "RDCBW", "RDCVW", "RCFM", "RLFM", "RCEFM", "RPO", "RSI1"] },
    { heading: 'Consignment', rows: ['Blank Consignment List', 'Consignment Range List', 'Add Consignment Range'], name: ["CBCL", "CCRL", "CACR"] }
  ];

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

  const setUserList = async () => {
    setIsLoading(true)
    const response = await getUserList(branchId)

    const jsonData = response.data.map((row, index) => ({
      value: row.id,
      // label: row.employee_name,
      label: row.username,
    }))
    setUsers(jsonData)
    setIsLoading(false)
  }

  const permissionsData = async () => {
    setIsLoading(true)
    const response = await getUserPermissions(userId)
    // console.log("permissions response : ", response.data);
    setPermissions(response.data)

    let masterArray = response.data.filter(row => row.permission == null ? "" : row.permission[0] == "M")
    let operationArray = response.data.filter(row => row.permission == null ? "" : (row.permission[0] == "T" && (row.permission != "TRANSB" && row.permission != "TXN")))
    let accountArray = response.data.filter(row => row.permission == null ? "" : row.permission == "TRANSB")
    let salesArray = response.data.filter(row => row.permission == null ? "" : (row.permission[0] == "P" || row.permission == "LRB"))
    let reportsArray = response.data.filter(row => row.permission == null ? "" : (row.permission[0] == "R" && (row.permission != "REGB" && row.permission != "RPT" && row.permission != "RSI2")))
    let consignmentArray = response.data.filter(row => row.permission == null ? "" : row.permission[0] == "C")
    // console.log("Reports : ", reportsArray);


    let master = sections[0].name.map(item1 => {
      const match = masterArray.find(item2 => item2.permission == item1);
      if (match) {
        return ({ id: userId, name: item1, view: match.STATUS == 1 ? true : false, edit: match.edit == 1 ? true : false })
      }
      return ({ id: userId, name: item1, view: false, edit: false })
    });
    setMasterCheck(master)

    let operations = sections[1].name.map(item1 => {
      const match = operationArray.find(item2 => item2.permission == item1);
      if (match) {
        return ({ id: userId, name: item1, view: match.STATUS == 1 ? true : false, edit: match.edit == 1 ? true : false })
      }
      return ({ id: userId, name: item1, view: false, edit: false })
    });
    setOperationsCheck(operations)

    let sales = sections[3].name.map(item1 => {
      const match = salesArray.find(item2 => item2.permission == item1);
      if (match) {
        return ({ id: userId, name: item1, view: match.STATUS == 1 ? true : false, edit: match.edit == 1 ? true : false })
      }
      return ({ id: userId, name: item1, view: false, edit: false })
    });
    setSalesCheck(sales)

    let account = sections[2].name.map(item1 => {
      const match = accountArray.find(item2 => item2.permission == item1);
      if (match) {
        return ({ id: userId, name: item1, view: match.STATUS == 1 ? true : false, edit: match.edit == 1 ? true : false })
      }
      return ({ id: userId, name: item1, view: false, edit: false })
    });
    setAccountCheck(account)

    let reports = sections[4].name.map(item1 => {
      const match = reportsArray.find(item2 => item2.permission == item1);
      if (match) {
        return ({ id: userId, name: item1, view: match.STATUS == 1 ? true : false, edit: match.edit == 1 ? true : false })
      }
      return ({ id: userId, name: item1, view: false, edit: false })
    });
    setReportsCheck(reports)

    let consignment = sections[5].name.map(item1 => {
      const match = consignmentArray.find(item2 => item2.permission == item1);
      if (match) {
        return ({ id: userId, name: item1, view: match.STATUS == 1 ? true : false, edit: match.edit == 1 ? true : false })
      }
      return ({ id: userId, name: item1, view: false, edit: false })
    });
    setConsignmentCheck(consignment)

    setIsLoading(false)

  }

  const setUserData = async () => {
    setIsLoading(true)
    const response = await getUserDetails(username)
    const response2 = await SelectBranch()
    setUserId(response.data[0].id)
    setBranchId(response.data[0].branch)

    const branchOp = response2.data.filter(row => row.branch_id == response.data[0].branch).map(row1 => ({
      value: row1.branch_id, label: row1.branch_name
    }));
    setSelectedBranch(branchOp[0])
    setSelectedUser({ value: 1, label: response.data[0].username })
    setIsLoading(false)
  }

  useEffect(() => {
    if (username == undefined) {
      getBranchData()
    } else {
      setUserData()
    }
  }, [])

  useEffect(() => {
    if (username == undefined) {
      setUserList()
      setSelectedUser("")
    }
  }, [branchId])

  useEffect(() => {
    if (userId != undefined || username != undefined) {
      permissionsData()
    } else {
      permissionsData()
    }
  }, [userId])

  const handleCancel = () => {
    navigate('/user-registration')
  }

  const handleViewChange = (index, stateArr, setStateArr) => (event) => {
    const newSwitchStates = [...stateArr]; // Create a copy of the state
    if (setStateArr == setOperationsCheck && index == 4) {
      newSwitchStates[index].view = event.target.checked;
      newSwitchStates[index + 1].view = event.target.checked;
    } else if (setStateArr == setReportsCheck) {
      if (index == 0) { newSwitchStates[index].view = event.target.checked }
      if (index == 1) { newSwitchStates[index].view = event.target.checked }
      if (index == 2) {
        newSwitchStates[index].view = event.target.checked
        for (let i = 7; i <= 14; i++) { newSwitchStates[i].view = event.target.checked }
      }
      if (index == 3) { newSwitchStates[index].view = event.target.checked }
      if (index == 4) { newSwitchStates[index].view = event.target.checked }
      if (index == 5) {
        newSwitchStates[index].view = event.target.checked
        for (let i = 15; i <= 16; i++) { newSwitchStates[i].view = event.target.checked }
      }
      // if (index == 6) { newSwitchStates[index].view = event.target.checked }
    } else {
      newSwitchStates[index].view = event.target.checked; // Update the specific switch state
    }
    setStateArr(newSwitchStates); // Update the state with the new array
  };

  const handleEditChange = (index, stateArr, setStateArr) => (event) => {
    const newSwitchStates = [...stateArr]; // Create a copy of the state
    if (setStateArr == setOperationsCheck && index == 4) {
      newSwitchStates[index].edit = event.target.checked;
      newSwitchStates[index + 1].edit = event.target.checked;
    } else {
      newSwitchStates[index].edit = event.target.checked; // Update the specific switch state
    }
    setStateArr(newSwitchStates); // Update the state with the new array
  };

  const handleGrant = async () => {
    let response;
    if (userId != undefined) {
      setIsLoading(true)
      const masterData = masterCheck.map(item => `(${item.id}, "${item.name}", ${item.view}, ${item.edit})`).join(',');
      const operationData = operationsCheck.map(item => `(${item.id}, "${item.name}", ${item.view}, ${item.edit})`).join(',');
      const salesData = salesCheck.map(item => `(${item.id}, "${item.name}", ${item.view}, ${item.edit})`).join(',');
      const accountData = accountCheck.map(item => `(${item.id}, "${item.name}", ${item.view}, ${item.edit})`).join(',');
      const consignmentData = consignmentCheck.map(item => `(${item.id}, "${item.name}", ${item.view}, ${item.edit})`).join(',');
      const reportsData = reportsCheck.map(item => `(${item.id}, "${item.name}", ${item.view}, ${item.edit})`).join(',');
      const checkdata = masterData + "," + operationData + "," + salesData + "," + accountData + "," + consignmentData + "," + reportsData
      const checkdata1 = userId;
      const finaldata = { checkdata, checkdata1 }
      console.log("Grant Data : ", finaldata);
      response = await updateUserPermission(finaldata)
      if (response.status == 200) {
        navigate('/user-registration')
      }
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100%',
        width: '100%',
        padding: '20px',
        // backgroundImage: `url(${backgroundImage})`, 
      }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, textAlign: 'center' }}
            >
              User Permissions
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginBottom: '2%' }}>
          <Grid item xs={12} md={4}>
            <Autocomplete
              options={branches}
              getOptionLabel={(option) => option.label || ""}
              value={selectedBranch || null}
              onChange={(event, value) => {
                setSelectedBranch(value)
                setBranchId(value?.value)
              }}
              disabled={username != undefined}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Branch:"
                  variant="outlined"
                  fullWidth
                  size='small'
                  name="assignedCrew"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Autocomplete
              options={users}
              getOptionLabel={(option) => option.label || ""}
              value={selectedUser || null}
              onChange={(event, value) => {
                setSelectedUser(value)
                setUserId(value?.value)
              }}
              disabled={username != undefined}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select User"
                  variant="outlined"
                  fullWidth
                  size='small'
                  name="assignedCrew"
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
          {/* Left side grid for Master table */}
          <Grid item xs={12} md={5}>
            <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 4 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                      {sections[0].heading}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> </TableCell>
                    <TableCell align="center">View</TableCell>
                    <TableCell align="center">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sections[0].rows.map((row, index) => {
                    return (
                      <TableRow key={row}>
                        <TableCell>{row}</TableCell>
                        <TableCell align="center">
                          <Switch checked={masterCheck.length > 0 ? masterCheck[index].view : false} onChange={userId ? handleViewChange(index, masterCheck, setMasterCheck) : ""} />
                        </TableCell>
                        <TableCell align="center">
                          <Switch checked={masterCheck.length > 0 ? masterCheck[index].edit : false} onChange={userId ? handleEditChange(index, masterCheck, setMasterCheck) : ""} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Right side grid for other tables arranged in 2x2 */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              {/* First row of the right side grid */}
              <Grid item xs={12} md={6}>
                <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 4 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                          {sections[1].heading}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align="center">View</TableCell>
                        <TableCell align="center">Edit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sections[1].rows.map((row, index) => (
                        <TableRow key={row}>
                          <TableCell>{row}</TableCell>
                          <TableCell align="center">
                            <Switch checked={operationsCheck.length > 0 ? operationsCheck[index].view : false} onChange={userId ? handleViewChange(index, operationsCheck, setOperationsCheck) : ""} />
                          </TableCell>
                          <TableCell align="center">
                            <Switch checked={operationsCheck.length > 0 ? operationsCheck[index].edit : false} onChange={userId ? handleEditChange(index, operationsCheck, setOperationsCheck) : ""} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 2, height: '30.2%' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                          {sections[3].heading}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align="center">View</TableCell>
                        <TableCell align="center">Edit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sections[3].rows.map((row, index) => (
                        <TableRow key={row}>
                          <TableCell>{row}</TableCell>
                          <TableCell align="center">
                            <Switch checked={salesCheck.length > 0 ? salesCheck[index].view : false} onChange={userId ? handleViewChange(index, salesCheck, setSalesCheck) : ""} />
                          </TableCell>
                          <TableCell align="center">
                            <Switch checked={salesCheck.length > 0 ? salesCheck[index].edit : false} onChange={userId ? handleEditChange(index, salesCheck, setSalesCheck) : ""} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 3, height: '16.7%' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                          {sections[2].heading}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align="center">View</TableCell>
                        <TableCell align="center">Edit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sections[2].rows.map((row, index) => (
                        <TableRow key={row}>
                          <TableCell>{row}</TableCell>
                          <TableCell align="center">
                            <Switch checked={accountCheck.length > 0 ? accountCheck[index].view : false} onChange={userId ? handleViewChange(index, accountCheck, setAccountCheck) : ""} />
                          </TableCell>
                          <TableCell align="center">
                            <Switch checked={accountCheck.length > 0 ? accountCheck[index].edit : false} onChange={userId ? handleEditChange(index, accountCheck, setAccountCheck) : ""} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} md={6}>
                {/* <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 4 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                        {sections[2].heading}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell align="center">View</TableCell>
                      <TableCell align="center">Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sections[2].rows.map((row) => (
                      <TableRow key={row}>
                        <TableCell>{row}</TableCell>
                        <TableCell align="center">
                          <Switch defaultChecked />
                        </TableCell>
                        <TableCell align="center">
                          <Switch defaultChecked color="primary" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer> */}
                <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 4 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                          {sections[5].heading}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align="center">View</TableCell>
                        <TableCell align="center">Edit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sections[5].rows.map((row, index) => (
                        <TableRow key={row}>
                          <TableCell>{row}</TableCell>
                          <TableCell align="center">
                            <Switch checked={consignmentCheck.length > 0 ? consignmentCheck[index].view : false} onChange={userId ? handleViewChange(index, consignmentCheck, setConsignmentCheck) : ""} />
                          </TableCell>
                          <TableCell align="center">
                            <Switch checked={consignmentCheck.length > 0 ? consignmentCheck[index].edit : false} onChange={userId ? handleEditChange(index, consignmentCheck, setConsignmentCheck) : ""} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>


                <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 4 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                          {sections[4].heading}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align="center">View</TableCell>
                        {/* <TableCell align="center">Edit</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sections[4].rows.map((row, index) => (
                        <TableRow key={row}>
                          <TableCell>{row}</TableCell>
                          <TableCell align="center">
                            <Switch checked={reportsCheck.length > 0 ? reportsCheck[index].view : false} onChange={userId ? handleViewChange(index, reportsCheck, setReportsCheck) : ""} />
                          </TableCell>
                          {/* <TableCell align="center">
                            <Switch defaultChecked color="primary" />
                          </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              {/* Second row of the right side grid */}
              {/* <Grid item xs={12} md={6}>
              <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 4 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                        {sections[3].heading}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell align="center">View</TableCell>
                      <TableCell align="center">Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sections[3].rows.map((row) => (
                      <TableRow key={row}>
                        <TableCell>{row}</TableCell>
                        <TableCell align="center">
                          <Switch defaultChecked />
                        </TableCell>
                        <TableCell align="center">
                          <Switch defaultChecked color="primary" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid> */}

              {/* <Grid item xs={12} md={6}>
              <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 4 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                        {sections[4].heading}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell align="center">View</TableCell>
                      <TableCell align="center">Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sections[4].rows.map((row) => (
                      <TableRow key={row}>
                        <TableCell>{row}</TableCell>
                        <TableCell align="center">
                          <Switch defaultChecked />
                        </TableCell>
                        <TableCell align="center">
                          <Switch defaultChecked color="primary" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid> */}

              {/* <Grid item xs={12} md={6}>
              <TableContainer component={Paper} sx={{ width: '100%', marginBottom: 4 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: '20px', fontFamily: 'Poppins', backgroundColor: '#f5f5f5' }} colSpan={3}>
                        {sections[5].heading}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell align="center">View</TableCell>
                      <TableCell align="center">Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sections[5].rows.map((row) => (
                      <TableRow key={row}>
                        <TableCell>{row}</TableCell>
                        <TableCell align="center">
                          <Switch defaultChecked />
                        </TableCell>
                        <TableCell align="center">
                          <Switch defaultChecked color="primary" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>  */}
            </Grid>
          </Grid>

        </Grid>

        <Grid container justifyContent="center" alignItems="center" spacing={2} mb={2}>
          <Grid item>
            <Button variant="contained" color="primary" style={{ backgroundColor: 'blue' }}
              onClick={handleGrant}
            >
              Grant
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" style={{ backgroundColor: '#D92445' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default UserPermission;
