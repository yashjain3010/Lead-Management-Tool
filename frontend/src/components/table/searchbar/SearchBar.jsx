import React from "react";

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name, email, or contact number"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
