
const NotBilledLorryReceiptStatusController = require('../controllers/NotBilledLorryReceiptStatusController')
 

 
const router =require('express').Router()
router.get('/getbilllistforreportbydate', NotBilledLorryReceiptStatusController.getnotbilledlrlistforreportbydate);

module.exports=router