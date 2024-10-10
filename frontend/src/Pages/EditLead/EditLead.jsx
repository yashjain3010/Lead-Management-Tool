import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CreateLead from "../CreateLead/CreateLead";

const EditLead = () => {
  const { leadId } = useParams();
  const [leadData, setLeadData] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  const fetchLeadData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/leads/${leadId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeadData(response.data);
    } catch (error) {
      console.error("Error fetching lead data:", error.response.data);
      setFetchError("Error fetching lead data.");
    }
  };

  useEffect(() => {
    if (leadId) {
      fetchLeadData();
    }
  }, [leadId]);

  const handleUpdateSuccess = () => {
    navigate("/list-view");
  };

  return (
    <div className="editLeadContainer">
      {leadData ? (
        <CreateLead
          leadData={leadData}
          onSubmitSuccess={handleUpdateSuccess}
          isEdit
        />
      ) : (
        <p>{fetchError || "Loading..."}</p>
      )}
    </div>
  );
};

export default EditLead;
