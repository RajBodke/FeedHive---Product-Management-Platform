import React, { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ feedbackId, onCommentAdded }) => {
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }
    
    if (comment.length < 3) {
      setError('Comment must be at least 3 characters');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${feedbackId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userName.trim(),
          content: comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const data = await response.json();
      
      // Call the callback to update the parent component
      if (onCommentAdded) {
        onCommentAdded(data.data);
      }
      
      // Clear the form
      setComment('');
      setUserName('');
    } catch (error) {
      setError('Failed to add comment. Please try again.');
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-form">
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="comment-form__user">
          <label htmlFor="userName">Your Name</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="comment-form__content">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            disabled={isSubmitting}
            required
            rows="3"
          />
        </div>
        
        {error && <div className="comment-form__error">{error}</div>}
        
        <button 
          type="submit" 
          className="comment-form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Comment...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm; 