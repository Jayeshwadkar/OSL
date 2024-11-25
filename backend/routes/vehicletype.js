
const VehicleTypeController = require('../controllers/VehicleTypeController')
 

 
const router =require('express').Router()
router.get('/getallvehicletypes', VehicleTypeController.getallvehicletypes);
 router.get('/getvehicletypebyid/:id', VehicleTypeController.getvehicletypebyid);
 router.put('/updatevehicletype/:id', VehicleTypeController.updatevehicletype);
 router.post('/addvehicletype', VehicleTypeController.addvehicletype);
router.delete('/deletevehicletype/:id', VehicleTypeController.deletevehicletype);

module.exports=router