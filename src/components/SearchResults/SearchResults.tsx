import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";
import { TrackType } from '../../types/TrackType';

interface SearchResultsProps {
  searchResults: TrackType[];
  onAdd: (track: TrackType) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, onAdd }) => {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {searchResults.length > 0 ? (
        <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} onRemove={() => {}} />
      ) : (
        <p className="italics">Search above for songs</p>
      )}
    </div>
  );
};

export default SearchResults;
