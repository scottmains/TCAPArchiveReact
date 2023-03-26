// Chat.jsx
import React, { useState, useEffect, useContext } from 'react';
import SearchQueryContext from '../context/searchQueryContext';
import Chatlog from '../components/Chatlog';
import { useParams } from 'react-router-dom';
import useDebounce from '../hooks/debounce'
const Chat = () => {

  const [chatSession, setChatSession] = useState();
  const { id } = useParams();
  const { searchQuery, setSearchQuery, dropdownQuery, setDropdownQuery } = useContext(SearchQueryContext);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);


  const clearSearchQuery = () => {
    setSearchQuery('');
  };


  const fetchData = async () => {
    try {
      const chatSessionData = await fetch('https://localhost:7039/api/chatlog/predatorid/' + id);
      const chatSessionJson = await chatSessionData.json();
      console.log(chatSessionJson)
      setChatSession(chatSessionJson);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!chatSession) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5"> 
      <Chatlog chatSessionId={chatSession.id} searchQuery = {debouncedSearchQuery} predatorId = {chatSession.predatorId}
      clearSearchQuery={clearSearchQuery} dropdownQuery = {dropdownQuery}/>
    </div>
  );
};

export default Chat;
