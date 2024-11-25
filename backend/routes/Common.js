
const CommonController = require('../controllers/CommonController')
 

 
const router =require('express').Router()

router.get('/getAllStates', CommonController.getAllStates);
router.get('/getAutoIncrementValue', CommonController.getAutoIncrementValue);
router.get('/getGstDataByStateCode', CommonController.getGstDataByStateCode);
router.get('/getGstNos', CommonController.getGstNos);
module.exports=router  