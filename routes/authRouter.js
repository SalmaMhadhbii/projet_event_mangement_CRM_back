// best practise is authRouter instead of auth 
var express = require('express');
var router = express.Router();

// import the controller : 
const authController = require('../Controllers/authController');

/* GET users listing. */
// tista3mel l fct li sna3tha fil controller 
router.get('/getAllUsers',authController.getAllUsers);
 
router.get('/triUsers',authController.triUsers );
router.get('/getUserById/:id',authController.getUserById );
router.get('/searchUserByName2/:name',authController.searchUserByName2);
router.get('/searchUserByName',authController.searchUserByName );
router.get('/searchUserByName3',authController.searchUserByName3 );
// router.get('/searchUserByNameSort',authController.searchUserByNameSort );

router.post('/addUserClient',authController.addUserClient );
// router.post('/addUserClientwithImg',upload.single("image_user"),authController.addUserClientwithImg );
router.post('/addUserAdmin',authController.addUserAdmin );

router.put('/updateUser/:id',authController.updateUser );

// router.delete('/deleteUser/:id',authController.deleteUser );

module.exports = router;
