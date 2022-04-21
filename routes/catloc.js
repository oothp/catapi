const express = require('express');
const router  = express.Router();
const catlocController = require('../controllers/catloc');

router.get('/catlocs', catlocController.getAllCatloc);
router.post('/catloc', catlocController.newCatloc);
// router.delete('/comments', commentController.deleteAllCats);

router.get('/location/:id', catlocController.getCatloc); // maybe id?
router.delete('/location/:id', catlocController.deleteCatloc);
// router.post('/comment/:id', commentController.newCatPhoto); // pic for cat

module.exports = router;
