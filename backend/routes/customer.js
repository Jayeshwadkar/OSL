
const CustomerController = require('../controllers/CustomerController')
 

 
const router =require('express').Router()
router.get('/getAllCustomer', CustomerController.getAllCustomer);
router.get('/getPoCustomers', CustomerController.getPoCustomers);
router.get('/getAllCustomers', CustomerController.getAllCustomers);
router.get('/getpoCustomerById', CustomerController.getpoCustomerById);
router.get('/getCustomerbyid/:id', CustomerController.getCustomerbyid);
router.put('/UpadteCustomer/:id', CustomerController.UpadteCustomer);
router.post('/AddCustomer', CustomerController.AddCustomer);
router.delete('/deletecustomer/:id', CustomerController.deletecustomer);
router.delete('/deleteContactPerson/:id', CustomerController.deleteContactPerson);
router.get('/getPOByCustomer', CustomerController.getPOByCustomer);

module.exports=router
