import React from 'react';

const FitnessEntryItem = ({ entry, onSelect }) => {
  console.log(`TUNA FISH entry:`, entry);

  if (!entry) {
    console.error('Entry is undefined!');
    return null;
  }

  return (
    <li 
      className="list-group-item d-flex justify-content-between align-items-center"
      onClick={onSelect}
    >
      <div>
        <strong>{entry.entryDate}</strong> at {entry.entryTime} - {entry.weight} lbs, Ketone Level: {entry.ketoneLevel}
      </div>
    </li>
  );
};

export default FitnessEntryItem;
