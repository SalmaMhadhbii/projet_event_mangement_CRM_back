// bch tkoun feha sign in sign up ... 

// njibou l user model li sna3neh fil models 
const userModel = require('../Models/userSchema');
// nabdew bil get bch ntestiw l 5idma ba3d post ba3d delete ba3d update 

// nista3mlou fct async bch nistanew l fct lin tikmel 
module.exports.getAllUsers= async(req,res)=>{
    try {
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}