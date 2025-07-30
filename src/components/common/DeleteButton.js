import React, { useState } from 'react';
import './DeleteButton.css';

const DeleteButton = ({ feedbackId, onDelete, className = '' }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this feedback? This action cannot be undone.');
    
    if (!isConfirmed) {
      return;
    }

    setIsDeleting(true);
    
    try {
      await onDelete(feedbackId);
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('Failed to delete feedback. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className={`delete-button ${className}`}
      onClick={handleDelete}
      disabled={isDeleting}
      title="Delete feedback"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </svg>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton; 