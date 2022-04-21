const express = require('express');
const router  = express.Router();
const catController = require('../controllers/cat');

router.get('/cats', catController.getAllCats);
router.post('/cat', catController.newCat);
// router.delete('/cats', catController.deleteAllCats);

// router.get('/cat/:name', catController.getCatByName);
router.get('/cat/:_id', catController.getCatById);
router.delete('/cat/:id', catController.deleteCat);
router.post('/cat/:id', catController.newCatPhoto); // pic for cat

module.exports = router;
