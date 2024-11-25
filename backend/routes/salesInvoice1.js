const saleInvoice1Controller = require('../controllers/salesInvoice1')
const router =require('express').Router();

router.get('/getSalesInvoiceMasterList', saleInvoice1Controller.getSalesInvoiceMasterList);
router.delete('/deleteSalesInvoice/:id', saleInvoice1Controller.deleteSalesInvoice);
router.get('/getLorryReceiptList', saleInvoice1Controller.getLorryReceiptList);
router.get('/getGSTNumberAndState', saleInvoice1Controller.getGSTNumberAndState);
router.get('/getPODetailsByPOID', saleInvoice1Controller.getPODetailsByPOID);
router.get('/getLorryReceiptById', saleInvoice1Controller.getLorryReceiptById);
router.get('/getSalesInvoiceMasterById', saleInvoice1Controller.getSalesInvoiceMasterById);
router.post('/addSaleInvoice', saleInvoice1Controller.addSaleInvoice);
router.put('/updateSaleInvoice', saleInvoice1Controller.updateSaleInvoice);
router.get('/getlrbylridandinvid', saleInvoice1Controller.getlrbylridandinvid);
module.exports=router  