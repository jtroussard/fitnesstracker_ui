// LargeTile.js
import React from 'react';

const LargeTile = ({ title, children }) => {
  return (
    <div className="tile large-tile">
      <h3>{title}</h3>
      <div className="tile-content">{children}</div>
    </div>
  );
};

export default LargeTile;
