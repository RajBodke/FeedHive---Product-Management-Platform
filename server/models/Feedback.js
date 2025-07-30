const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minlength: [2, 'User name must be at least 2 characters'],
    maxlength: [50, 'User name must be less than 50 characters']
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    minlength: [3, 'Comment must be at least 3 characters'],
    maxlength: [500, 'Comment must be less than 500 characters']
  }
}, {
  timestamps: true
});

const feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title must be less than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    minlength: [5, 'Content must be at least 5 characters']
  },
  user: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minlength: [2, 'User name must be at least 2 characters'],
    maxlength: [50, 'User name must be less than 50 characters']
  },
  comments: [commentSchema],
  upvotes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['suggestion', 'planned', 'in-progress', 'live'],
    default: 'suggestion'
  },
  category: {
    type: String,
    enum: ['feature', 'UI', 'UX', 'enhancement', 'bug'],
    default: 'feature'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);