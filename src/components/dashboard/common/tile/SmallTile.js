// SmallTile.js
import React from 'react';

const SmallTile = ({ title, content }) => {
  return (
    <div className="tile small-tile">
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
};

export default SmallTile;
