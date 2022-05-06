const service = require('../service/review_service')
const errorHandler = require('../util/error_handler')

//GET '/reviews'
const getAllReviews = (req, res) => {
  service.getAll()
    .then(reviews => { res.status(200).send(reviews) })
    .catch(err => {
      console.log(err)
      errorHandler.processError(res, err)
    })
}

//POST /reviews
const newReview = async (req, res) => {
  service.createReview(req.user, req.body)
    .then(review => { res.status(201).send(review) })
    .catch(err => {
      console.error(err)
      errorHandler.processError(res, err)
    })
}

//GET '/reviews/:id'
const getReview = (req, res) => {
  service.getReviewById(req.params)
    .then(review => { res.status(200).send(review) })
    .catch(err => {
      console.error(err)
      errorHandler.processError(res, err)
    })
}

//DELETE '/reviews/:id'
const deleteReview = (req, res) => {

  service.deleteReview(req.params)
    .then(cat => { res.status(204).send('ok') })
    .catch(err => {
      console.error(err)
      errorHandler.processError(res, err)
    })
}

//PUT '/reviews/:id'
const updateReview = (req, res) => {
  service.updateReview(req.params, req.body)
    .then(review => { res.status(200).send(review) })
    .catch(err => {
      console.error(err)
      errorHandler.processError(res, err)
    })
}

module.exports = {
  getAllReviews,
  newReview,
  getReview,
  deleteReview,
  updateReview
}
