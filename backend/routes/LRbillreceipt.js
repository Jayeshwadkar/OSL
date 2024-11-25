const LRbillreceiptController = require('../controllers/LRbillreceipt')

const router = require('express').Router();

router.get('/getLrBillReports', LRbillreceiptController.getLrBillReports);
router.delete('/deleteLrBillReports/:id', LRbillreceiptController.deleteLrBillReports);
router.get('/getLrNumberPodReceipts', LRbillreceiptController.getLrNumberPodReceipts);
router.post('/addLrBillReport', LRbillreceiptController.addLrBillReport);

module.exports = router