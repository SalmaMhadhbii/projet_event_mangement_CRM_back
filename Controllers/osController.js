// In Node.js, os is a built-in module that provides a set of operating system-related utility methods and properties. It allows you to interact with and retrieve information about the underlying operating system that your Node.js application is running on.



// to control os
// goal is to create functions related to os 
 
// squelette mta3 l controller 
const os =require('os');
// les fcts:
// fct getOsInformation : 
module.exports.getInformation = (req,res) => {
    // ki tabda bloc de code tista3mil try catch w ken fct wa7da tista3mel try then 
    // postman send signal to backend and back mayraja3ch wa7dou inti traja3 lil postman 
       // l controller e5er partie 9bal matraja3 signal
    try {
        // PARTIE CONTENU*************
        // os taccedi lil pc mte3ik bch tcapti data mou3ayna 
        // namportiw les vars :
        const osInformation = {
            hostname: os.hostname(),
            type:os.type(),
            platfrom:os.platform()
        }
        // ken mafamech info : 
        if(!osInformation){
            // tasna3 error mte3ik 
            throw new Error("there is no Os information available");

        }
        // sinon show me the info: 
        res.status(200).json({osInformation});
        // res.status(200).json({ message: "hi from osController", platform: platform });
    } catch (error) {
        
       res.status(500).json({message:error.message});    
    }
}