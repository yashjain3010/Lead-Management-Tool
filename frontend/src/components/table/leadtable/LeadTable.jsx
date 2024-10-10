import React from "react";

const LeadsTable = ({
  leads,
  handleEdit,
  handleView,
  handleDelete,
  handleSort,
  loading,
}) => {
  return (
    <table className="leads-table">
      <thead>
        <tr>
          <th onClick={() => handleSort("leadName")} className="sortable">
            Lead Name
          </th>
          <th onClick={() => handleSort("email")} className="sortable">
            Email
          </th>
          <th onClick={() => handleSort("contactNumber")} className="sortable">
            Contact Number
          </th>
          <th onClick={() => handleSort("leadStatus")} className="sortable">
            Status
          </th>
          <th onClick={() => handleSort("leadSource")} className="sortable">
            Lead Source
          </th>
          <th
            onClick={() => handleSort("nextFollowUpDate")}
            className="sortable"
          >
            Next Follow-Up Date
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="7" className="loading">
              Loading...
            </td>
          </tr>
        ) : leads.length > 0 ? (
          leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.leadName}</td>
              <td>{lead.email}</td>
              <td>{lead.contactNumber}</td>
              <td>{lead.status}</td>
              <td>{lead.leadSource}</td>
              <td>{new Date(lead.nextFollowUpDate).toLocaleDateString()}</td>
              <td>
                <div className="dropdown">
                  <button className="dropdown-toggle">Actions</button>
                  <div className="dropdown-menu">
                    <button
                      onClick={() => handleEdit(lead._id)}
                      className="dropdown-item"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleView(lead._id)}
                      className="dropdown-item"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="dropdown-item delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="no-data">
              No leads found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default LeadsTable;
