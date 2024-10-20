const API_BASE_URL = "http://localhost:8080/api/v1/entries";

// Helper function to get the JWT
const getJwtToken = () => localStorage.getItem("jwt");

// Fetch entries with JWT token
export const getEntries = async () => {
  try {
    const token = getJwtToken();
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch entries");
    }

    const result = await response.json();
    console.log("fitnessService.js :: getEntries (success)", result);
    return result;
  } catch (error) {
    console.log("fitnessService.js :: getEntries (error)", error);
    throw error;
  }
};

export const saveEntry = async (entryData) => {
  try {
    console.log("fitnessService.js :: saveEntry (called with)", entryData);
    const token = getJwtToken();

    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to add entry");
    }

    const result = await response.json();
    console.log("fitnessService.js :: saveEntry (success)", result);
    return result;
  } catch (error) {
    console.error("fitnessService.js :: saveEntry (error)", error);
    throw error;
  }
};

export const updateEntry = async (id, entryData) => {
  try {
    console.log(`fitnessService.js :: updateEntry (called with id = ${id})`, entryData);
    const token = getJwtToken();

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to update entry with ID: ${id}`);
    }

    const result = await response.json();
    console.log("fitnessService.js :: updateEntry (success)", result);
    return result;
  } catch (error) {
    console.error(`fitnessService.js :: updateEntry (error updating entry with ID: ${id})`, error);
    throw error;
  }
};

export const deleteEntry = async (entryId) => {
  try {
    console.log("fitnessService.js :: deleteEntry (called with)", entryId);
    const token = getJwtToken();
    const response = await fetch(`${API_BASE_URL}/${entryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete entry");
    }

    const result = await response.json();
    console.log("fitnessService.js :: deleteEntry (success)", result);
    return result;
  } catch (error) {
    console.error("fitnessService.js :: deleteEntry (error)", error);
    throw error;
  }
};
