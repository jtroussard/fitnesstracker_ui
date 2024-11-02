import React, { useState } from "react";

const FitnessEntryDetails = ({ entry, onSave, onDelete }) => {
  const getCurrentDate = () => new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  const getCurrentTime = () => new Date().toTimeString().slice(0, 5); // 'HH:mm'

  const [formData, setFormData] = useState({
    entryDate: entry.entryDate || getCurrentDate(),
    entryTime: entry.entryTime || getCurrentTime(),
    weight: entry.weight || "",
    ketoneLevel: entry.ketoneLevel || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const { entryDate, entryTime, weight, ketoneLevel } = formData;

    // Ensure the time is in 'HH:mm' format by trimming to hours and minutes.
    const formattedTime =
      entryTime.length > 5 ? entryTime.substring(0, 5) : entryTime;

    const updatedEntry = {
      id: entry.id,
      entryDate,
      entryTime: formattedTime, // Now only 'HH:mm'
      weight: parseFloat(weight),
      ketoneLevel: parseFloat(ketoneLevel),
      isNew: entry.isNew || false,
    };

    onSave(entry.id, updatedEntry);
  };

  const handleDelete = () => {
    onDelete(entry.id);
  };

  return (
    <div className="fitness-entry-details">
      <h3>Edit Entry</h3>
      <form>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="entryDate"
            value={formData.entryDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Time</label>
          <input
            type="time"
            name="entryTime"
            value={formData.entryTime}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Weight (lbs)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="form-control"
            min="0.1"
            step="0.1"
            required
          />
        </div>
        <div className="mb-3">
          <label>Ketone Level</label>
          <input
            type="number"
            name="ketoneLevel"
            value={formData.ketoneLevel}
            onChange={handleChange}
            className="form-control"
            min="0.0"
            max="99.0"
            step="0.1"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-success me-2"
        >
          Save
        </button>
        <button type="button" onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </form>
    </div>
  );
};

export default FitnessEntryDetails;
