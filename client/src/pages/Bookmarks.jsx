import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookmarks, deleteBookmark } from '../api/bookmarks';
import StartupCard from '../components/StartupCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './Dashboard.css';

const Bookmarks = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await getBookmarks();
      setBookmarks(data.bookmarks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookmarks.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (startupId, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteBookmark(startupId);
      setBookmarks(bookmarks.filter(b => b.startup._id !== startupId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove bookmark.');
    }
  };

  if (loading) {
    return <Loading message="Loading bookmarks..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchBookmarks} />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Saved Startups</h1>
      </div>

      {bookmarks.length === 0 ? (
        <div className="empty-message">
          <p>You haven't saved any startups yet.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Discover Startups
          </button>
        </div>
      ) : (
        <div className="startups-grid">
          {bookmarks.map((bookmark) => (
            <div key={bookmark._id} className="startup-management-card">
              <StartupCard startup={bookmark.startup} />
              <div className="startup-actions">
                <button
                  onClick={(e) => handleRemoveBookmark(bookmark.startup._id, e)}
                  className="btn btn-secondary"
                >
                  Remove Bookmark
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
