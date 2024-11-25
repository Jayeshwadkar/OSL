
const TyresupplierController = require('../controllers/TyresupplierController')
 

 
const router =require('express').Router()
router.get('/getalltyresuppliers', TyresupplierController.getalltyresuppliers);
router.get('/getalltyresupplierss', TyresupplierController.getalltyresupplierss);
 router.get('/gettyresupplierbyid/:id', TyresupplierController.gettyresupplierbyid);
 router.put('/updatetyresuppliers/:id', TyresupplierController.updatetyresuppliers);
 router.post('/addtyresupplier', TyresupplierController.addtyresupplier);
router.delete('/deletetyresupplier/:id', TyresupplierController.deletetyresupplier);

module.exports=router