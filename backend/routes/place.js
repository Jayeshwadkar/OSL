
const PlaceController = require('../controllers/PlaceController')
 

 
const router =require('express').Router()
router.get('/getAllPlace', PlaceController.getAllPlace);
router.get('/getAllPlaces', PlaceController.getAllPlaces);
router.get('/getPlacebyid/:id', PlaceController.getPlacebyid);
router.put('/UpadtePlace/:id', PlaceController.UpadtePlace);
router.post('/addPlace', PlaceController.AddPlace);
router.delete('/deletePlace/:id', PlaceController.deletePlace);

module.exports=router