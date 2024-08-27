// njibou l event model li sna3neh fil models
const eventModel = require("../Models/eventSchema");

// min na7iyet l event thanina ili 3indou l creator ama binisba lil db mta3 l creator bch nal9aw ma3endouch event
// donc lezem njibou l userModel w na3mloulou modification
const userModel = require("../Models/userSchema");

// CRUD : Create Read Delete Update

// 1/READ
module.exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    // const event = await eventModel.findById(id);
    
    // n7ib nrod l user yothhor kemil mch ken l id 
    // const event = await eventModel.findById(id).populate('relation1').populate('relation2')...;
    const event = await eventModel.findById(id).populate('creator');
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2/CREATE
module.exports.createEvent = async (req, res) => {
  try {
    const {
      name,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      price,
      address,
      creatorId,
    } = req.body;
    const event = new eventModel({
      name,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      price,
      address,
      creator:creatorId,
    });
    await event.save();
    // events ism champ li mawjoud fi userModel
    await userModel.findByIdAndUpdate(creatorId, {
      $push: { events: event._id },
    });
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3/DELETE
module.exports.deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;

    // const checkIfEventExists=await eventModel.findByID(id);
    // if (!checkIfEventExists){
    //   throw new Error("event not found");
    // }

    const event = await eventModel.findByIdAndDelete(id);
    if (!event) {
      return res.status(203).json({ message: "event not found" });
    }

    // mizilt mch 3arfa l fekra ama normalement ki bch tfasa5 event bch yetfasa5 min 3ind il users ili mcharkin fih
    await userModel.updateMany({}, { $pull: { events: event._id } });
    res.status(200).json({message: 'Event successfully deleted'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4/UPDATE
module.exports.updateEvent = async (req, res) => {
  try {
    // njibou l id mta3 l event li bch tbadlou 
    const { id } = req.params;
   
    const {
      name,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      price,
      address,
      creatorId,
    } = req.body;

  
    const event = await eventModel.findByIdAndUpdate(id, {
      name,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      price,
      address,
      creator: creatorId,
    });
     
    // if(!event){
    //   throw new Error("event not found");
      // wela return res.status(404).json({ message: "event not found" });
    // }
    res.status(200).json({ event });
    console.log({event});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
