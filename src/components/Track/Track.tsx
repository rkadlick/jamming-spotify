import React, { useCallback } from "react";

import "./Track.css";
import { TrackType } from '../../types/TrackType';

interface TrackProps {
  track: TrackType;
  onAdd?: (track: TrackType) => void;
  onRemove?: (track: TrackType) => void;
  isRemoval: boolean;
}

const Track: React.FC<TrackProps> = ({ track, onAdd, onRemove, isRemoval }) => {
  
  const addTrack = useCallback(() => {
    if (onAdd) { // Check if onAdd is defined
      onAdd(track);
    }
  }, [onAdd, track]);

  const removeTrack = useCallback(() => {
    if (onRemove) { // Check if onAdd is defined
      onRemove(track);
    }
  }, [onRemove, track]);

  const renderAction = () => {
    return (
      <button className="track-action" onClick={isRemoval ? removeTrack : addTrack}>
        {isRemoval ? '-' : '+'}
      </button>
    );
  };

  return (
    <div className="track">
      <div className="track-information">
      <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
