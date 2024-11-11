import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import LargeTile from "../../common/tile/LargeTile";
import {
  getEntries,
  saveEntry,
  updateEntry,
  deleteEntry,
} from "../../../../services/BioEntryService";
import { toast } from "react-toastify";

const MemberOverview = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  const selectedEntry = useMemo(() => {
    if (selectedEntryId) {
      console.log(
        "**useMemo:** Finding selected entry with ID:",
        selectedEntryId
      );
      return (
        entries.find((entry) => entry.id === selectedEntryId) || {
          id: selectedEntryId,
          entryDate: "",
          entryTime: "",
          weight: "",
          ketoneLevel: "",
          isNew: true,
        }
      );
    }
    return null;
  }, [entries, selectedEntryId]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await getEntries();
        setEntries(response.data);
        console.log("**useEffect:** Entries fetched and set to state:", entries);
      } catch (error) {
        console.error("Error fetching entries", error);
      }
    };
    fetchEntries();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectEntry = (stateId) => {
    setSelectedEntryId(stateId);
    console.log("**handleSelectEntry:** Selected entry ID:", stateId);
  };

  const handleOnClose = () => {
    if (selectedEntry?.isNew) {
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== selectedEntryId)
      );
    }
    setSelectedEntryId(null);
    console.log("**handleOnClose:** Selected entry closed, isNew:", selectedEntry?.isNew);
  };

  const handleAddEntry = () => {
    const tempStateId = uuidv4(); // Temporary ID for new entry
    setSelectedEntryId(tempStateId);
    console.log("**handleAddEntry:** Adding new entry, temporary ID:", tempStateId);
  };

  const handleCreateEntry = async (newEntryData) => {
    try {
      const response = await saveEntry({ ...newEntryData, id: null });
      const entryDatabaseId = response.data;
  
      setEntries((prevEntries) => [
        { ...newEntryData, id: entryDatabaseId, isNew: false },
        ...prevEntries,
      ]);
  
      toast.success("New entry created successfully.");
    } catch (error) {
      console.error("Error creating new entry", error);
      toast.error("Failed to create entry.");
    } finally {
      setSelectedEntryId(null);
    }
  };
  
  const handleUpdateEntry = async (existingEntryId, updatedEntryData) => {
    try {
      await updateEntry(existingEntryId, updatedEntryData);
  
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === existingEntryId ? { ...updatedEntryData } : entry
        )
      );
  
      toast.success("Entry updated successfully.");
    } catch (error) {
      console.error("Error updating entry", error);
      toast.error("Failed to update entry.");
    } finally {
      setSelectedEntryId(null);
    }
  };
  

  const handleDeleteEntry = async (stateId) => {
    try {
      await deleteEntry(stateId);
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== stateId)
      );
      setSelectedEntryId(null);
      toast.success("Entry successfully deleted.");
    } catch (error) {
      toast.error("Entry delete failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Member Overview</h2>
      <div className="row g-3">
        <div className="col-12">
          <LargeTile title="Main dashboard">
            <ul>
            <li>Small tiles summerizing each domains status</li>
            <li>Small tiles summerizing member related stats (visits, totla entries, etc)</li>
            <li>Ai suggestion tile</li>
            <li>Main chart plotting weight, or goals</li>
            </ul>
          </LargeTile>
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;