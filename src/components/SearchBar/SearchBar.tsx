import { useState } from 'react'
import './SearchBar.css'

function App() {

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song Title" />
      <button className="SearchButton">
        SEARCH
      </button>
    </div>
  )
}

export default App
