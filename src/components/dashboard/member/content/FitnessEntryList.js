import React from "react";
import FitnessEntryItem from "./FitnessEntryItem";

const FitnessEntryList = ({ entries, onSelectEntry, onAddEntry }) => {
  return (
    <div>
      <button onClick={onAddEntry} className="btn btn-primary mb-3">
        Add New Entry
      </button>
      <ul className="list-group">
        {entries.map((entry) => (
          <FitnessEntryItem
            key={entry.entryId}
            entry={entry}
            onSelect={() => onSelectEntry(entry.entryId)}
          />
        ))}
      </ul>
    </div>
  );
};

export default FitnessEntryList;
