import "./ViewPage.css";
import StatusBar from "../../components/statusBar/StatusBar";
import Grid from "../../components/grid/Grid";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewPage() {
  const [formData, setFormData] = useState({
    leadName: "",
    contactNumber: "",
    email: "",
    address: "",
    status: "new",
    assignedTo: "",
    nextFollowUpDate: "",
    nextFollowUpTime: "",
    leadSource: "Email",
    conversionDate: "",
    leadNotes: "",
    customerType: "",
    purchaseHistory: "",
    medicalNeeds: "",
  });

  const { leadId } = useParams();
  const [leadData, setLeadData] = useState(null);
  const [fetchError, setFetchError] = useState("");

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

  useEffect(() => {
    if (leadData) {
      setFormData({
        leadName: leadData.data.leadName || "",
        contactNumber: leadData.data.contactNumber || "",
        email: leadData.data.email || "",
        address: leadData.data.address || "",
        status: leadData.data.status || "new",
        assignedTo: leadData.data.assignedTo || "",
        nextFollowUpDate: leadData.data.nextFollowUpDate || "",
        nextFollowUpTime: leadData.data.nextFollowUpTime || "",
        leadSource: leadData.data.leadSource || "Email",
        conversionDate: leadData.data.conversionDate || "",
        leadNotes: leadData.data.leadNotes || "",
        customerType: leadData.data.customerType || "",
        purchaseHistory: leadData.data.purchaseHistory || "",
        medicalNeeds: leadData.data.medicalNeeds || "",
      });
    }
  }, [leadData]);

  return (
    <div className="pageContainer">
      <div className="two">
        <h1>{formData.leadName}</h1>
      </div>
      <StatusBar leadData={formData} />
      <div>
        <Grid leadData={formData} />
      </div>
    </div>
  );
}
