import { Link } from 'react-router-dom';
import './StartupCard.css';

const StartupCard = ({ startup }) => {
  return (
    <Link to={`/startups/${startup._id}`} className="startup-card">
      <div className="startup-card-header">
        <h3 className="startup-name">{startup.name}</h3>
        <span className="startup-industry">{startup.industry}</span>
      </div>
      
      {startup.tagline && (
        <p className="startup-tagline">{startup.tagline}</p>
      )}
      
      <p className="startup-description">
        {startup.description.length > 120
          ? startup.description.substring(0, 120) + '...'
          : startup.description}
      </p>
      
      <div className="startup-card-footer">
        <div className="startup-funding">
          <span className="label">Funding Required:</span>
          <span className="value">${startup.fundingRequired.toLocaleString()}</span>
        </div>
        
        {startup.founder && (
          <div className="startup-founder">
            <span className="label">Founder:</span>
            <span className="value">{startup.founder.name}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default StartupCard;
