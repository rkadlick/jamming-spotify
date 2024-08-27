import React from "react";

import "./SearchResults.css";

import TrackList from "../TrackList/TrackList";

const SearchResults = (props) => {
  return (
    <div className="search-results">
      <h2>Results</h2>
      <TrackList 
      tracks={props.searchResults}/>
    </div>
  );
};

export default SearchResults;
