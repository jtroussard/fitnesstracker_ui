import React, { useEffect, useState } from "react";
import LargeTile from "../../../../common/tiles/LargeTile";
import { getEntries } from "../../../../../services/BioEntryService";

const MemberOverview = () => {
  const [entries, setEntries] = useState([]);

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