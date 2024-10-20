import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tiles.css';

const LargeTile = ({ title, children, onClose }) => {
  return (
    <div className="card large-tile shadow-sm">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title mb-0">{title}</h3>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default LargeTile;
