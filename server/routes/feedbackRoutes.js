const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// GET / — return all feedbacks from DB
router.get('/', feedbackController.getAllFeedback);

// POST / — create new feedback in DB
router.post('/', feedbackController.createFeedback);

// DELETE /:id — delete specific feedback by ID
router.delete('/:id', feedbackController.deleteFeedback);

// POST /:id/comments — add comment to specific feedback
router.post('/:id/comments', feedbackController.addComment);

// GET /:id/comments — get comments for specific feedback
router.get('/:id/comments', feedbackController.getComments);

module.exports = router; 