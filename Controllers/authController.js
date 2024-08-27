// bch tkoun feha sign in sign up ...

// njibou l user model li sna3neh fil models
const userModel = require("../Models/userSchema");
// nabdew bil get bch ntestiw l 5idma ba3d post ba3d delete ba3d update

// nista3mlou fct async bch nistanew l fct lin tikmel
module.exports.getAllUsers = async (req, res) => {
  try {
    // await 5ater bch njbou mil base
    const usersList = await userModel.find().populate("events");
    // Send the list of users as a JSON response with a 200 status code
    res.status(200).json({ usersList });
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};

// nista3mlou fct async bch nistanew l fct lin tikmel
module.exports.getUserById = async (req, res) => {
  try {
    console.log(req.params); // what it gets: { id: '66c1f023f75d6942b98937ad' }

    const { id } = req.params;
    //const id = req.params.id

    const user = await userModel.findById(id).populate("events");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// nista3mlou fct async bch nistanew l fct lin tikmel
// THIS IS MY METHOD I DID IT MYSELF AND IT WORKS HAHA
module.exports.DeleteUser2 = async (req, res) => {
  try {
    console.log(req.params);

    const { id } = req.params;
    //const id = req.params.id
    const user = await userModel.findById(id);
    await userModel.deleteOne(user);
    res.status(200).json("user deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other method :
module.exports.DeleteUser = async (req, res) => {
  try {
    console.log(req.params);

    const { id } = req.params;

    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not found");
    }

    const user = await userModel.findByIdAndDelete(id);

    res.status(200).json("user deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// nista3mlou fct async bch nistanew l fct lin tikmel
module.exports.addUserClient = async (req, res) => {
  try {
    // Log the incoming request body for debugging(affiche e data li jet min postman)
    console.log(req.body); // exemple Output: { name: 'Alice', surname: 'Smith', email: 'alice.smith@example.com', password: 'mypassword' }

    //  extract the name, surname, email, and password properties from req.body
    const { name, surname, email, password } = req.body;

    const roleClient = "client";

    // Create a new user instance with the provided data
    const user = new userModel({
      name,
      surname,
      email,
      password,
      role: roleClient,
    });

    // Save the new user to the database
    const useradded = await user.save();

    // Respond with the newly created user and a 200 status code
    res.status(201).json(useradded);
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    console.error(error); // Logs the entire error object
    res.status(500).json({ message: error.message });
  }
};

// nista3mlou fct async bch nistanew l fct lin tikmel
module.exports.addUserAdmin = async (req, res) => {
  try {
    // Log the incoming request body for debugging(affiche e data li jet min postman)
    console.log(req.body); // exemple Output: { name: 'Alice', surname: 'Smith', email: 'alice.smith@example.com', password: 'mypassword' }

    //  extract the name, surname, email, and password properties from req.body
    const { name, surname, email, password } = req.body;

    const roleClient = "admin";

    // Create a new user instance with the provided data
    const user = new userModel({
      name,
      surname,
      email,
      password,
      role: roleClient,
    });

    // Save the new user to the database
    const useradded = await user.save();
    res.status(201).json(useradded);
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};

// mecanisme mta3 l update ychid e data il bch ysirilha l update { name, surname, age } bch titkraza b autre { name, surname, age } sen fou mil valeur mta3 e data
module.exports.updateUser = async (req, res) => {
  try {
    // Log the incoming request body for debugging(affiche e data li jet min postman)
    console.log(req.body); // exemple Output: { name: 'Alice', surname: 'Smith', email: 'alice.smith@example.com', password: 'mypassword' }

    //  extract the name, surname,
    // na3mlou update lil name w surname kahao ,email w password wa7adhom
    const { id } = req.params;
    const { name, surname, age } = req.body;

    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not found");
    }

    if (age > 100 || age <= 0) {
      throw new error("age not right");
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { name, surname, age },
      },
      { new: true }
    );

    res.status(201).json(updatedUser);
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};

module.exports.triUsers = async (req, res) => {
  try {
    //  :1 croissant  :-1 decroissant
    const usersList = await userModel.find().sort({ age: -1 });

    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MY METHOD
module.exports.searchUserByName2 = async (req, res) => {
  try {
    const { name } = req.params;
    const usersList = await userModel.findOne({ name: name });

    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.searchUserByName = async (req, res) => {
  try {
    // tiktib fil postman http://localhost:5000/auth/searchUserByName?name=mo
    console.log(req.query.name);
    const { name } = req.query;
    // const  name= req.query.name
    const usersList = await userModel.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.searchUserByName3 = async (req, res) => {
  try {
    // tiktib fil postman fil body {"name":"moka"}
    console.log(req.body);
    const { name } = req.body;

    const usersList = await userModel.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// tala3 fil erreur hethi idk why: {"message": "$regex has to be a string"}

module.exports.searchUserByNameSort = async (req, res) => {
  try {
    // tiktib fil postman fil body {"name":"moka"}
    console.log(req.body);
    const { name } = req.body;

    const usersList = await userModel
      .find({
        name: { $regex: name, $options: "i" },
      })
      .sort({age : 1});
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
