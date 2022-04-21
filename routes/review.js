const express = require('express');
const router  = express.Router();
const reviewController = require('../controllers/review');

router.get('/reviews', reviewController.getAllReviews);
router.post('/review', reviewController.newReview);
// router.delete('/reviews', reviewController.deleteAllReviews);

router.get('/review/:id', reviewController.getReview); // maybe id?
router.delete('/review/:id', reviewController.deleteReview);
// router.post('/review/:name', reviewController.newCatPhoto); // pic for cat

module.exports = router;
