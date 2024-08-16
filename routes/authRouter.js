// best practise is authRouter instead of auth 
var express = require('express');
var router = express.Router();

// import the controller : 
const authController = require('../Controllers/authController');

/* GET users listing. */
// tista3mel l fct li sna3tha fil controller 
router.get('/getAllUsers',authController.getAllUsers);

module.exports = router;
