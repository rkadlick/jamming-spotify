import { useState } from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

function App() {

  const examplePlaylist = [
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
  ];

  const [searchResults, setSearchResults] = useState(examplePlaylist);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState(examplePlaylist);
  

  return (
      <div className='app'>
        <h1>Jamming</h1>
        <SearchBar />
        <div className='app-playlist'>
          <SearchResults searchResults={searchResults} />
          <Playlist 
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          />
        </div>
      </div>
  )
}

export default App
