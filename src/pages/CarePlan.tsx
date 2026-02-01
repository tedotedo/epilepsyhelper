import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const CarePlan = () => {
  return (
    <div className="space-y-6">
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-accent-600" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">
              Care Plan
            </h1>
            <p className="text-sm text-warm-500">Emergency protocols and care information</p>
          </div>
        </div>
      </header>

      <div className="card p-8 text-center">
        <FileText className="w-16 h-16 mx-auto text-warm-300 mb-4" />
        <h2 className="text-xl font-bold text-warm-900 mb-2">Coming Soon</h2>
        <p className="text-warm-600">
          Create personalized care plans with emergency medication protocols based on NICE guidelines.
        </p>
      </div>
    </div>
  );
};

export default CarePlan;
