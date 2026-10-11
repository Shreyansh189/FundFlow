import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStartupById } from '../api/startups';
import { generateStartupPitch } from '../api/ai';
import { createBookmark, deleteBookmark } from '../api/bookmarks';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './StartupDetails.css';
import ReactMarkdown from 'react-markdown';
const StartupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [pitch, setPitch] = useState('');
  const [pitchLoading, setPitchLoading] = useState(false);
  const [pitchError, setPitchError] = useState('');

  useEffect(() => {
    fetchStartup();
  }, [id]);

  const fetchStartup = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await getStartupById(id);
      setStartup(data.startup);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load startup details.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isBookmarked) {
        await deleteBookmark(id);
        setIsBookmarked(false);
      } else {
        await createBookmark(id);
        setIsBookmarked(true);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setIsBookmarked(true);
      }
    }
  };

  const handleGeneratePitch = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setPitchLoading(true);
    setPitchError('');
    setPitch('');

    try {
      const response = await generateStartupPitch(id);
      setPitch(response.pitch);
    } catch (err) {
      setPitchError(
        err.response?.data?.message || 
        'Failed to generate pitch. The AI service may be temporarily unavailable.'
      );
    } finally {
      setPitchLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading startup details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchStartup} />;
  }

  if (!startup) {
    return <ErrorMessage message="Startup not found." />;
  }

  return (
    <div className="startup-details-container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary back-button">
        ← Back
      </button>

      <div className="startup-details-card">
        <div className="startup-details-header">
          <div className="startup-title-row">
            <h1 className="startup-details-title">{startup.name}</h1>
            {user && (
              <button
                onClick={handleBookmark}
                className="bookmark-button"
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark this startup'}
              >
                {isBookmarked ? '❤️' : '🤍'}
              </button>
            )}
          </div>
          
          {startup.tagline && (
            <p className="startup-details-tagline">{startup.tagline}</p>
          )}
          
          <span className="startup-details-industry">{startup.industry}</span>
        </div>

        <div className="startup-info-grid">
          <div className="info-item">
            <span className="info-label">Funding Required</span>
            <span className="info-value funding">
              ${startup.fundingRequired.toLocaleString()}
            </span>
          </div>

          {startup.location && (
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{startup.location}</span>
            </div>
          )}

          {startup.founder && (
            <div className="info-item">
              <span className="info-label">Founder</span>
              <span className="info-value">{startup.founder.name}</span>
            </div>
          )}

          {startup.website && (
            <div className="info-item">
              <span className="info-label">Website</span>
              <a 
                href={startup.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="info-value"
                style={{ color: '#2563eb' }}
              >
                Visit Site →
              </a>
            </div>
          )}
        </div>

        <div className="startup-details-section">
          <h2>About</h2>
          <p>{startup.description}</p>
        </div>

        <div className="ai-section">
          <h2>🤖 AI Pitch Assistant</h2>
          <p style={{ margin: 0, opacity: 0.95 }}>
            Generate a professional investor pitch using AI
          </p>
          
          {!pitch && (
            <button
              onClick={handleGeneratePitch}
              className="btn btn-secondary"
              disabled={pitchLoading}
              style={{ marginTop: '1rem' }}
            >
              {pitchLoading ? 'Generating Pitch...' : 'Generate Investor Pitch'}
            </button>
          )}

          {pitchError && (
            <div className="ai-error">{pitchError}</div>
          )}

          {pitch && (
  <div className="ai-pitch-content">
    <div className="pitch-header">
      <div>
        <span className="pitch-eyebrow">AI GENERATED</span>
        <h3>Investor Pitch Brief</h3>
        <p>Prepared for {startup.name}</p>
      </div>

      <button
        className="pitch-copy-button"
        onClick={() => navigator.clipboard.writeText(pitch)}
      >
        Copy pitch
      </button>
    </div>

    <div className="pitch-markdown">
      <ReactMarkdown>
        {pitch.replace(/\\(?=#{1,6}\s|\*\*)/g, "")}
      </ReactMarkdown>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default StartupDetails;
