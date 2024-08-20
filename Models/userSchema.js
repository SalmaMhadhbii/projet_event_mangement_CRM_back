const mongoose = require("mongoose");
// biblio lil hachage mta3 password
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    // two ways of defining data:
    // 1:
    name: {
      type: String,
      required: true /*unique:true , defaultValue: ...*/,
    },
    // 2:
    // surname: string,
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image_user: { type: String, defaultValue: "client.png" },
    role: { type: String, enum: ["admin", "client"] },
    // etat bch ta3rif active wale
    etat: { type: Boolean },
    age: Number
  },
  { timestamp: true }
);


userSchema.post("save", function (req, res, next) {
  console.log("new user was created & saved successfully");
  next();
});

// 7aja bch tsir 9bal e save mta3 user
// hashing the pswd before saving it in the database
userSchema.pre("save", async function (next) {
  try {
    // famech notion mta3 res.status(200).json({...
    // on a next 5ater laction bch tji fi wost l processus w t3adi
    // Perform operations here, e.g., hashing a password (hashage il asl mayarja3ch 3aks l cryptage fama key ynajim traja3 bih l asl (decryptage))
    const salt = await bcrypt.genSalt();
    const User = this; // fi 3outh this.param twali user.param
    User.password = await bcrypt.hash(User.password, salt);
    User.etat = false;

    next(); // Proceed to the next middleware or save the document
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// exporter le schema ena tant que model
const User = mongoose.model("User", userSchema);
module.exports = User;
