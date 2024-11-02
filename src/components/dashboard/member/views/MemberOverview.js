import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // Importing uuid for unique temporary IDs
import LargeTile from "../../common/tile/LargeTile";
import FitnessEntryList from "../content/FitnessEntryList";
import FitnessEntryDetails from "../content/FitnessEntryDetails";
import { getEntries, saveEntry, updateEntry } from "../../../../services/fitnessEntryService";
import { toast } from "react-toastify";

const MemberOverview = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  useEffect(() => {
    console.log("MemberOverview :: useEffect (fetching entries)");
    const fetchEntries = async () => {
      try {
        const response = await getEntries();
        const fetchedEntries = response.data
        setEntries(fetchedEntries);
        console.log("MemberOverview :: useEffect (entries fetched successfully)", fetchedEntries);
      } catch (error) {
        console.error("MemberOverview :: useEffect (error fetching entries)", error);
        throw error;
      }
    };
    fetchEntries();
  }, []);

  const handleSelectEntry = (id) => {
    console.log(`MemberOverview :: handleSelectEntry (selected entry id = ${id})`);
    setSelectedEntryId(id);
  };

  const handleOnClose = () => {
    console.log("MemberOverview :: handleOnClose (closing entry inspector)");
    setSelectedEntryId(null);
  };

  const handleAddEntry = () => {
    const newEntry = {
      id: uuidv4(), // Use a temporary UUID for the new entry
      entryDate: "",
      entryTime: "",
      weight: "",
      ketoneLevel: "",
      isNew: true, // Mark this entry as new
    };
    console.log("MemberOverview :: handleAddEntry (adding new entry with temp ID)", newEntry);
    setEntries([newEntry, ...entries]);
    setSelectedEntryId(newEntry.id); // Set this temporary ID as the selected entry
  };

  const handleSaveEntry = (id, updatedEntry) => {
    console.log(`MemberOverview :: handleSaveEntry (called with id=${id}, updatedEntry=${JSON.stringify(updatedEntry)})`);
    const saveOrUpdateEntry = async () => {
      try {
        let response;

        if (id && !updatedEntry.isNew) {
          // Update existing entry (PUT)
          console.log(`MemberOverview :: handleSaveEntry (updating entry with id = ${id})`);
          response = await updateEntry(id, updatedEntry);
          console.log(`MemberOverview :: handleSaveEntry (success updating entry with id = ${id})`, response);
        } else {
          // Save new entry (POST)
          console.log("MemberOverview :: handleSaveEntry (adding new entry)");
          response = await saveEntry({...updatedEntry, id: null});
          console.log("MemberOverview :: handleSaveEntry (success adding new entry)", response);
        }

        // Update the entries state with the response
        setEntries((prevEntries) => {
          // Extract the entry entity from the response
          const entryDatabaseId = response.data
          if (updatedEntry.isNew) {
            // Update the entry details with the response from the backend.
            const newList = prevEntries.map((entry) =>
              // This should replace the entry with the backend response including a new shiny id (backend specific)
              // Getting rid of the temp UUID
              entry.id === id ? { ...updatedEntry, isNew: false, id: entryDatabaseId } : entry
            );
            return newList;
          } else {
            // Update the existing entry
            const newList = prevEntries.map((entry) =>
              entry.id === id ? { ...updatedEntry } : entry
            );
            return newList;
          }
        });
        console.log("MemberOverview :: handleSaveEntry (updated entries)", entries);
      } catch (error) {
        console.error("MemberOverview :: handleSaveEntry (error saving or updating entry)", error);
        toast.error("Failed to save entry. Please try again.");
      } finally {
        setSelectedEntryId(null);
      }
    };
    saveOrUpdateEntry();
  };

  const handleDeleteEntry = (id) => {
    console.log(`MemberOverview :: handleDeleteEntry (deleting entry with id = ${id})`);
    setEntries(entries.filter((entry) => entry.id !== id));
    setSelectedEntryId(null);
  };

  const selectedEntry = entries.find((entry) => entry.id === selectedEntryId);

  console.log("MemberOverview :: current entries", entries);
  console.log("MemberOverview :: selected entry", selectedEntry);

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
