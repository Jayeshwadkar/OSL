
const BranchController = require('../controllers/BranchController')
 

 
const router =require('express').Router()
router.get('/getAllBranches', BranchController.getAllBranches);
router.get('/SelectBranch', BranchController.SelectBranch);
router.get('/getBranchbyid/:id', BranchController.getBranchbyid);
router.post('/addBranch', BranchController.addBranch);
router.delete('/deleteBranch/:id', BranchController.deleteBranch);
router.put('/upadteBranch/:id', BranchController.upadteBranch);

module.exports=router