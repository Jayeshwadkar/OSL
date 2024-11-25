
const BankAccContoller = require('../controllers/BankAccController')
 

 
const router =require('express').Router()
router.get('/getAllBanksAcc', BankAccContoller.getAllBanksAcc);
router.get('/getBankAccbyid/:id', BankAccContoller.getBankAccbyid);
router.put('/UpadteBankAcc/:id', BankAccContoller.UpadteBankAcc);
router.post('/addbankacc', BankAccContoller.AddBankacc);
router.delete('/deletebankacc/:id', BankAccContoller.deletebankacc);

module.exports=router