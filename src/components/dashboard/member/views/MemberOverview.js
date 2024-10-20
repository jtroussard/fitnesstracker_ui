import React, { useEffect, useState } from "react";
import LargeTile from "../../common/tile/LargeTile";
import FitnessEntryList from "../content/FitnessEntryList";
import FitnessEntryDetails from "../content/FitnessEntryDetails";
import { getEntries, saveEntry, updateEntry } from "../../../../services/fitnessEntryService";

const MemberOverview = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  useEffect(() => {
    console.log("MemberOverview :: useEffect (fetching entries)");
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await getEntries();
        setEntries(fetchedEntries);
        console.log(
          "MemberOverview :: useEffect (entries fetched successfully)",
          fetchedEntries
        );
      } catch (error) {
        console.error(
          "MemberOverview :: useEffect (error fetching entries)",
          error
        );
        throw error;
      }
    };

    fetchEntries();
  }, []);

  const handleSelectEntry = (id) => {
    setSelectedEntryId(id);
  };

  const handleOnClose = () => {
    setSelectedEntryId(null);
  }

  const handleAddEntry = () => {
    const newEntry = {
      id: null,
      entryDate: "",
      entryTime: "",
      weight: "",
      ketoneLevel: "",
    };
    setEntries([newEntry, ...entries]);
    setSelectedEntryId(newEntry.id);
  };

  const handleSaveEntry = (id, updatedEntry) => {
    const saveOrUpdateEntry = async () => {
      try {
        let response;
        
        if (id) {
          // If the entry has an ID, it's an update (PUT)
          console.log(`MemberOverview :: handleSaveEntry (updating entry with id = ${id})`);
          response = await updateEntry(id, updatedEntry);
          console.log(`MemberOverview :: handleSaveEntry (success updating entry with id = ${id})`);
        } else {
          // If there's no ID, it's a new entry (POST)
          console.log("MemberOverview :: handleSaveEntry (adding new entry)");
          response = await saveEntry(updatedEntry);
          console.log("MemberOverview :: handleSaveEntry (success adding new entry)", response);
        }
  
        // Update the entries state with the response
        setEntries((prevEntries) => {
          if (id) {
            // Update the existing entry
            return prevEntries.map((entry) =>
              entry.id === id ? { ...entry, ...response } : entry
            );
          } else {
            // Add the new entry to the list
            return [response, ...prevEntries];
          }
        });
  
      } catch (error) {
        console.error("MemberOverview :: handleSaveEntry (error saving or updating entry)", error);
      } finally {
        setSelectedEntryId(null);
      }
    };
  
    // Call the function to perform the save or update operation
    saveOrUpdateEntry();
  };
  

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    setSelectedEntryId(null);
  };

  const selectedEntry = entries.find((entry) => entry.id === selectedEntryId);

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
            <LargeTile title="Fitness Entry Inspector" onClose={handleOnClose}>
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
