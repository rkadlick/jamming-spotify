import React from "react";

import "./SearchResults.css";

import TrackList from "../TrackList/TrackList";

const SearchResults = (props) => {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {props.searchResults.length > 0 ? <TrackList 
      tracks={props.searchResults}
      onAdd={props.onAdd}
      /> : <p className='italics'>Search above for songs</p>}
    </div>
  );
};

export default SearchResults;
