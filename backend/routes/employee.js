
const EmployeeController = require('../controllers/EmployeeController')
 

 
const router =require('express').Router()
router.get('/getallEmployee', EmployeeController.getallEmployee);
router.get('/getEmployeebyid/:id', EmployeeController.getEmployeebyid);
router.put('/UpdateEmployee/:id', EmployeeController.UpdateEmployee);
router.post('/AddEmployee', EmployeeController.AddEmployee);
router.delete('/deleteemployee/:id', EmployeeController.deleteemployee);
router.get('/getallEmployees', EmployeeController.getallEmployees);

module.exports=router