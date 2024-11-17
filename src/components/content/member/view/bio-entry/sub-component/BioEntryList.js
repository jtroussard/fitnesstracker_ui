import React from "react";
import BioEntryItem from "./BioEntryItem";

const BioEntryList = ({ entries, onSelectEntry, onAddEntry }) => {
  return (
    <div>
      <button onClick={onAddEntry} className="btn btn-primary mb-3">
        Add New Entry
      </button>
      <ul className="list-group">
        {entries.map((entry) => (
          <BioEntryItem
            key={entry.id}
            entry={entry}
            onSelect={() => onSelectEntry(entry.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default BioEntryList;
