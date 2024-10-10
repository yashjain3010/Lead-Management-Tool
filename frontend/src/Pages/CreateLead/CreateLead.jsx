import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateLead.css";

const CreateLead = ({
  leadData,
  onSubmitSuccess = () => {},
  isEdit = false,
}) => {
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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const validate = () => {
    const newErrors = {};

    if (!formData.leadName) {
      newErrors.leadName = "Lead name is required";
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (formData.contactNumber.length < 10) {
      newErrors.contactNumber =
        "Invalid contact number (must be at least 10 digits)";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    if (!formData.nextFollowUpDate) {
      newErrors.nextFollowUpDate = "Next follow-up date is required";
    }

    if (!formData.nextFollowUpTime) {
      newErrors.nextFollowUpTime = "Next follow-up time is required";
    }

    if (!formData.leadSource) {
      newErrors.leadSource = "Lead source is required";
    }

    if (
      formData.conversionDate &&
      new Date(formData.conversionDate) < new Date()
    ) {
      newErrors.conversionDate = "Conversion date cannot be in the past";
    }

    if (!formData.leadNotes) {
      newErrors.leadNotes = "Lead notes are required";
    }

    if (!formData.customerType) {
      newErrors.customerType = "Customer type is required";
    }

    if (!formData.purchaseHistory) {
      newErrors.purchaseHistory = "Purchase history is required";
    }

    if (!formData.medicalNeeds) {
      newErrors.medicalNeeds = "Medical needs are required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        switch (name) {
          case "leadName":
            if (value) delete newErrors.leadName;
            break;
          case "contactNumber":
            if (value && value.length >= 10) delete newErrors.contactNumber;
            break;
          case "email":
            if (value && /\S+@\S+\.\S+/.test(value)) delete newErrors.email;
            break;
          case "address":
            if (value) delete newErrors.address;
            break;
          case "status":
            if (value) delete newErrors.status;
            break;
          case "nextFollowUpDate":
            if (value) delete newErrors.nextFollowUpDate;
            break;
          case "nextFollowUpTime":
            if (value) delete newErrors.nextFollowUpTime;
            break;
          case "leadSource":
            if (value) delete newErrors.leadSource;
            break;
          case "conversionDate":
            if (value && new Date(value) >= new Date())
              delete newErrors.conversionDate;
            break;
          case "leadNotes":
            if (value) delete newErrors.leadNotes;
            break;
          case "customerType":
            if (value) delete newErrors.customerType;
            break;
          case "purchaseHistory":
            if (value) delete newErrors.purchaseHistory;
            break;
          case "medicalNeeds":
            if (value) delete newErrors.medicalNeeds;
            break;
          default:
            break;
        }
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      let response;
      console.log("Form Data:", formData);
      console.log("Lead ID:", leadData?.data?._id);
      if (isEdit) {
        response = await axios.put(
          `http://localhost:3000/api/leads/${leadData.data._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/api/leads/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert(
        isEdit ? "Lead updated successfully!" : "Lead created successfully!"
      );
      onSubmitSuccess();

      navigate("/list-view");
    } catch (error) {
      console.error("Error saving lead data:", error);
      alert("Failed to save lead data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="createLeadForm" onSubmit={handleSubmit}>
      <h2 className="formHeading">{isEdit ? "Edit Lead" : "Create Lead"}</h2>
      <div>
        <label>
          Lead Name:
          <input
            type="text"
            name="leadName"
            value={formData.leadName}
            onChange={handleChange}
          />
          {errors.leadName && <span>{errors.leadName}</span>}
        </label>
      </div>
      <div>
        <label>
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && <span>{errors.contactNumber}</span>}
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </label>
      </div>
      <div>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span>{errors.address}</span>}
        </label>
      </div>
      <div>
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
          {errors.status && <span>{errors.status}</span>}
        </label>
      </div>
      <div>
        <label>
          Next Follow-Up Date:
          <input
            type="date"
            name="nextFollowUpDate"
            value={formData.nextFollowUpDate}
            onChange={handleChange}
          />
          {errors.nextFollowUpDate && <span>{errors.nextFollowUpDate}</span>}
        </label>
      </div>
      <div>
        <label>
          Next Follow-Up Time:
          <input
            type="time"
            name="nextFollowUpTime"
            value={formData.nextFollowUpTime}
            onChange={handleChange}
          />
          {errors.nextFollowUpTime && <span>{errors.nextFollowUpTime}</span>}
        </label>
      </div>
      <div>
        <label>
          Lead Source:
          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
          >
            <option value="Email">Email</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
          </select>
          {errors.leadSource && <span>{errors.leadSource}</span>}
        </label>
      </div>
      <div>
        <label>
          Conversion Date:
          <input
            type="date"
            name="conversionDate"
            value={formData.conversionDate}
            onChange={handleChange}
          />
          {errors.conversionDate && <span>{errors.conversionDate}</span>}
        </label>
      </div>
      <div>
        <label>
          Lead Notes:
          <textarea
            name="leadNotes"
            value={formData.leadNotes}
            onChange={handleChange}
          />
          {errors.leadNotes && <span>{errors.leadNotes}</span>}
        </label>
      </div>
      <div>
        <label>
          Customer Type:
          <input
            type="text"
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
          />
          {errors.customerType && <span>{errors.customerType}</span>}
        </label>
      </div>
      <div>
        <label>
          Purchase History:
          <input
            type="text"
            name="purchaseHistory"
            value={formData.purchaseHistory}
            onChange={handleChange}
          />
          {errors.purchaseHistory && <span>{errors.purchaseHistory}</span>}
        </label>
      </div>
      <div>
        <label>
          Medical Needs:
          <input
            type="text"
            name="medicalNeeds"
            value={formData.medicalNeeds}
            onChange={handleChange}
          />
          {errors.medicalNeeds && <span>{errors.medicalNeeds}</span>}
        </label>
      </div>
      <button type="submit" className="submit-button btn1" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Lead" : "Create Lead"}
      </button>
    </form>
  );
};

export default CreateLead;
