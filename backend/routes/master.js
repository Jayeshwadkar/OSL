const MasterController = require('../controllers/MasterController')



const router = require('express').Router();

// For article
router.get('/getallArticleList', MasterController.getallArticleList);
router.get('/articlelist/:id', MasterController.getArticleList);
router.post('/addarticle', MasterController.addArticle);
router.post('/deletearticle', MasterController.deleteArticle);
router.get("/findarticlebyid/:id", MasterController.findArticleById)
router.post('/updatearticle', MasterController.updateArticle);

// For places
router.get('/getAllPlacesList', MasterController.getAllPlacesList);
router.get('/placelist', MasterController.getPlacesList);
router.get('/getcustomers', MasterController.getCustomersList);
router.post('/addplaces', MasterController.addPlaces);
router.post('/deleteplace', MasterController.deletePlace);
router.get('/findplacebyid/:placeid', MasterController.findPlaceById);
router.post('/updateplace', MasterController.updatePlace);

// For branches
router.get('/brancheslist', MasterController.getBranchesList);
router.get('/getAllBranchesList', MasterController.getAllBranchesList);
router.get('/getCustomerListBySerach', MasterController.getCustomerListBySerach);
router.post('/addbranch', MasterController.addBranch);
router.get('/findbranchbyid/:branchid', MasterController.findBranchById);
router.post('/updatebranch', MasterController.updateBranch);
router.post('/deletebranch', MasterController.deleteBranch);

// For customers
router.get('/customerlistbypage', MasterController.getCustomerListByPage);
router.get('/getAllCustomerList', MasterController.getAllCustomerList);
router.post('/addcustomer', MasterController.addCustomer);
router.get('/findcustomerbyid/:custid', MasterController.getCustomerById);
router.post('/updatecustomer', MasterController.updateCustomer);
router.post('/deletecustomer', MasterController.deleteCustomer);

// For drivers
router.get('/driverlist', MasterController.getDriversList);
router.get('/getAllDriversserach', MasterController.getAllDriversserach);
router.get('/getAllDrivers', MasterController.getAllDrivers);
router.get('/driverlist/:driverid', MasterController.getDriverById);
router.post('/adddriver', MasterController.addDriver);
router.post('/updatedriver', MasterController.updateDriver);
router.post('/deletedriver', MasterController.deleteDriver);

// for employee
router.get('/employeelist', MasterController.getEmployeeList);
router.get('/getAllEmployeeList', MasterController.getAllEmployeeList);
router.get('/employeelist/:empid', MasterController.getEmployeeById);
router.post('/addemployee', MasterController.addEmployee);
router.post('/updateemployee', MasterController.updateEmployee);
router.post('/deleteemployee', MasterController.deleteEmployee);

// For vehicle
router.get('/getVehiclelist', MasterController.getVehicleList);
router.get('/getALLVehicleList', MasterController.getALLVehicleList);
router.get('/getTransporterlist', MasterController.getTransporterData);
router.get('/getAllVehicleserach', MasterController.getAllVehicleserach);
router.get('/getVehicleDataById/:vehicleid', MasterController.getVehicleById);
router.post('/addvehicle', MasterController.addvehicle);
router.post('/updatevehicle', MasterController.updateVehicle);
router.post('/deletevehicle', MasterController.deleteVehicle);

// for Transporter
router.get('/transporterlist', MasterController.getTransporterList);
router.get('/getAllTransporterList', MasterController.getAllTransporterList);
router.post('/addtransporter', MasterController.addTransporter);
router.get('/findtransporterbyid/:transpid', MasterController.findTransporterById);
router.post('/updatetransporter', MasterController.updateTransporter);
router.post('/deletetransporter', MasterController.deleteTransporter);

// for vehicle type
router.get('/vehicletypelist', MasterController.getVehicleTypeList);
router.get('/getAllVehicleTypeList', MasterController.getAllVehicleTypeList);
router.post('/addvehicletype', MasterController.addvehicletype);
router.get('/findvehicletypebyid/:vehicletId', MasterController.findVehicleTypeById);
router.post('/updatevehicletype', MasterController.updateVehicleType);
router.post('/deletevehicletype', MasterController.deleteVehicleType);

// For PO Customers
router.get('/getpocustomerslist', MasterController.getPoCustomersList);
router.get('/getPoCustomerListBySerach', MasterController.getPoCustomerListBySerach);
router.get('/getAllPoCustomerList', MasterController.getAllPoCustomerList);
router.post('/addpocustomer', MasterController.addPoCustomer);
router.get('/findpocustomerbyid/:pocustid', MasterController.getPoCustomerById);
router.post('/updatepocustomer', MasterController.updatePoCustomer);
router.post('/deletepocustomer', MasterController.deletePoCustomer);

// For Part No
router.get('/getpartnolist', MasterController.getPartNoList);
router.get('/getPartNoListBySerach', MasterController.getPartNoListBySerach);
router.get('/getAllPartNoList', MasterController.getAllPartNoList);
router.post('/addpartno', MasterController.addPartNo);
router.get('/findpartnobyid/:partnoid', MasterController.getPartNoById);
router.post('/updatepartno', MasterController.updatePartNo);
router.post('/deletepartno', MasterController.deletePartNo);

// For GST master
router.get('/getgstmasterlist', MasterController.getGSTmasterList);
router.get('/getAllgstmaster', MasterController.getAllgstmaster);
router.post('/addgstmaster', MasterController.addGSTmaster);
router.get('/findgstmasterbyid/:gstmid', MasterController.getGSTmasterById);
router.post('/updategstmaster', MasterController.updateGSTmaster);
router.post('/deletegstmaster', MasterController.deleteGSTmaster);

// For TDS master
router.get('/gettdsmasterlist', MasterController.getTDSmasterList);
router.get('/getAllTDSmasterList', MasterController.getAllTDSmasterList);
router.post('/addtdsmaster', MasterController.addTDSmaster);
router.get('/findtdsmasterbyid/:tdsmid', MasterController.getTDSmasterById);
router.post('/updatetdsmaster', MasterController.updateTDSmaster);
router.post('/deletetdsmaster', MasterController.deleteTDSmaster);

// For update flag status
router.post('/updateflagstatus', MasterController.updateFlagStatus);

module.exports = router