import { useState, useEffect } from 'react';
import { getStartups } from '../api/startups';
import StartupCard from '../components/StartupCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './Home.css';

const Home = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  const industries = [
    'Technology',
    'FinTech',
    'HealthTech',
    'E-commerce',
    'EdTech',
    'SaaS',
    'AI/ML',
    'Blockchain',
    'Biotech',
    'CleanTech',
    'FoodTech',
    'Real Estate',
    'Gaming',
    'IoT',
    'Cybersecurity',
    'Other'
  ];

  const fetchStartups = async () => {
    setLoading(true);
    setError('');
    
    try {
      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (industry) params.industry = industry;
      
      const data = await getStartups(params);
      setStartups(data.startups);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load startups. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, [page, industry]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchStartups();
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && startups.length === 0) {
    return <Loading message="Loading startups..." />;
  }

  if (error && startups.length === 0) {
    return <ErrorMessage message={error} onRetry={fetchStartups} />;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Discover Innovative Startups</h1>
        <p>Connect with groundbreaking ventures seeking investment</p>
      </header>

      <div className="filters-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by name, tagline, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="industry-filter">
          <label htmlFor="industry">Filter by Industry:</label>
          <select
            id="industry"
            value={industry}
            onChange={handleIndustryChange}
            className="industry-select"
          >
            <option value="">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {startups.length === 0 ? (
        <div className="empty-state">
          <p>No startups found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="startups-grid">
            {startups.map((startup) => (
              <StartupCard key={startup._id} startup={startup} />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              
              <span className="pagination-info">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pagination.totalPages}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
