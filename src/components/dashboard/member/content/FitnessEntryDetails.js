import React, { useState } from 'react';

const FitnessEntryDetails = ({ entry, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    entryDate: entry.entryDate || '',
    entryTime: entry.entryTime || '',
    weight: entry.weight || '',
    ketoneLevel: entry.ketoneLevel || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const { entryDate, entryTime, weight, ketoneLevel } = formData;
    const updatedEntry = {
      entryDate,
      entryTime,
      weight: parseFloat(weight),
      ketoneLevel: parseFloat(ketoneLevel),
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
        <button type="button" onClick={handleSave} className="btn btn-success me-2">
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
