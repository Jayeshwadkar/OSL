
const DriverController = require('../controllers/DriverController')
 

 
const router =require('express').Router()
router.get('/getAllDrivers', DriverController.getAllDrivers);
router.get('/getAllDriver', DriverController.getAllDriver);
router.get('/getDriverbyid/:id', DriverController.getDriverbyid);
router.put('/UpdateDriver/:id', DriverController.UpdateDriver);
router.post('/Adddriver', DriverController.Adddriver);
router.delete('/deletedriver/:id', DriverController.deletedriver);

module.exports=router