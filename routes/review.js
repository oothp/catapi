const express = require('express')
const router  = express.Router()
const reviewController = require('../controllers/review')

router.get('/reviews', reviewController.getAllReviews)
router.post('/reviews', reviewController.newReview)

router.get('/reviews/:id', reviewController.getReview)
router.delete('/reviews/:id', reviewController.deleteReview)
router.put('/reviews/:id', reviewController.updateReview)

module.exports = router
