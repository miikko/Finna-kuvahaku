import React, { useState } from 'react'
import axios from 'axios'
const baseUrl = "https://api.finna.fi"

const App = (props) => {
  const [text, setText] = useState('')
  const [images, setImages] = useState([])
  const [resultsFound, setResultsFound] = useState(true)

  const fetchPics = async (event) => {
    event.preventDefault()
    const res = await axios.get(`${baseUrl}/v1/search?lookfor=${text}&filter[]=online_boolean:"1"&filter[]=format:"0/Image/"&field[]=title&field[]=images`)
    if (res.data.resultCount === 0) {
      setResultsFound(false)
    } else {
      setImages(res.data.records.map(record => ({
        title: record.title,
        src: `${baseUrl}${record.images[0]}`
      })))
    }
  }

  const handleChange = (event) => {
    setText(event.target.value)
    setResultsFound(true)
  }

  return (
    <div>
      <h1>Finnan kuvahaku</h1>
      <form onSubmit={fetchPics}>
        <input type='text' value={text} onChange={handleChange} />
        <button type='submit'>Hae kuvia</button>
      </form>
      {resultsFound
        ? <div>
            {images.map(img => 
              <div key={img.src}>
                <h2>{img.title}</h2>
                <img src={img.src} alt="result" width="300" height="300" />
              </div>
            )}
          </div>
        : <h3 style={{ color: "red" }}>Ei osumia haulle...</h3>
      }
    </div>
  )
}

export default App
