
const DeliveryStatusReportController = require('../controllers/DeliveryStatusReportController')
 

 
const router =require('express').Router()
router.get('/getdeliverystatuslistforreportbydate', DeliveryStatusReportController.getdeliverystatuslistforreportbydate);

module.exports=router