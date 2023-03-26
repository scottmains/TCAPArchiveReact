// Layout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../App.css';
import SearchQueryContext from '../context/searchQueryContext';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownQuery, setDropdownQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    setSearchQuery('');
  }, [location, setSearchQuery]);

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery, dropdownQuery, setDropdownQuery }}>
      <NavigationBar />
      <main className="main-container">
        <Outlet />
      </main>
    </SearchQueryContext.Provider>
  );
};

export default Layout;
