// searchQueryContext.js
import { createContext } from 'react';

const SearchQueryContext = createContext({
  searchQuery: '',
  setSearchQuery: () => {},
  dropdownQuery: '',
  setDropdownQuery: () => {},
});

export default SearchQueryContext;
