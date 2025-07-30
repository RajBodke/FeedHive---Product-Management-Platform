const Feedback = require('../models/Feedback');

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ feedbacks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { title, content, user } = req.body;
    const newFeedback = new Feedback({ title, content, user });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback created', data: newFeedback });
  } catch (error) {
    res.status(400).json({ message: 'Error creating feedback', error: error.message });
  }
};

// Delete feedback by ID
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if feedback exists
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    // Delete the feedback
    await Feedback.findByIdAndDelete(id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
};

// Add comment to feedback
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, content } = req.body;
    
    // Check if feedback exists
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    // Add comment to feedback
    feedback.comments.push({ user, content });
    await feedback.save();
    
    res.status(201).json({ 
      message: 'Comment added successfully', 
      data: feedback.comments[feedback.comments.length - 1] 
    });
  } catch (error) {
    res.status(400).json({ message: 'Error adding comment', error: error.message });
  }
};

// Get comments for a specific feedback
exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({ comments: feedback.comments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};