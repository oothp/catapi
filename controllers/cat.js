const service = require('../service/cat_service')
const errorHandler = require('../util/error_handler')

//GET '/cats'
const getAllCats = (req, res) => {
    service.getAll()
        .then(cats => { res.status(200).send(cats) })
        .catch(err => {
            console.error(err)
            errorHandler.processError(res, err)
        })
}

//GET '/cat/:id'
const getCatById = (req, res) => {
    service.getCatById(req.params)
        .then(cat => { res.status(200).send(cat) })
        .catch(err => {
            console.error(err)
            errorHandler.processError(res, err)
        })
}

//POST '/cat/:id'
const newCatPhoto = (req, res) => {
    res.json({ message: "POST add photo" })
}

//DELETE '/cat/:name'
// cant delete cats

// //export controller functions
module.exports = {
    getAllCats,
    getCatById,
    newCatPhoto
}