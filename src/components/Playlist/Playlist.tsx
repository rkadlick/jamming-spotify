import React, { useCallback } from "react";

import "./Playlist.css";

import TrackList from "../TrackList/TrackList";

const Playlist = (props) => {
  {/* const handleNameChange = useCallback(
    (event) => {
      props.onNameChange(event.target.value);
    },
    [props.onNameChange]
  ); */}


  return (
    <div className="playlist">
      <input defaultValue={"New Playlist"} />
      <TrackList
      tracks={props.playlistTracks}
		  isRemoval={true}
      />
      <button className="playlist-save">
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;