import React, { useState } from 'react'
import { BsSearch, BsArrowRight } from 'react-icons/bs'

import Style from './SearchBar.module.css'

const SearchBar = ({ onSearch, searchValue = '', placeholder = "Search NFTs by name..." }) => {
  const [localSearch, setLocalSearch] = useState(searchValue);

  // Update local state when searchValue prop changes
  React.useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    // Call onSearch immediately for real-time filtering
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(localSearch);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input 
          type='text' 
          placeholder={placeholder}
          value={localSearch}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <BsArrowRight 
          className={Style.SearchBar_box_icon} 
          onClick={handleSearch}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  )
}

export default SearchBar