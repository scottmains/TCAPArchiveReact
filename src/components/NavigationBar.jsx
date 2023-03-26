import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { MdOutlineDarkMode } from 'react-icons/md';
import './NavigationBar.css';
import React, { useState, useContext } from 'react';
import DropdownMenu from './DropdownMenu';
import ChatSearch from './ChatSearch';
import SearchQueryContext from '../context/searchQueryContext';
import { useLocation } from 'react-router-dom';


const NavigationBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false);
  const { setSearchQuery, setDropdownQuery} = useContext(SearchQueryContext);
  const { pathname } = useLocation();
  const predatorId = pathname.split('/')[2];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleChatSearch = () => {
    setIsChatSearchOpen(!isChatSearchOpen);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDropdownChange = (selectedValue) => {
    setDropdownQuery(selectedValue);
  };

  const isIndexPage = pathname === '/';

  return (
    <header className="main-header">
      <div className="nav-wrapper">
        <nav className="nav">
          <div>
            <button className="hamburger-menu" onClick={toggleDropdown}>
              {isDropdownOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <DropdownMenu isOpen={isDropdownOpen} onLinkClick={toggleDropdown}  />
          </div>
          <div className="logo">
            {/* Replace the src with your logo */}
            <img src="https://via.placeholder.com/100x40" alt="Logo" />
          </div>
        {!isIndexPage && (
            <button className="search" onClick={toggleChatSearch}>
              {isChatSearchOpen ? <FiX size={24} /> : <FiSearch size={24} />}
            </button>
          )}
          {!isIndexPage && (
            <ChatSearch
              handleDropdownChange={handleDropdownChange}
              handleSearchChange={handleSearchChange}
              isOpen={isChatSearchOpen}
              predatorId={predatorId}
            />
          )}
           {isIndexPage && (
           <button className="search" >
            <MdOutlineDarkMode size={24} /> 
            </button>
          )}

        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
