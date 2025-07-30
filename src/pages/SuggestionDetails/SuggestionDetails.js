import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Components
import CommentForm from '../../components/common/CommentForm';
import CommentsList from '../../components/common/CommentsList';

// Common components
import Button from '../../components/common/Button';
import BackButton from '../../components/common/BackButton';
import Category from '../../components/common/Category';
import Upvote from '../../components/common/Upvote';
import Comments from '../../components/common/Comments';

// API Services
import { getComments } from '../../services/api';

// Styles
import './SuggestionDetails.css';

const SuggestionDetails = ({ suggestions, currentUser, windowWidth, onDeleteFeedback }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
  const suggestion = suggestions && suggestions.find((suggestion) => 
    suggestion._id === id || suggestion.id === parseFloat(id)
  );

  // Fetch comments for this feedback
  useEffect(() => {
    const fetchComments = async () => {
      if (!suggestion) return;
      
      try {
        setLoading(true);
        const feedbackId = suggestion._id || suggestion.id;
        const commentsData = await getComments(feedbackId);
        setComments(commentsData);
        setError(null);
      } catch (err) {
        setError('Failed to load comments');
        console.error('Error loading comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [suggestion]);

  // Handle new comment added
  const handleCommentAdded = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  if (!suggestion) {
    return (
      <div className="container">
        <div className="error">Feedback not found</div>
      </div>
    );
  }

  return (
    <div
      className={
        windowWidth < 1366 ? 'container' : 'suggestion-details--container'
      }>
      <div className={windowWidth >= 768 ? 'suggestion-details' : null}>
        <nav className="suggestion-details__nav">
          <Link to="/product-feedback-app/">
            <BackButton theme={'light'} />
          </Link>
          <Link
            to={`/product-feedback-app/edit-suggestion/${suggestion._id || suggestion.id}`}
            className="nav-btn--container">
            <Button bgColor={'blue'} content={'Edit Feedback'} />
          </Link>
        </nav>
        
        <div className="suggestion-list__item">
          <div
            className={
              windowWidth >= 768 ? 'suggestion-list__tablet-plus' : null
            }>
            {windowWidth >= 768 && (
              <div className="suggestion-list__tablet-plus__upvotes">
                <Upvote direction={'col'} upvotes={suggestion.upvotes || 0} />
              </div>
            )}
            <header className="suggestion-list__header">
              <div className="suggestion-header__info">
                <h2>{suggestion.title}</h2>
                <p className="suggestion-author">By: {suggestion.user || 'Anonymous'}</p>
                <p>{suggestion.content || suggestion.description}</p>
                <Category category={suggestion.category} />
              </div>
            </header>
            {windowWidth >= 768 && <Comments comments={comments} />}
          </div>
          <footer
            className={`suggestion-list__footer ${
              windowWidth >= 768 ? 'd-none' : null
            }`}>
            <Upvote direction={'row'} upvotes={suggestion.upvotes || 0} />
            <Comments comments={comments} />
          </footer>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          {loading ? (
            <div className="loading">Loading comments...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <CommentsList comments={comments} />
              <CommentForm 
                feedbackId={suggestion._id || suggestion.id}
                onCommentAdded={handleCommentAdded}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionDetails;
