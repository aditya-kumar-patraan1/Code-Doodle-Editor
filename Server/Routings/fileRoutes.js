const express = require('express');
const router4 = express.Router();
const userAuth = require('../MiddleWares/userAuth');
const {addFile, deleteFile, deleteOneFile,addFileToRecycleBin,getRecycleBinFiles} = require('../Controllers/folderController');

router4.post('/addFile',userAuth, addFile);
router4.post('/deleteFile',userAuth, deleteFile);
router4.post("/deleteOneFile",userAuth,deleteOneFile);
//added for recycle din
router4.post("/addToRecycleBin",userAuth,addFileToRecycleBin);
router4.post("/getRecycleBinFiles",userAuth,getRecycleBinFiles);
module.exports = router4;
