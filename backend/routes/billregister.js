
const BillRegisterController = require('../controllers/BillRegisterController')
 

 
const router =require('express').Router()
router.get('/getbilllistforreportbydate/:branch', BillRegisterController.getbilllistforreportbydate);

module.exports=router