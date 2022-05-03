const service = require('../service/user_service')

const getAllUsers = (req, res) => {
    service.getAll()
    .then(users => {
        res.status(200).send(users)
    })
    .catch(err => {
        console.log('err >', err)
        res.status(400).send({ Error: err.message })
    })
}

const getUserById = (req, res) => {
    service.getById(req.params)
    .then(data => { res.status(200).send(data) })
    .catch(err => { res.status(400).send({ Error: err.message }) })
}

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


