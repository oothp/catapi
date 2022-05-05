const express = require('express')
const router = express.Router()
const catController = require('../controllers/cat')

router.get('/cats', catController.getAllCats)

router.get('/cats/:_id', catController.getCatById)
router.post('/cats/:id', catController.newCatPhoto) // pic for cat

module.exports = router
