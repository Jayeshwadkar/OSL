
const ReportsController = require('../controllers/ReportsController')
const router =require('express').Router()



router.get('/getmisreport', ReportsController.getMisRecords);
router.get('/getstockreport', ReportsController.getStockRecords);
router.get('/getConsignmentReports', ReportsController.getConsignmentReports);
router.get('/getDeliverchallanReport', ReportsController.getDeliverchallanReport);
router.get('/getunlodingreport', ReportsController.getunlodingreport);
router.get('/getTransportbillreport', ReportsController.getTransportbillreport);
router.get('/getPODReceiptReport', ReportsController.getPODReceiptReport);
router.get('/getUploadReport', ReportsController.getUploadReport);


module.exports=router