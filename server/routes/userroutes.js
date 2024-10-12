const { register, login, avatar, getuser } = require('../controllers/usercontroller');
const router = require('express').Router();
router.post('/register',register);
router.post('/login',login);
router.post('/avatar/:id',avatar);
router.get('/alluser/:id',getuser);

module.exports = router;