// src/routes/commentsRoutes.js

const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

//routes
router.get('/comments', commentsController.getAllComments);
router.get('/comments/pag', commentsController.getAllCommentsPagination);
router.get('/comments/size', commentsController.getCommentsSize);
router.post('/comments', commentsController.createComment);
router.delete('/comments/:id', commentsController.deleteCommentById);

module.exports = router;