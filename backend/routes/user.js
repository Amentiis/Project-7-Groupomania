const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const userCtrl = require('../controllers/User')

router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);
router.post('/get',auth,userCtrl.getSpecifyUser);
router.post('/getall',auth,userCtrl.getSpecifyUserAll);
router.post('/change/:id', auth, userCtrl.modifySpecifyUser);



module.exports = router;