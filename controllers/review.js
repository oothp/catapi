const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Review = require("../models/review");
const Cat = require("../models/cat");
const Location = require("../models/location");
const User = require("../models/user");
const PictureInfo = require("../models/picture_info");
const Logger = require("nodemon/lib/utils/log");

//GET '/reviews'
const getAllReviews = (req, res) => {
  Review.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json(data);
  });
};

//POST review
const newReview = (req, res) => {
  User.findOne({ _id: req.body.user_id }, (err, user) => {
    if (err || !user) {
      console.error("User not found.");

    } else {
      console.log("User found, moving forward.");

      cat = new Cat({
        name: req.body.cat.name,
        description: req.body.cat.description,
        will_scratch: req.body.cat.will_scratch,
        created_at: req.body.cat.created_at,
      })

      cat.save((err, data) => {
        if (err) {
          return res.json({ Error: data })
        } else {
          console.log("=>> Cat saved! cat id: ", cat._id)
        }
      })

      const newReview = new Review({
        rating: req.body.rating,
        would_pet: req.body.would_pet,
        cat,
        user,
        created_at: req.body.created_at,
      })

      newReview.save((err, data) => {
        if (err) {
          return res.json({ Error: err });
        } else {
          User.findOneAndUpdate(
            { _id: user.id },
            { $push: { reviews: newReview } },
            function (error, success) {
              if (error) {
                console.log(error);
              } else {
                console.log(success);
              }
            }
          )
          return res.json({ Review: 'ok' })
        }
      })
    }
  })
}

//GET '/review/:id'
const getReview = (req, res) => {
  let review_id = req.params.id; //get the review id
  Review.findOne({ _id: review_id }, (err, data) => {
    if (err || !data) {
      if (err) {
        console.log("Error: ===>>", err.message);
      }
      return res.send({ message: "Review not found." });
    } else {
      return res.send(data);
    }
  }).populate("cat")
    .populate("user")
}

//DELETE '/review/:name'
const deleteReview = (req, res) => {
  let reviewId = req.params.id; // get the id of review to delete

  Review.deleteOne({ id: reviewId }, (err, data) => {
    //if there's nothing to delete return a message
    if (data.deletedCount == 0)
      return res.json({ message: "Review doesn't exist." });
    //else if there's an error, return the err message
    else if (err)
      return res.json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.json({ message: "Review deleted." });
  });
  // res.json({ message: "DELETE 1 review" });
}

module.exports = {
  getAllReviews,
  newReview,
  getReview,
  deleteReview,
}
