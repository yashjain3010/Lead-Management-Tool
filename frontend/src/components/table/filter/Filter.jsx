import React from "react";

const Filter = ({ filters, handleFilterChange, isAdmin, handleSort }) => {
  return (
    <div className="filters">
      <label>
        Status:
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
        </select>
      </label>

      {isAdmin && (
        <label>
          Assigned To:
          <input name="assignedTo" type="text" onChange={handleFilterChange} />
        </label>
      )}

      <label>
        Lead Source:
        <select name="leadSource" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Email">Email</option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Social Media">Social Media</option>
        </select>
      </label>

      <label>
        Sort By:
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="">Select</option>
          <option value="nextFollowUpDate">Next Follow-Up Date</option>
          <option value="status">Lead Status</option>
          <option value="leadSource">Lead Source</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
