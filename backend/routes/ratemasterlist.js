
const RateMasterlistController = require('../controllers/RateMasterlistController')
 

 
const router =require('express').Router()
router.get('/getallRateMaster', RateMasterlistController.getallRateMaster);
router.get('/getallRateMasters', RateMasterlistController.getallRateMasters);
router.get('/getRateMasterbyid/:id', RateMasterlistController.getRateMasterbyid);
router.put('/UpdateRateMaster/:id', RateMasterlistController.UpdateRateMaster);
router.post('/AddRateMaster', RateMasterlistController.AddRateMaster);
router.delete('/deleteratemaster/:id', RateMasterlistController.deleteratemaster);

module.exports=router