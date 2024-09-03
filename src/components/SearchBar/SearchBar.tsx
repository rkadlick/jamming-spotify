import React, { useCallback, useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [term, setTerm] = useState<string>("");

  const handleTermChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  }, []);

  const search = useCallback(() => {
    props.onSearch(term);
  }, [props, term]);

  return (
    <div className="search-bar">
      <input placeholder="Enter A Song Title" onChange={handleTermChange} />
      <button className="search-button" onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
