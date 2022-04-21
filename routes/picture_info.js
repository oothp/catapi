const express = require('express');
const router  = express.Router();
const pictureInfoController = require('../controllers/pictureInfo');

router.get('/pictureInfos', pictureInfoController.getAllPictureInfos);
router.post('/pictureInfo', pictureInfoController.newPictureInfo);
router.delete('/psctureInfos', pictureInfoController.deleteAllPictureInfos);

router.get('/pictureInfo/:id', pictureInfoController.getPictureInfo); // maybe id?
router.delete('/pictureInfo/:id', pictureInfoController.deletePictureInfo);
// router.post('/review/:name', reviewController.newCatPhoto); // pic for cat

module.exports = router;
