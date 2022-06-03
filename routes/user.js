const router = require('express').Router();
const {usersignup,userlogin,getusers,deletemany} = require('../controllers/user')

router.post('/signup',usersignup)
router.post('/login',userlogin)
router.get('/getusers',getusers)
router.delete('/deletemany/:data',deletemany)

module.exports = router