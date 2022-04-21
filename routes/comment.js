const express = require('express');
const router  = express.Router();
const commentController = require('../controllers/comment');

router.get('/comments', commentController.getAllComments);
router.post('/comment', commentController.newComment);
// router.delete('/comments', commentController.deleteAllCats);

router.get('/comment/:id', commentController.getComment); // maybe id?
router.delete('/comment/:id', commentController.deleteComment);
// router.post('/comment/:id', commentController.newCatPhoto); // pic for cat

module.exports = router;
