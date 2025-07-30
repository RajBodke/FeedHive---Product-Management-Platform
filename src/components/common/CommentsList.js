import React from 'react';
import './CommentsList.css';

const CommentsList = ({ comments = [] }) => {
  if (comments.length === 0) {
    return (
      <div className="comments-list">
        <h3>Comments</h3>
        <p className="comments-list__empty">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="comments-list">
      <h3>Comments ({comments.length})</h3>
      <div className="comments-list__items">
        {comments.map((comment, index) => (
          <div key={comment._id || index} className="comment-item">
            <div className="comment-item__header">
              <span className="comment-item__user">{comment.user}</span>
              <span className="comment-item__date">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="comment-item__content">
              {comment.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList; 