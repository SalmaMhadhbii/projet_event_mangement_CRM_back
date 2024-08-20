const mongoose = require("mongoose");

module.exports.connectToMongoDB = async () => {
  console.log("Connecting to MongoDB at:", process.env.URL_MONGO);

  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.URL_MONGO)
    .then(() => {
      console.log("connect to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};
