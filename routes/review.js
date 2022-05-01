const express = require('express');
const router  = express.Router();
const reviewController = require('../controllers/review');

router.get('/reviews', reviewController.getAllReviews);
router.post('/reviews', reviewController.newReview);

router.get('/reviews/:id', reviewController.getReview); // maybe id? | getById
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
