import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import DropDownCategory from '../../components/DropDownCategory';

// Common components
import Button from '../../components/common/Button';
import BackButton from '../../components/common/BackButton';

// API Services
import { createFeedback } from '../../services/api';

// Styles
import './CreateSuggestion.css';

const categoryList = ['feature', 'UI', 'UX', 'enhancement', 'bug'];

const CreateSuggestion = ({ suggestions, setSuggestions }) => {
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState('feature');
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeCategory = (newCategory) => setCurrentCategory(newCategory);

  const handleSubmitSuggestion = async (e) => {
    e.preventDefault();

    try {
      if (userName === '') throw new Error("User name can't be empty...");
      if (userName.length < 2) throw new Error('User name is too short...');
      if (details === '') throw new Error("The input can't be empty...");
      if (details.length < 2) throw new Error('The input is too short...');
      if (title === '') throw new Error("The input can't be empty...");
      if (title.length < 2) throw new Error('The input is too short...');

      setLoading(true);
      setError(null);

      const feedbackData = {
        title,
        content: details,
        user: userName,
        category: currentCategory,
        status: 'suggestion',
        upvotes: 0,
      };

      const newFeedback = await createFeedback(feedbackData);
      
      // Update local state with new feedback
      setSuggestions((prevSuggestions) => [newFeedback, ...prevSuggestions]);
      
      setUserName('');
      setDetails('');
      setTitle('');
      setSuccess('The Feedback has been added!');
      setTimeout(() => navigate('/product-feedback-app/'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to create feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-suggestion--container">
      <Link to="/product-feedback-app/" className="back-btn">
        <BackButton theme={'light'} />
      </Link>
      <div className="plus-icon">
        <span>+</span>
      </div>
      <div className="create-suggestion">
        <header>
          <h1>Create New Feedback</h1>
        </header>
        <form onSubmit={handleSubmitSuggestion}>
          <main>
            <div className="create-suggestion__user">
              <label>
                <h2>Your Name</h2>
                <p className="create-suggestion__user__description">
                  Enter your name for this feedback
                </p>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  disabled={loading}
                  placeholder="Enter your name"
                />
              </label>
            </div>
            <div className="create-suggestion__title">
              <label>
                <h2>Feedback Title</h2>
                <p className="create-suggestion__title__description">
                  Add a short, descriptive headline
                </p>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  disabled={loading}
                  placeholder="Enter feedback title"
                />
              </label>
            </div>
            <div className="create-suggestion__category">
              <h2>Category</h2>
              <p className="create-suggestion__category__description">
                Choose a category for your feedback
              </p>
              <DropDownCategory
                currentCategory={currentCategory}
                changeCategory={changeCategory}
                categoryList={categoryList}
              />
            </div>
            <div className="create-suggestion__detail">
              <label>
                <h2>Feedback Detail</h2>
                <p className="create-suggestion__detail__description">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <textarea
                  onChange={(e) => setDetails(e.target.value)}
                  value={details}
                  disabled={loading}
                  placeholder="Enter feedback details"></textarea>
              </label>
            </div>
          </main>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
          <footer>
            <div className="save-btn">
              <Button 
                bgColor={'purple'} 
                content={loading ? 'Adding...' : 'Add Feedback'} 
              />
            </div>
            <Link
              to="/product-feedback-app/"
              className="create-suggestion--cancel-btn"
              onClick={() => {
                setUserName('');
                setTitle('');
                setDetails('');
                setError(null);
              }}>
              Cancel
            </Link>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default CreateSuggestion;
