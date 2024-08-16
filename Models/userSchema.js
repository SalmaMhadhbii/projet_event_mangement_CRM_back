const mongoose = require("mongoose");
// biblio lil hachage mta3 password
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    // two ways of defining data:
    // 1:
    name: {
      type: "string",
      required: true /*unique:true , defaultValue: ...*/,
    },
    // 2:
    // surname: string,

    surname: { type: string, required: true },
    email: { type: string, required: true, unique: true },
    password: { type: string, required: true },
    image_user: { type: string, defaultValue: "client.png" },
    role: { type: string, enum: ["admin", "client"] },
    // etat bch ta3rif active wale
    etat: {type: boolean,}
  },
  { timestamp: true }
);

userSchema.post("save",function(req,res,next){
  console.log("new user created and saved successfully");
});

// 7aja bch tsir 9bal e save mta3 user
// hashing the pswd before saving it in the database 
userSchema.pre("save", async function (req, res, next) {
  try {
    // famech notion mta3 res.status(200).json({...
    // on a next 5ater laction bch tji fi wost l processus w t3adi
    // Perform operations here, e.g., hashing a password (hashage il asl mayarja3ch 3aks l cryptage fama key ynajim traja3 bih l asl (decryptage))
    const salt = await bcrypt.genSalt();
    const User = this; // fi 3outh this.param twali user.param
    User.password=await bcrypt.hash(User.password,salt);
    User.etat= false;
    
    
    next();// Proceed to the next middleware or save the document
  } catch (error) {
    next(err);// Pass the error to the error handling middleware
  }
});

// exporter le schema ena tant que model
const User = mangoose.model("User", userSchema);
module.exports = User;
