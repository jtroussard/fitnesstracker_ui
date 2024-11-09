import React, { useState } from "react";

const FitnessEntryDetails = ({ entry, onSave, onUpdate, onDelete, onClose }) => {
  const getCurrentDate = () => new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  const getCurrentTime = () => new Date().toTimeString().slice(0, 8); // 'HH:mm'

  const [formData, setFormData] = useState({
    entryDate: entry.entryDate || getCurrentDate(),
    entryTime: entry.entryTime || getCurrentTime(),
    weight: entry.weight || "",
    ketoneLevel: entry.ketoneLevel || "",
  });

  const handleCancel = (id) => {
    onClose(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const { entryDate, entryTime, weight, ketoneLevel } = formData;

    // // Ensure the time is in 'HH:mm' format by trimming to hours and minutes.
    // const formattedTime =
    //   entryTime.length > 5 ? entryTime.substring(0, 5) : entryTime;

    const updatedEntry = {
      id: entry.id,
      entryDate: entryDate,
      entryTime: entryTime,
      weight: parseFloat(weight),
      ketoneLevel: parseFloat(ketoneLevel),
      isNew: entry.isNew || false,
    };

    console.log(`Sending entry to view for saving: ${JSON.stringify(updatedEntry)}`)

    if (entry.isNew) {
      onSave(updatedEntry);
    } else {
      onUpdate(entry.id, updatedEntry);
    }
  };

  const handleDelete = (id) => {
    console.log(`handle delete fitness entry details ${JSON.stringify(id)} `)
    onDelete(id);
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
        <div className="d-flex justify-content-between">
          <div>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-success me-2"
            >
              Save
            </button>
            { !entry.isNew && (
              <button
              type="button"
              onClick={() => handleDelete(entry.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            ) }
          </div>
          <button
            type="button"
            onClick={() => handleCancel(entry.id)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FitnessEntryDetails;
