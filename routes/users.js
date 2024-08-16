var express = require('express');
var router = express.Router();

// import the controller : 
const userController = require('../Controllers/usersController');

/* GET users listing. */
// tista3mel l fct li sna3tha fil controller 
router.get('/message',userController.message);

module.exports = router;
