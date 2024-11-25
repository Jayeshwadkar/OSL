
const VehiclePayAdviceReportController = require('../controllers/VehiclePayAdviceReportController')
 

 
const router =require('express').Router()
router.get('/getvehiclepayadvicereportbydate', VehiclePayAdviceReportController.getvehiclepayadvicereportbydate);

module.exports=router