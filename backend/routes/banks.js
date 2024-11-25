
const BanksController = require('../controllers/BanksController')
 

 
const router =require('express').Router()
router.get('/getAllBanks', BanksController.getAllBanks);
router.get('/SelectBank', BanksController.SelectBank);
router.get('/getBankbyid/:id', BanksController.getBankbyid);
router.put('/UpadteBank/:id', BanksController.UpadteBank);
router.post('/addbank', BanksController.AddBank);
router.delete('/deletebank/:id', BanksController.deletebank);

module.exports=router