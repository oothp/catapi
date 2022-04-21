const User = require("../models/user");

//GET '/users'
const getAllUsers = (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
        });
};

//POST user
const newUser = (req, res) => {
  //check if the user already exists in db
    User.findOne({ _id: req.body.id }, (err, data) => {
    //if user not in db, add
        if (!data) {
            const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar,
            reviews: req.body.reviews,
            comments: req.body.comments
            });

        // save this object to database
            newUser.save((err, data) => {
            if (err) return res.json({ Error: err });
            return res.json(data);
            });
        //if there's an error or the user is in db, return a message
        } else {
            if (err)
            return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "User already exists" });
        }
    });
};

//GET '/review/:id'
const getUser = (req, res) => {
    let user_id = req.params.id; //get the user name

    //find the specific tea with that name
    User.findOne({ id:user_id }, (err, data) => {
    if(err || !data) {
        return res.json({message: "User not found."});
    }
    else return res.json(data); //return the review object if found
    }).populate('reviews')
};

//DELETE '/cat/:name'
// const deleteUser = (req, res) => {
//     let userId = req.params.id; // get the id of review to delete

//     Tea.deleteOne({id:userId}, (err, data) => {
//     //if there's nothing to delete return a message
//     if( data.deletedCount == 0) return res.json({message: "User doesn't exist."});
//     //else if there's an error, return the err message
//     else if (err) return res.json(`Something went wrong, please try again. ${err}`);
//     //else, return the success message
//     else return res.json({message: "User deleted."});
//     });
// };

module.exports = {
    getAllUsers,
    newUser,
    getUser,
    // deleteUser,
};


