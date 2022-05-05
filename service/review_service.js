const BadRequestError = require('../errors/bad_request_error')
const ResourceNotFoundError = require('../errors/resource_not_found_error')
const Cat = require('../models/cat')
const Review = require('../models/review')
const User = require('../models/user')
const { getById } = require('./user_service')

async function getAll() {
    let reviews = await Review.find({}).populate('cat')
    if (!reviews) throw new ResourceNotFoundError('Not found')

    return reviews
}

async function createReview({ data, iat, exp }, body) {
    let user = await User.findOne({ _id: data })
    if (!user) throw new ResourceNotFoundError('User not found')

    try {
        let cat = new Cat(body.cat)
        let savedCat = await cat.save()

        let review = Review({
            rating: body.rating,
            would_pet: body.would_pet,
            cat: savedCat,
            user: user
        })

        const options = { new: true }
        let updatedU = await User.findOneAndUpdate({ _id: user._id }, { $push: { reviews: review } }, options)
        if (!updatedU) throw new BadRequestError('Error saving to database')

        return await review.save()

    } catch (err) {
        throw new BadRequestError(err)
    }
}

async function getReviewById({ id }) {
    let review = await Review.findOne({ _id: id }).populate('cat').populate('user').populate('location')
    if (!review) throw new ResourceNotFoundError('Review not found')

    return review
}

async function deleteReview({ id }) {
    let review = await Review.findOneAndDelete({ _id: id })
    if (!review) throw new ResourceNotFoundError('Cannot delete review - not found')

    return review
}

async function updateReview({ id }, { rating, would_pet, cat, photos }) {

    // find cat id
    let r = await Review.findById(id)
    const cat_id = r.cat._id

    const options = { new: true }

    // updat the cat first
    const updateCatArgs = { name: cat.name, description: cat.description, will_scratch: cat.will_scratch }
    let ucat = await Cat.findByIdAndUpdate(cat_id, updateCatArgs, options)
    if (!ucat) throw new ResourceNotFoundError('Error updating nested cat')

    // update review
    const updateReviewArgs = { rating: rating, would_pet: would_pet, photos: photos, cat: ucat }
    let review = await Review.findOneAndUpdate({ _id: id }, updateReviewArgs, options).populate('cat').populate('user')
    if (!review) throw new ResourceNotFoundError('Review not found, nothing to update')

    return review
}

module.exports = {
    getAll,
    createReview,
    getReviewById,
    deleteReview,
    updateReview
}