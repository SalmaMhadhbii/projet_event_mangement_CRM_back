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
    const event = await eventModel.findByID(id);
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
      creatorId,
    });
    await event.save();
    // events ism champ li mawjoud fi userModel 
    await userModel.findByIdAndUpdate(creatorId, {
      $push: { events: event._id },
    });
    res.status(200).json({event});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3/DELETE
module.exports.deleteEvent = async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4/UPDATE
module.exports.updateEvent = async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
