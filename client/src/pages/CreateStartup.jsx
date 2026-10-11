import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStartup } from '../api/startups';
import './StartupForm.css';
import './Auth.css';

const CreateStartup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    industry: '',
    description: '',
    fundingRequired: '',
    website: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        fundingRequired: parseFloat(formData.fundingRequired)
      };

      const response = await createStartup(dataToSubmit);
      navigate(`/startups/${response.startup._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create startup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="startup-form-container">
      <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ marginBottom: '1.5rem' }}>
        ← Back to Dashboard
      </button>

      <div className="startup-form-card">
        <h1>Create Your Startup</h1>
        <p>Share your venture with potential investors</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="startup-form">
          <div className="form-group">
            <label htmlFor="name">Startup Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your startup name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tagline">Tagline</label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="A catchy one-liner about your startup"
            />
          </div>

          <div className="form-group">
            <label htmlFor="industry">Industry *</label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            >
              <option value="">Select an industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your startup, what problem it solves, and your vision"
              rows="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fundingRequired">Funding Required ($) *</label>
            <input
              type="number"
              id="fundingRequired"
              name="fundingRequired"
              value={formData.fundingRequired}
              onChange={handleChange}
              required
              min="0"
              placeholder="50000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourstartup.com"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Startup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStartup;
