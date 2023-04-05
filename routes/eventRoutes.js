const express = require("express");
const eventController = require('../controller/eventsController');

const router = express.Router();

router.route(`/create`).post(eventController.createEvent);

router.route(`/explore`).get(eventController.getAllEvent);

router.route(`/explore/:id`).get(eventController.getEvent);

router.route(`/manage/:id`).patch(eventController.updateEvent);

router.route(`/delete/:id`).delete(eventController.deleteEvent);

module.exports = router;
