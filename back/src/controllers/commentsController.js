// src/controllers/userController.js
const commentsService = require('../services/commentsService.js');

exports.getAllComments = async (req, res) => {
  try {
    const comments = await commentsService.fetchAllComments();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCommentsPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const countPerpage = 10;
    const comments = await commentsService.fetchComments_P_SortedDate(page, countPerpage);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const newComment = await commentsService.addComment(req.body); // pass only body
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentsSize = async (req, res) => {
  try {
    const size = await commentsService.fetchCommentsSize(req.body);
    res.status(201).json(size);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await commentsService.deleteCommentById(id);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Comment not found') {
      res.status(404).json({ error: err.message });
    } else if (err.message === 'Valid comment ID is required') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};
