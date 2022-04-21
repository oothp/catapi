const express = require('express');
const router  = express.Router();
const locationController = require('../controllers/location');

router.get('/locations', locationController.getAllComments);
router.post('/location', locationController.newComment);
// router.delete('/comments', commentController.deleteAllCats);

router.get('/location/:id', locationController.getLocation); // maybe id?
router.delete('/location/:id', locationController.deleteLocation);
// router.post('/comment/:id', commentController.newCatPhoto); // pic for cat

module.exports = router;
