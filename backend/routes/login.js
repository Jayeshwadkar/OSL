
const LoginController = require('../controllers/LoginController')
 

 
const router =require('express').Router()
router.post('/login', LoginController.login);

module.exports=router