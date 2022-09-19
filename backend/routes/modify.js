const express = require('express');
const router = express.Router();
const modifyCtrl = require('../controllers/modify')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
router.put(express.json());
// router.use(express.urlencoded())
router.put('/:id', auth, multer ,modifyCtrl.ModifyPost)
module.exports =  router;

