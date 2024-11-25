
const DeliveryUpdateStatusController = require('../controllers/DeliveryUpdateStatusController')
 

 
const router =require('express').Router()

router.post('/adddeliverystatus', DeliveryUpdateStatusController.adddeliverystatus);

module.exports=router