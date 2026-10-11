import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../api/dashboard';
import { deleteStartup } from '../api/startups';
import { useAuth } from '../context/AuthContext';
import StartupCard from '../components/StartupCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isFounder } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (startupId) => {
    if (!confirm('Are you sure you want to delete this startup? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteStartup(startupId);
      fetchDashboard();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete startup.');
    }
  };

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchDashboard} />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        {isFounder() && (
          <button onClick={() => navigate('/startups/create')} className="btn btn-primary">
            + Create Startup
          </button>
        )}
      </div>

      <div className="stats-grid">
        {isFounder() && (
          <div className="stat-card">
            <p className="stat-label">My Startups</p>
            <p className="stat-value">{dashboardData?.stats.myStartups || 0}</p>
          </div>
        )}
        <div className="stat-card">
          <p className="stat-label">Saved Startups</p>
          <p className="stat-value">{dashboardData?.stats.savedStartups || 0}</p>
        </div>
      </div>

      {isFounder() && (
        <div className="dashboard-section">
          <div className="section-header">
            <h2>My Startups</h2>
          </div>
          
          {dashboardData?.myStartups.length === 0 ? (
            <div className="empty-message">
              <p>You haven't created any startups yet.</p>
              <button onClick={() => navigate('/startups/create')} className="btn btn-primary">
                Create Your First Startup
              </button>
            </div>
          ) : (
            <div className="startups-grid">
              {dashboardData?.myStartups.map((startup) => (
                <div key={startup._id} className="startup-management-card">
                  <StartupCard startup={startup} />
                  <div className="startup-actions">
                    <button
                      onClick={() => navigate(`/startups/${startup._id}/edit`)}
                      className="btn btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(startup._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Saved Startups</h2>
        </div>
        
        {dashboardData?.savedStartups.length === 0 ? (
          <div className="empty-message">
            <p>You haven't saved any startups yet.</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Discover Startups
            </button>
          </div>
        ) : (
          <div className="startups-grid">
            {dashboardData?.savedStartups.map((startup) => (
              <StartupCard key={startup._id} startup={startup} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
