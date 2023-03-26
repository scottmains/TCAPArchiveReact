import React, { useState, useEffect, useContext } from 'react';
import PredatorCard from '../components/PredatorCard';
import SearchQueryContext from '../context/searchQueryContext';
import useDebounce from '../hooks/debounce'

const Predators = () => {
  const [data, setData] = useState([]);
  const {searchQuery, dropdownQuery} = useContext(SearchQueryContext);

  const fetchData = async (searchQuery, stingLocation) => {
    try {
      let url = 'https://localhost:7039/api/Predator';
      if (searchQuery || stingLocation) {
        url += '?';
        if (searchQuery) {
          console.log(searchQuery);
          url += `searchQuery=${searchQuery}&`;
        }
        if (dropdownQuery) {
          url += `stingLocation=${dropdownQuery}&`;
        }
        url = url.slice(0, -1); // remove trailing '&'
      }
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(searchQuery, dropdownQuery);
  }, [searchQuery, dropdownQuery]);
  
  return (
    <div className="container mt-4">
    <h1>Predators</h1>
    <p> Click on a predator to view their log. Filter through using the search in the corner.</p>
    <div className="row">
      <div className="col-12">
      {data.map((predator) => (
        <div  key={predator.id}>
          <PredatorCard
            id={predator.id}
            name={predator.firstName + ' ' + predator.lastName}
            location={predator.stingLocation}
            imageData={predator.imageData}
          />
        </div>
      ))}
      </div>
      </div>
    </div>
  )
}

export default Predators