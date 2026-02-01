import { Link } from 'react-router-dom';

const Emergency = () => {
  return (
    <div className="space-y-6">
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">
          Emergency
        </h1>
      </header>

      <div className="card p-8 text-center">
        <h2 className="text-xl font-bold text-warm-900 mb-2">Coming Soon</h2>
        <p className="text-warm-600">
          This feature is under development.
        </p>
      </div>
    </div>
  );
};

export default Emergency;
