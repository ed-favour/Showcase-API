const express = require("express");
const userController = require('../controller/userController');
const authController = require('../controller/authController')

const router = express.Router();

router.post('/auth/userSignup', authController.userSignup)

router.post('/auth/organizationSignup', authController.organizationSignup)

router.post('/auth/login', authController.login)




router.route(`/profile/:id`).get(userController.getUser);

// router.route(`/update?field=email`).patch(userController.updateEmail);

// router.route(`/update/:id?field=pwd`).patch(userController.updatePassword);

// router.route(`/billing/add`).post(userController.createPayment);

// router.route(`/billing`).get(userController.getUserPayment);

// router.route(`/delete `).delete(userController.deleteUser);

// router.route(`/events `).get(userController.getAllUserEvents);

module.exports = router;
