const express = require('express');
const router  = express.Router();
const userController = require('../controllers/user');

router.get('/users', userController.getAllUsers);
router.post('/user', userController.newUser);
// router.delete('/users', userController.deleteAllReviews);

router.get('/user/:id', userController.getUser); // maybe id?
// router.delete('/user/:id', userController.deleteReview);
// router.post('/user/:id', userController.newCatPhoto); // pic for cat

module.exports = router;
