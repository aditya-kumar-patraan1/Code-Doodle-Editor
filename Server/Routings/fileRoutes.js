const express = require('express');
const router4 = express.Router();
const userAuth = require('../MiddleWares/userAuth');
const {addFile, deleteFile, deleteOneFile} = require('../Controllers/folderController');

router4.post('/addFile',userAuth, addFile);
router4.post('/deleteFile',userAuth, deleteFile);
router4.post("/deleteOneFile",userAuth,deleteOneFile);

module.exports = router4;