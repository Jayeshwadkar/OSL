
const LoadingTripRegisterController = require('../controllers/LoadingTripRegisterController')
 

 
const router =require('express').Router()
router.get('/getlslistforreportbydate/:branch', LoadingTripRegisterController.getlslistforreportbydate);

module.exports=router