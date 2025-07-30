const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all feedback
export const fetchFeedbacks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/`);
    if (!response.ok) {
      throw new Error('Failed to fetch feedbacks');
    }
    const data = await response.json();
    return data.feedbacks;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw error;
  }
};

// Create new feedback
export const createFeedback = async (feedbackData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });
    if (!response.ok) {
      throw new Error('Failed to create feedback');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
};

// Update feedback (for future use)
export const updateFeedback = async (id, feedbackData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });
    if (!response.ok) {
      throw new Error('Failed to update feedback');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
};

// Delete feedback
export const deleteFeedback = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete feedback');
    }
    return true;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};

// Add comment to feedback
export const addComment = async (feedbackId, commentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/${feedbackId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      throw new Error('Failed to add comment');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Get comments for feedback
export const getComments = async (feedbackId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/${feedbackId}/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}; 