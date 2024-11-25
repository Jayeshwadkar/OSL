
const ArticalController = require('../controllers/ArticalController')
 

 
const router =require('express').Router()
router.get('/getArtical', ArticalController.getArtical);
router.get('/getArticals', ArticalController.getArticals);
router.get('/getArticalbyid/:id', ArticalController.getArticalbyid);
router.put('/UpadteArtical/:id', ArticalController.UpadteArtical);
router.post('/addArtical', ArticalController.AddArtical);
router.delete('/deleteArtical/:id', ArticalController.deleteArtical);

module.exports=router