const User = require('../models/user')

//GET '/users'
const getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.send({ Error: err })
        }
        return res.send(users);
        })
}

//GET '/review/:id'
const getUserById = (req, res) => {
    let user_id = req.params.id //get the user name

    //find the specific tea with that name
    User.findOne({ id:user_id }, (err, data) => {
    if(err || !data) {
        return res.json({message: 'User not found' })
    }
    else return res.json(data); //return the review object if found
    }).populate('reviews')
};

const updateUser = (req, res) => {
    res.json({"udpate": "ok"})
}

//DELETE '/cat/:name'
const deleteUser = (req, res) => {
    res.json({"delete": "ok"})
//     let userId = req.params.id; // get the id of review to delete

//     Tea.deleteOne({id:userId}, (err, data) => {
//     //if there's nothing to delete return a message
//     if( data.deletedCount == 0) return res.json({message: "User doesn't exist."});
//     //else if there's an error, return the err message
//     else if (err) return res.json(`Something went wrong, please try again. ${err}`);
//     //else, return the success message
//     else return res.json({message: "User deleted."});
//     });
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}


