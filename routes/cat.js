const express = require('express')
const router  = express.Router()
const catController = require('../controllers/cat')

router.get('/cats', catController.getAllCats)

router.get('/cat/:_id', catController.getCatById)
router.post('/cat/:id', catController.newCatPhoto) // pic for cat

module.exports = router
