const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    Name:String,
    type:String,
    startDate: Date, // Stored as Date object
    endDate: Date,   // Stored as Date object
    startTime: String, // Stored as a string in HH:MM format
    endTime: String,   // Stored as a string in HH:MM format
    price:Number,
    address:String,
    
    // foreign key:
    // User kima exportitou fi userschema
    // References the 'User' model by storing the user's ID
    creator:{type: mongoose.Schema.Types.ObjectId,ref:'User'}
}) ;
const Event = mongoose.model("Event",eventSchema);