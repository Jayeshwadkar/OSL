
const LorryReceiptRegisterController = require('../controllers/LorryReceiptRegisterController')
 

 
const router =require('express').Router()
router.get('/getlrlistforreportbydate/:branch', LorryReceiptRegisterController.getlrlistforreportbydate);

module.exports=router