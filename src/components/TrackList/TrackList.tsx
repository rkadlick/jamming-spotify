import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";
import { TrackType } from '../../types/TrackType';

interface TrackListProps {
  tracks: TrackType[];
  onAdd?: (track: TrackType) => void;
  isRemoval: boolean;
  onRemove?: (track: TrackType) => void;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onAdd, isRemoval, onRemove }) => {
  return (
    <div className="track-list">
      {tracks.map((track) => (
        <Track
          track={track}
          key={track.id}
          onAdd={onAdd}
          isRemoval={isRemoval}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default TrackList;
