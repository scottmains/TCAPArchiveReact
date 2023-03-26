
import "./ChatSearch.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import SearchQueryContext from "../context/searchQueryContext";
import { FiCalendar, FiX } from "react-icons/fi";

const ChatSearch = ({ handleDropdownChange, handleSearchChange, isOpen, predatorId }) => {
  const location = useLocation();
  const currentPage = location.pathname;
  const { searchQuery, dropdownQuery, setDropdownQuery } = useContext(SearchQueryContext);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const getPlaceholderText = () => {
    if (currentPage === "/predators") {
      return "Search predators";
    } else {
      return "Search chatlines"; // or any other default text
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (currentPage === "/predators") {
          response = await fetch(
            "https://localhost:7039/api/Predator/stinglocations"
          );
        } if (currentPage === "/chatlog/" + predatorId)  {
          response = await fetch ("https://localhost:7039/api/Chatlog/chatdates/" + predatorId);
        }
        const jsonData = await response.json();
        setDropdownData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, predatorId]);

  const renderDropdown = () => {
    return (
      <div className="search-dropdown">
        {dropdownData.map((item) => (
          <div
            onClick={() => {
              setSelectedValue(item);
              handleDropdownChange(item);
              setDropdownVisible(false);
            }}
            className={`search-dropdown-item ${
              selectedValue === item ? "selected" : ""
            }`}
            key={item.id} // add a unique key prop using the id property
          >
            {item}
          </div>
        ))}
      </div>
    );
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const renderIcon = () => {
    if (currentPage === "/predators") {
      return (
        <>
          {dropdownVisible ? (
            <FiX
              size={24}
              className="calendar-icon"
              onClick={toggleDropdown}
            />
          ) : (
            <FaMapMarkerAlt
              className="calendar-icon"
              onClick={toggleDropdown}
            />
          )}
        </>
      );
    } else {
      return (
        <>
          {dropdownVisible ? (
            <FiX
              size={24}
              className="calendar-icon"
              onClick={toggleDropdown}
            />
          ) : (
            <FiCalendar className="calendar-icon" onClick={toggleDropdown} />
          )}
        </>
      );
    }
  };
  return (
    <div
    className={`search-container${dropdownQuery ? ' dropdown-visible' : ''}`}
      style={{
        transform: `scaleY(${isOpen ? 1 : 0})`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      <div className="search-wrapper">
        <input
          type="text"
          placeholder={getPlaceholderText()}
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FaSearch className="search-icon" />
        {renderIcon()}
      </div>
   
      {dropdownVisible && (
        <>
          {renderDropdown()}
        </>
      )}
      {dropdownQuery && (
         <div className="selected-item">
         <span>{dropdownQuery}</span>
         <button className="clear-button" onClick={() => setDropdownQuery('')}>
         <FiX size={12} />
         </button>
       </div>
        )}
    </div>
  );
};

export default ChatSearch;
