
const BillsController = require('../controllers/BillsController')
 

 
const router =require('express').Router()
router.get('/getbillsbybranch/:branch', BillsController.getbillsbybranch);
router.get('/getbillbyid/:id', BillsController.getbillbyid);
 router.post('/addbillmaster', BillsController.addbillmaster);
router.delete('/deletebills/:id', BillsController.deletebills);
router.get('/searchBills', BillsController.searchBills);
router.get('/getLorryMasterListForBill', BillsController.getLorryMasterListForBill);
router.get('/getlrdetailsbyid', BillsController.getlrdetailsbyid);
router.put('/updateBill/:id', BillsController.updateBill);
router.get('/billforprint/:id', BillsController.getBillForPrint);
router.get('/mailBill/:id', BillsController.mailbill);
router.post('/sendMail', BillsController.sendMail);
router.get('/getLorryMasterListForBillUpdate', BillsController.getLorryMasterListForBillUpdate);



module.exports=router