
const LRController = require('../controllers/LRController')
 

 
const router =require('express').Router()
router.get('/getallmasterforlr', LRController.getallmasterforlr);
router.post('/addlrmaster', LRController.addlrmaster);

module.exports=router























