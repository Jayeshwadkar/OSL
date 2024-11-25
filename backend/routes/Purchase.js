const PurchaseController = require('../controllers/PurchaseController')
const router =require('express').Router();

router.get('/getpomaster', PurchaseController.getpomaster);

router.get('/getpomasterWithSearch', PurchaseController.getpomasterWithSearch);
router.post('/addPurchaseOrder', PurchaseController.addPurchaseOrder);
router.delete('/deletePoMaster/:id', PurchaseController.deletePoMaster);
router.get('/getPurchaseOrderAndDetails/:id', PurchaseController.getPurchaseOrderAndDetails);
router.put('/upsertPurchaseOrder', PurchaseController.upsertPurchaseOrder);

module.exports=router