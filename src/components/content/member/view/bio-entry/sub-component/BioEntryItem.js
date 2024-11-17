import React from "react";
import './bio-entry.css';

const BioEntryItem = ({ entry, onSelect }) => {
  if (!entry) {
    console.error("Entry is undefined!");
    return null;
  }

  const handleOnClick = () => {
    console.log(`Selecting entry with id: ${entry.id} and entry is ${JSON.stringify(entry)}`);
    onSelect(entry.id);
  }

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      onClick={handleOnClick}
      key={entry.id}
    >
      <div>
        <strong>{entry.entryDate}</strong> at {entry.entryTime} - {entry.weight}{" "}
        lbs, Ketone Level: {entry.ketoneLevel}
      </div>
    </li>
  );
};

export default BioEntryItem;
