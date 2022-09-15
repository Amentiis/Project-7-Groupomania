const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
router.post(express.json());
router.post('/:id', auth ,commentCtrl.CreateComment)
router.delete('/:id', auth ,commentCtrl.DeleteComment)


module.exports =  router;
