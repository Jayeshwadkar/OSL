const UserController = require('../controllers/UserController')



const router = require('express').Router()
// router.get('/getAlluser', userController.getUser);
// router.get('/getNewUser/:branch', userController.getNewUser);
router.get('/getbranches', UserController.getBranches);
router.get('/getuserlist/:branchid', UserController.getUserListByBranch);
router.get('/getemployee/:branchid', UserController.getEmployeeList);
router.post('/registeruser', UserController.registerUser);
router.get('/getuserdetails/:username', UserController.getUserDetails);
router.post('/updateuser', UserController.updateUserDetails);
router.get('/activateuser/:userid', UserController.activateUser);
router.get('/deleteuser/:userid', UserController.deleteUser);

// For user permissions
router.get('/getUserpermissions/:userid', UserController.getUserPermissions);
router.post('/updateUserpermissions', UserController.updateUserPermission);


module.exports = router

