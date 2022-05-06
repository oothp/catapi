const ResourceNotFoundError = require("../errors/resource_not_found_error")
const Cat = require("../models/cat")

async function getAll() {
    let cats = await Cat.find({})
    if (!cats) throw new ResourceNotFoundError('Not found')

    return cats
}

async function getCatById({ id }) {
    let cat = await Cat.findOne({ _id: id }).populate('users').populate('locations')
    if (!cat) throw new ResourceNotFoundError('Cat not found')

    return cat
}

module.exports = {
    getAll,
    getCatById
}