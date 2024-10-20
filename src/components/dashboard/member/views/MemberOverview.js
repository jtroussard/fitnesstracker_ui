import React, { useState } from 'react';
import LargeTile from '../../common/tile/LargeTile';
import FitnessEntryList from '../content/FitnessEntryList';
import FitnessEntryDetails from '../content/FitnessEntryDetails';

const MemberOverview = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      entryDate: '2024-10-01',
      entryTime: '15:30:00',
      weight: 70.5,
      ketoneLevel: 1.5,
    },
    {
      id: 2,
      entryDate: '2024-10-02',
      entryTime: '16:00:00',
      weight: 72.3,
      ketoneLevel: 1.2,
    },
  ]);
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  const handleSelectEntry = (id) => {
    setSelectedEntryId(id);
  };

  const handleAddEntry = () => {
    const newEntry = {
      id: Date.now(),
      entryDate: '',
      entryTime: '',
      weight: '',
      ketoneLevel: '',
    };
    setEntries([newEntry, ...entries]);
    setSelectedEntryId(newEntry.id);
  };

  const handleSaveEntry = (id, updatedEntry) => {
    setEntries(entries.map(entry => entry.id === id ? { ...entry, ...updatedEntry } : entry));
    setSelectedEntryId(null);
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
    setSelectedEntryId(null);
  };

  const selectedEntry = entries.find(entry => entry.id === selectedEntryId);

  console.log(`TUNA ENTRIES ${JSON.stringify(entries)}`);

  return (
    <div>
      <h2>Member Overview</h2>
      <div className="row g-3">
        <div className="col-12">
          <LargeTile title="Your Fitness Entries">
            <FitnessEntryList 
              entries={entries} 
              onSelectEntry={handleSelectEntry} 
              onAddEntry={handleAddEntry} 
            />
          </LargeTile>
        </div>
        {selectedEntry && (
          <div className="col-12 mt-3">
            <LargeTile title="Edit Fitness Entry">
              <FitnessEntryDetails 
                entry={selectedEntry} 
                onSave={handleSaveEntry} 
                onDelete={handleDeleteEntry} 
              />
            </LargeTile>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberOverview;
