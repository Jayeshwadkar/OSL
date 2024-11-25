
const VehicleOwenerController = require('../controllers/VehicleOwenerController')
 

 
const router =require('express').Router()
router.get('/getallVehicleOwener', VehicleOwenerController.getallVehicleOwener);
router.get('/getallVehicleOweners', VehicleOwenerController.getallVehicleOweners);
 router.get('/getVehicleOwenerbyid/:id', VehicleOwenerController.getVehicleOwenerbyid);
 router.put('/UpdateVehicleOwener/:id', VehicleOwenerController.UpdateVehicleOwener);
 router.post('/AddVehicleOwener', VehicleOwenerController.AddVehicleOwener);
router.delete('/deletevehicleowner/:id', VehicleOwenerController.deletevehicleowner);


module.exports=router