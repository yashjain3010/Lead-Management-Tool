import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeadList.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/table/filter/Filter";
import SearchBar from "../../components/table/searchbar/SearchBar";
import LeadsTable from "../../components/table/leadtable/LeadTable";
import Pagination from "../../components/table/pagination/Pagination";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ status: "", leadSource: "" });
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:3000/api/leads/my-leads",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page,
            filters: JSON.stringify(filters),
            search,
            sortField,
            sortOrder,
          },
        }
      );
      setLeads(data.leads || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [page, filters, sortField, sortOrder, search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceTimeout) clearTimeout(debounceTimeout);
    setDebounceTimeout(setTimeout(() => fetchLeads(), 500));
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/leads/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchLeads();
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

  const navigate = useNavigate();
  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleView = (id) => navigate(`/view/${id}`);

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="lead-list-container">
      <h2>Leads List</h2>
      <Filter
        filters={filters}
        handleFilterChange={handleFilterChange}
        isAdmin={isAdmin}
        handleSort={handleSort}
      />
      <SearchBar handleSearch={handleSearch} />
      <LeadsTable
        leads={leads}
        handleEdit={handleEdit}
        handleView={handleView}
        handleDelete={handleDelete}
        handleSort={handleSort}
        loading={loading}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default LeadList;
