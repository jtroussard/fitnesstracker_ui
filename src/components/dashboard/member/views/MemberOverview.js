import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import LargeTile from "../../common/tile/LargeTile";
import FitnessEntryList from "../content/FitnessEntryList";
import FitnessEntryDetails from "../content/FitnessEntryDetails";
import {
  getEntries,
  saveEntry,
  updateEntry,
  deleteEntry,
} from "../../../../services/fitnessEntryService";
import { toast } from "react-toastify";

const MemberOverview = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  // const selectedEntry = entries.find(
  //   (entry) => entry.entryId === selectedEntryId
  // );

  const selectedEntry = useMemo(() => {
    return entries.find((entry) => entry.entryId === selectedEntryId);
  }, [entries, selectedEntryId]);

  console.log("MemberOverview :: current entries", entries);
  console.log("MemberOverview :: selected entry", selectedEntry);

  useEffect(() => {
    console.log("MemberOverview :: fetched entries:", entries);
  }, [entries]);

  // TODO Looks like this hook is run when the selected entry is updated. 
  // Make sure this hook only runs when the component is first rendered and
  // when the entries state is updated.
  useEffect(() => {
    console.log("MemberOverview :: useEffect (fetching entries)");
    const fetchEntries = async () => {
      try {
        const response = await getEntries();
        const fetchedEntries = response.data;
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
    console.log(
      `MemberOverview :: handleSelectEntry (selected entry id = ${id})`
    );
    setSelectedEntryId(id);
  };

  const handleOnClose = () => {
    console.log("Entries before handleOnClose:", entries);
    if (selectedEntry && selectedEntry.isNew) {
      setEntries((prevEntries) => 
        prevEntries ? prevEntries.filter((entry) => entry.entryId !== selectedEntryId) : []
      );
    }
    setSelectedEntryId(null);
  };  

  const handleAddEntry = () => {
    const newEntry = {
      entryId: uuidv4(), // Use a temporary UUID for the new entry
      entryDate: "",
      entryTime: "",
      weight: "",
      ketoneLevel: "",
      isNew: true,
    };
    console.log(
      "MemberOverview :: handleAddEntry (adding new entry with temp ID)",
      newEntry
    );
    setEntries([newEntry, ...entries]);
    setSelectedEntryId(newEntry.entryId); // Set this temporary ID as the selected entry
  };

  const handleSaveEntry = (id, updatedEntry) => {
    console.log(
      `MemberOverview :: handleSaveEntry (called with id=${id}, updatedEntry=${JSON.stringify(
        updatedEntry
      )})`
    );
    const saveOrUpdateEntry = async () => {
      try {
        let response;

        if (id && !updatedEntry.isNew) {
          // Update existing entry (PUT)
          console.log(
            `MemberOverview :: handleSaveEntry (updating entry with id = ${id})`
          );
          response = await updateEntry(id, updatedEntry);
          console.log(
            `MemberOverview :: handleSaveEntry (success updating entry with id = ${id})`,
            response
          );
        } else {
          // Save new entry (POST)
          console.log("MemberOverview :: handleSaveEntry (adding new entry)");
          response = await saveEntry({ ...updatedEntry, id: null });
          console.log(
            "MemberOverview :: handleSaveEntry (success adding new entry)",
            response
          );
        }

        // Update the entries state with the response
        setEntries((prevEntries) => {
          // Extract the entry entity from the response
          const entryDatabaseId = response.data;
          if (updatedEntry.isNew) {
            // Update the entry details with the response from the backend.
            const newList = prevEntries.map((entry) =>
              // This should replace the entry with the backend response including a new shiny id (backend specific)
              // Getting rid of the temp UUID
              entry.id === id
                ? { ...updatedEntry, isNew: false, id: entryDatabaseId }
                : entry
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
        console.log(
          "MemberOverview :: handleSaveEntry (updated entries)",
          entries
        );
        toast.success("Entry successfully saved.")
      } catch (error) {
        console.error(
          "MemberOverview :: handleSaveEntry (error saving or updating entry)",
          error
        );
        toast.error("Entry save failed. Please try again.");
      } finally {
        setSelectedEntryId(null);
      }
    };
    saveOrUpdateEntry();
  };

  const handleDeleteEntry = async (id) => {
    console.log(
      `MemberOverview :: handleDeleteEntry (deleting entry with id = ${id})`
    );
    try {
      await deleteEntry(selectedEntryId);
      setEntries(entries.filter((entry) => entry.entryId !== id));
      setSelectedEntryId(null);
      toast.success("Entry successfully deleted.");
    } catch (error) {
      console.error(`MemberOverview :: handleDeleteEntry called with ${id} - ${selectedEntryId}`)
      toast.error("Entry delete failed. Please try again.");
    }
  };

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
            <LargeTile
              title="Fitness Entry Inspector"
              onClose={() => handleOnClose(selectedEntryId)}
            >
              <FitnessEntryDetails
                key={selectedEntryId}
                entry={selectedEntry}
                onSave={handleSaveEntry}
                onDelete={() => handleDeleteEntry(selectedEntry.entryId)}
                onClose={() => handleOnClose(selectedEntry.entryId)}
              />
            </LargeTile>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberOverview;
