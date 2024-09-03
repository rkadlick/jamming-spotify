import { useState, useCallback, useEffect } from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../api/Spotify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import specific icons from Font Awesome
import { faMusic, faPlay, faVolumeUp } from '@fortawesome/free-solid-svg-icons';




function App() {

  /* const examplePlaylist = [
    {
      id: '1',
      name: 'Song One',
      artist: 'Artist One',
      album: 'Album One',
    },
    {
      id: '2',
      name: 'Song Two',
      artist: 'Artist Two',
      album: 'Album Two',
    },
    {
      id: '3',
      name: 'Song Three',
      artist: 'Artist Three',
      album: 'Album Three',
    },
    {
      id: '4',
      name: 'Song Four',
      artist: 'Artist Four',
      album: 'Album Four',
    },
    {
      id: '5',
      name: 'Song Five',
      artist: 'Artist Five',
      album: 'Album Five',
    },
    {
      id: '6',
      name: 'Song Six',
      artist: 'Artist Six',
      album: 'Album Six',
    },
  ]; */

  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = Spotify.isAuthenticated();
    setIsAuthenticated(authStatus);
  }, [])

  const handleLogin = () => {
    Spotify.initiateLogin();
  };

  const search = useCallback((term) => {
    console.log(term)
    Spotify.search(term).then(setSearchResults);
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
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
        <FontAwesomeIcon icon={faMusic} size="2x" />
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
  )
}

export default App
