// ba3d ma tasna3 el file timportih fi application.js

// LEZMEK TJIB LES 2 LIGNES HETHOM W LIGNE module.exports = router; W BA3D IMPORTI FIL APP MAKENICH ERREUR
var express = require("express");
var router = express.Router();

// nimportiw l conroller
const eventController = require("../Controllers/eventController");

router.get("/getAllEvents", eventController.getAllEvents);
router.get("/getEventById/:id", eventController.getEventById);

router.post("/createEvent", eventController.createEvent);

router.put("/updateEvent/:id", eventController.updateEvent);

router.delete("/deleteEvent/:id", eventController.deleteEvent); 

module.exports = router;
