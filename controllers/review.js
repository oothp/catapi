const service = require('../service/review_service')

//GET '/reviews'
const getAllReviews = (req, res) => {
  service.getAll()
    .then(reviews => { res.status(200).send(reviews) })
    .catch(err => {
      console.log(err)
      sendError(res, err)
    })
}

//POST /reviews
const newReview = async (req, res) => {
  service.createReview(req.user, req.body)
    .then(review => { res.status(201).send(review) })
    .catch(err => {
      console.error(err)
      sendError(res, err)
    })
}

//GET '/reviews/:id'
const getReview = (req, res) => {
  service.getReviewById(req.params)
    .then(review => { res.status(200).send(review) })
    .catch(err => {
      console.error(err)
      sendError(res, err)
    })
}

//DELETE '/reviews/:id'
const deleteReview = (req, res) => {

  service.deleteReview(req.params)
    .then(cat => { res.status(204).send('ok') })
    .catch(err => {
      console.error(err)
      sendError(res, err)
    })
}

//PUT '/reviews/:id'
const updateReview = (req, res) => {
  service.updateReview(req.params, req.body)
    .then(review => { res.status(200).send(review) })
    .catch(err => {
      console.error(err)
      sendError(res, err)
    })
}

function sendError(res, err) {
  res.status(err.status)
    .send({
      Error: err.message
    })
}

module.exports = {
  getAllReviews,
  newReview,
  getReview,
  deleteReview,
  updateReview
}
