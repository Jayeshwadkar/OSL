
const DeliveryStatusController = require('../controllers/DeliveryStatusController')
 

 
const router =require('express').Router()
router.get('/getsrnofordeliverystatus', DeliveryStatusController.getsrnofordeliverystatus);
router.get('/getpendinglrlistfordeliverystatus', DeliveryStatusController.getpendinglrlistfordeliverystatus);
router.get('/getpendinglrlistfordeliverystatusbydate', DeliveryStatusController.getpendinglrlistfordeliverystatusbydate);
 router.post('/addbillmaster', DeliveryStatusController.addbillmaster);
router.delete('/deletebills', DeliveryStatusController.deletebills);

module.exports=router