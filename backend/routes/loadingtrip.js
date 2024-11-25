
const LoadingTipController = require('../controllers/LoadingTipController')
 

 
const router =require('express').Router()
router.get('/getallloadingshets/:branch', LoadingTipController.getallloadingshets);
router.get('/getloadingsheetbyid/:id', LoadingTipController.getloadingsheetbyid);
 router.post('/add_dc_master', LoadingTipController.add_dc_master);
 router.get('/getallItssearch/:branch', LoadingTipController.getallItssearch);
router.get('/getlrforloadingsheet/:branch', LoadingTipController. getlrforloadingsheet);
router.get('/getlrdetailsforloadsheet/:selectedIds', LoadingTipController. getlrdetailsforloadsheet);
router.get('/getloadingsheetFreightbyid/:id', LoadingTipController.getloadingsheetFreightbyid);
router.get('/getlrdetailsbybranchwise/:id', LoadingTipController.getlrdetailsbybranchwise);
router.put('/Updatedcmaster/:id', LoadingTipController.Updatedcmaster);
router.get('/getLoadingTripByIdPdfmail/:id', LoadingTipController.getLoadingTripByIdPdfmail);
router.post('/sendMail', LoadingTipController.sendMail);
router.delete('/delete_dc_master/:id', LoadingTipController.delete_dc_master);
router.get('/saveloadingtripprint/:id', LoadingTipController.saveloadingtripprint);
router.get('/getLoadingTripByIdPdfedit/:id', LoadingTipController.getLoadingTripByIdPdfedit);
router.get('/getlrforloadingsheetedit/:branch', LoadingTipController. getlrforloadingsheetedit);

module.exports=router