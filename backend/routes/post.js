const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
router.put(express.json());
router.use(express.urlencoded())
router.post('/', auth, multer,postCtrl.createPost);
router.post('/:id/like', auth, postCtrl.LikePost)
router.delete('/:id',auth,postCtrl.deletePost);
router.get('/', auth, postCtrl.GetAllPost);
router.get('/:id', auth, postCtrl.GetSpecifyPost)
 
module.exports =  router;

