import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Task Manager
          </Link>
          <Link to="/new" className="btn-primary">
            New Task
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 