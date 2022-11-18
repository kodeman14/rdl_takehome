import { useEffect, useState } from 'react'
import axios from 'axios'

import { config } from './assets/config'
import logo from './logo.svg'
import './assets/App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [booksView, setBooksView] = useState(true)

  const [booksTable, setBooksTable] = useState([])

  const [query, setQuery] = useState('')
  const [endpoint, setEndpoint] = useState(config.apiEndpoint)

  const [prevPage, setPrevPage] = useState('')

  const fetchData = async () => {
    setIsLoading(true)
    const data = await axios.get(endpoint + query)
      .then(res => res.data)
      .catch(err => console.error('throw', err))

  const viewBooks = () => setBooksView(true)
  const viewShortlist = () => setBooksView(false)

  useEffect(() => {
    fetchData()
    console.log('in effect', endpoint)
  }, [endpoint, query])

  return (
    <div className='App'>
      {<div className='tab-div'>
        <button onClick={viewBooks}>ALL BOOKS</button>
        <button onClick={viewShortlist}>MY LIST</button>
      </div>}

      <section>
        <input
          type='text'
          value={searchTerm}
          onChange={handleInput}
          placeholder='title or author'
        />
        <button disabled={!searchTerm} onClick={performSearch}>Search</button>
        <button onClick={resetData}>Reset</button>
      </section>
      {!booksView && shortlist && (
        <Shortlist shortlist={shortlist} />
      )}
    </div>
  )
}

export default App
