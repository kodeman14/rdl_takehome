import { useEffect, useState } from 'react'
import axios from 'axios'

import { config } from './assets/config'
import logo from './logo.svg'
import './assets/App.css'

import Books from './components/Books'
import Shortlist from './components/Shortlist'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [booksView, setBooksView] = useState(true)

  const [shortlist, setShortlist] = useState([])
  const [booksTable, setBooksTable] = useState([])

  const [query, setQuery] = useState('')
  const [pageNum, setPageNum] = useState(1)
  const [booksCount, setBooksCount] = useState(0)
  const [endpoint, setEndpoint] = useState(config.apiEndpoint)

  const [prevPage, setPrevPage] = useState('')
  const [nextPage, setNextPage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = async () => {
    setIsLoading(true)
    const data = await axios.get(endpoint + query)
      .then(res => res.data)
      .catch(err => console.error('throw', err))

    if (data !== null) {
      console.log('data avail', data)
      setBooksTable(data.results)
      setBooksCount(data.count)
      setNextPage(data.next)
      setPrevPage(data.previous)
      setIsLoading(false)
    } else console.error('not able to load', data)
  }

  const goNext = () => {
    setEndpoint(nextPage)
    setPageNum(nextPage.match(/=\s*(.*)$/)[1][0])
    console.log('nextpage', nextPage)
  }

  const goPrev = () => {
    prevPage !== null && setEndpoint(prevPage)
    if (prevPage.includes('page=')) {
      setPageNum(prevPage.match(/=\s*(.*)$/)[1][0])
    } else setPageNum(1)
  }

  const viewBooks = () => setBooksView(true)
  const viewShortlist = () => setBooksView(false)
  const handleInput = (event) => setSearchTerm(event.target.value)

  const performSearch = () => {
    setQuery(searchTerm)
    setEndpoint(config.searchEndpoint)
  }
  const performSort = (event) => {
    console.log('event', event.target.value)
    setQuery(event.target.value)
    setEndpoint(config.sortEndpoint)
  }
  const resetData = () => {
    setQuery('')
    setSearchTerm('')
    setBooksTable([])
    setEndpoint(config.apiEndpoint)
  }

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

      {isLoading ? (
        <img src={logo} className='App-logo' alt='logo' />
      ) : booksView && booksTable && booksCount > 0 ? (
        <div>
          <h1>Total Count : {booksCount}</h1>
          <div>
            <label>SORT BY :</label>
            <select value={query} onChange={performSort}>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              <option value="popular">Popular</option>
            </select>
          </div>
          <Books
            key={endpoint}
            books={booksTable}
            count={booksCount}
            createFaves={setShortlist}
          />
          <div className='table-footer'>
            <button onClick={goPrev}>Previous</button>
            {booksCount > 32 && <span>Page : {pageNum}</span>}
            <button onClick={goNext}>Next</button>
          </div>
        </div>
      ) : (
        <p className='no-results'>No Results</p>
      )}

      {!booksView && shortlist && (
        <Shortlist shortlist={shortlist} />
      )}
    </div>
  )
}

export default App
