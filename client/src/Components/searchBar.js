import React, { useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./SearchBar.css"; // Import your CSS file for styling

const { Option } = Select;

const SearchBar = ({ setShowSearchBar, showSearchBar }) => {
  const [quickSearchValue, setQuickSearchValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
const [isValue,setIsValue]=useState(false)
  const handleQuickSearch = (value) => {
    // Implement quick search functionality here
    console.log("Quick search value:", value);
  };

  const handleDropdownChange = (value) => {
    // Implement dropdown search functionality here
    console.log("Dropdown value:", value);
    setDropdownValue(value);
  };

  return (
    <div className={ showSearchBar ? "search-bar show" : "search-bar"}>
      <div className="search-container">
        <Input
          className="quick-search"
          placeholder="Quick search"
          prefix={<SearchOutlined />}
          value={quickSearchValue}
          onChange={(e) => setQuickSearchValue(e.target.value)}
          onPressEnter={() => handleQuickSearch(quickSearchValue)}
        />
        <Select
          className="dropdown-search"
          placeholder="Dropdown search"
          value={dropdownValue}
          onChange={handleDropdownChange}
        >
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
          <Option value="option3">Option 3</Option>
        </Select>
      </div>
    </div>
  );
};

export default SearchBar;
