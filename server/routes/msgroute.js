const { addmsg, getmsg} = require('../controllers/msgcontroller');
const router = require('express').Router();
router.post('/addmsg/',addmsg);
router.post('/getmsg/',getmsg);

module.exports = router;