
const PaymentAdviceVehicleController = require('../controllers/PaymentAdviceVehicleController')
 

 
const router =require('express').Router()

 router.post('/addpayadvice', PaymentAdviceVehicleController.addpayadvice);
 router.post('/addpayadvicedetails', PaymentAdviceVehicleController.addpayadvicedetails);


module.exports=router