const service = require('../service/cat_service')

//GET '/cats'
const getAllCats = (req, res) => {
    service.getAll()
        .then(cats => { res.status(200).send(cats) })
        .catch(err => {
            console.log(err)
            sendError(res, err)
        })
}

//GET '/cat/:id'
const getCatById = (req, res) => {
    service.getCatById(req.params)
        .then(cat => { res.status(200).send(cat) })
        .catch(err => {
            console.error(err)
            sendError(res, err)
        })
}

//POST '/cat/:id'
// const newCatPhoto = (req, res, next) => {
//     res.json({ message: "POST 1 cat photo" });
// }

//DELETE '/cat/:name'
// cant delete cats

// //export controller functions
module.exports = {
    getAllCats,
    getCatById,
    // newCatPhoto,
}

const Cat = require("../models/cat");
