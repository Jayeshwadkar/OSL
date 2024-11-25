
const PendingLrController = require('../controllers/PendingLrController')
 

 
const router =require('express').Router()
router.get('/getstartdateofyear', PendingLrController.getstartdateofyear);
router.get('/getpendinglrlistforreportbydefault/:branch', PendingLrController.getpendinglrlistforreportbydefault);

module.exports=router