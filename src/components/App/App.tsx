import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../api/Spotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TrackType } from '../../types/TrackType';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<TrackType[]>([]);
  const [playlistName, setPlaylistName] = useState<string>("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState<TrackType[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = Spotify.isAuthenticated();
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = () => {
    Spotify.initiateLogin();
  };

  const search = useCallback((term: string) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const addTrack = useCallback((track: TrackType) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
      return;

    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks]);

  const removeTrack = useCallback((track: TrackType) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name: string) => {
    setPlaylistName(name);
  }, []);
  
  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div className='app'>
      <div className='heading'>
        <h1>Jamming</h1>
        <FontAwesomeIcon icon={faMusic as IconProp} size="2x" />
      </div>
      
      {!isAuthenticated ? (
        <button className='sign-in-button' onClick={handleLogin}>Sign in to Spotify</button>
      ) : (
        <>
          <SearchBar 
            onSearch={search}
          />
          <div className='app-playlist'>
            <SearchResults 
              searchResults={searchResults} 
              onAdd={addTrack}
            />
            <Playlist 
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </>
      )}
      <div className='made-by'>Created by RK</div>
    </div>
  );
};

export default App;
