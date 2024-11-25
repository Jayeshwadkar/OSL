
const PetrolPumpController = require('../controllers/PetrolPumpController')
 

 
const router =require('express').Router()
router.get('/getallpetrolpumps', PetrolPumpController.getallpetrolpumps);
 router.get('/getpetrolpumpbyid/:id', PetrolPumpController.getpetrolpumpbyid);
 router.put('/updatepetrolpump/:id', PetrolPumpController.updatepetrolpump);
 router.post('/insertpetrolpump', PetrolPumpController.insertpetrolpump);
router.delete('/deletepetrolpump/:id', PetrolPumpController.deletepetrolpump);

module.exports=router