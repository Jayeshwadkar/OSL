
const VehicleContoller = require('../controllers/VehicleContoller')
 

 
const router =require('express').Router()
router.get('/getallVehicle', VehicleContoller.getallVehicle);
router.get('/getallVehicles', VehicleContoller.getallVehicles);
router.get('/getVehiclebyid/:id', VehicleContoller.getVehiclebyid);
router.put('/UpdateVehicle/:id/:branch', VehicleContoller.UpdateVehicle);
router.post('/AddVehicle', VehicleContoller.AddVehicle);
router.delete('/deletevehicle/:id', VehicleContoller.deletevehicle);
router.get('/getVehicleTypes', VehicleContoller.getVehicleTypes);
module.exports=router