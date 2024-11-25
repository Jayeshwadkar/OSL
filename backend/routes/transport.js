
const TransportController = require('../controllers/TransportController')
 

 
const router =require('express').Router();

router.get('/getlrfordcupdate/:id', TransportController.getLrByBranchId);
router.get('/vehiclelist', TransportController.getVehicleList);
router.get('/drivershortlist/:id', TransportController.getDriversListByBranchCode);
router.put('/dctabledata/:id', TransportController.getDcDataByLrId);

module.exports=router