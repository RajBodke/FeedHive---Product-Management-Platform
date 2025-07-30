import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import SuggestionDetails from './pages/SuggestionDetails/SuggestionDetails';
import CreateSuggestion from './pages/CreateSuggestion/CreateSuggestion';
import EditSuggestion from './pages/EditSuggestion/EditSuggestion';

// Components
import RoadmapList from './components/RoadmapList';

// API Services
import { fetchFeedbacks, deleteFeedback } from './services/api';

// Styles
import './App.css';

// Initial data for currentUser
import data from './data.json';

const { currentUser } = data;

const innerWidth = window.innerWidth;

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(innerWidth);
  const { pathname } = useLocation();

  // Fetch feedbacks from API
  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        setLoading(true);
        const feedbacks = await fetchFeedbacks();
        setSuggestions(feedbacks);
        setError(null);
      } catch (err) {
        setError('Failed to load feedbacks');
        console.error('Error loading feedbacks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFeedbacks();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWindowWidth(window.innerWidth);
    });
  });

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('overflowY-hidden');
  };

  // Handle deleting feedback
  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await deleteFeedback(feedbackId);
      // Remove the deleted feedback from state
      setSuggestions(prevSuggestions => 
        prevSuggestions.filter(suggestion => suggestion._id !== feedbackId)
      );
    } catch (error) {
      console.error('Error deleting feedback:', error);
      throw error;
    }
  };

  const suggestionStatus = [];
  const planned = [];
  const inProgress = [];
  const live = [];

  suggestions.forEach((suggestion) => {
    if (suggestion.status === 'planned') planned.push(suggestion);
    if (suggestion.status === 'in-progress') inProgress.push(suggestion);
    if (suggestion.status === 'live') live.push(suggestion);
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div
      className={`App ${
        menuOpen &&
        (pathname === '/product-feedback-app/' ||
          pathname === '/product-feedback-app')
          ? 'dark'
          : null
      }`}>
      <Routes>
        <Route
          path="/product-feedback-app/"
          element={
            <Home
              suggestionRequests={suggestions}
              suggestionStatusLength={suggestionStatus.length}
              plannedLength={planned.length}
              inProgressLength={inProgress.length}
              liveLength={live.length}
              menuOpen={menuOpen}
              handleMenuToggle={handleMenuToggle}
              windowWidth={windowWidth}
              onDeleteFeedback={handleDeleteFeedback}
            />
          }
        />
        <Route
          path="/product-feedback-app/suggestion-details/:id/*"
          element={
            <SuggestionDetails
              suggestions={suggestions}
              currentUser={currentUser}
              windowWidth={windowWidth}
              onDeleteFeedback={handleDeleteFeedback}
            />
          }
        />
        <Route
          path="/product-feedback-app/create-suggestion"
          element={
            <CreateSuggestion
              suggestions={suggestions}
              setSuggestions={setSuggestions}
            />
          }
        />
        <Route
          path="/product-feedback-app/edit-suggestion/:id/*"
          element={
            <EditSuggestion
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              windowWidth={windowWidth}
            />
          }
        />
        <Route
          path="/product-feedback-app/roadmap-list/*"
          element={
            <RoadmapList
              planned={planned}
              inProgress={inProgress}
              live={live}
              windowWidth={windowWidth}
              onDeleteFeedback={handleDeleteFeedback}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
