// ba3d ma tasna3 el file timportih fi application.js 

var express = require('express');
var router = express.Router();

// nimportiw l conroller 
const osController = require('../Controllers/osController');
router.get('/getInformation',osController.getInformation);

module.exports = router;
