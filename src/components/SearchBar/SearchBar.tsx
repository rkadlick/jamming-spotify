import { useCallback, useState } from 'react';
import './SearchBar.css'

function SearchBar(props) {

  const [term, setTerm] = useState("");

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  }, []);

  const search = useCallback(() => {
    props.onSearch(term);
  }, [props.onSearch, term]);

  return (
    <div className="search-bar">
      <input placeholder="Enter A Song Title" onChange={handleTermChange} />
      <button className="search-button" onClick={search}>
        SEARCH
      </button>
    </div>
  )
}

export default SearchBar
