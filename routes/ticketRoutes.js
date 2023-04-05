const express = require('express'); 
const ticketController = require('../controller/ticketController');


const router = express.Router();

router.route(`/create/:id`).post(ticketController.createTicket);

router.route(`/manage/:id`).patch(ticketController.updateTicket);

router.route(`/info/:id`).get(ticketController.getTicket);

router.route(`/delete/:id`).delete(ticketController.deleteTicket);
              
router.route(`/checkout/:id`).post(ticketController.createTicketPayment);


  module.exports = router;