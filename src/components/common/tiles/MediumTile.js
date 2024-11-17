// MediumTile.js
import React from 'react';

const MediumTile = ({ title, content }) => {
  return (
    <div className="tile medium-tile">
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
};

export default MediumTile;
