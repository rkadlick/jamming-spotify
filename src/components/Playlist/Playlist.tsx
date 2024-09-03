import React, { useCallback } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
import { TrackType } from '../../types/TrackType';

// Define the props for the Playlist component
interface PlaylistProps {
  playlistName: string;
  playlistTracks: TrackType[];
  onNameChange: (name: string) => void;
  onRemove: (track: TrackType) => void;
  onSave: () => void;
}

const Playlist: React.FC<PlaylistProps> = ({ playlistTracks, onNameChange, onRemove, onSave }) => {
  
  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onNameChange(event.target.value);
    },
    [onNameChange]
  );

  return (
    <div className="playlist">
      <input onChange={handleNameChange} defaultValue={"New Playlist"} />
      <TrackList
        tracks={playlistTracks}
        isRemoval={true}
        onRemove={onRemove}
      />
      <button className="playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
