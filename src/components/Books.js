import { useEffect, useState } from 'react'
import { config } from '../assets/config'

const Books = (props) => {
  const [faves, setFaves] = useState([])
  const [idsArr, setIdsArr] = useState([])

  const addToFaves = (item) => {
    console.log('fave', item)
    setFaves([...faves, item])
    setIdsArr([...idsArr, item.id])
  }

  useEffect(() => {
    console.log('faves arr', faves)
    props.createFaves(faves)
  }, [faves])

  return (
    <table>
      <thead>
        <tr>
          {config.columns.map(col => (
            <th key={col.accessor}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.books.map(book => (
          <tr key={book.id}>
            <td id={config.columns[0].accessor}>{book.id}</td>
            <td id={config.columns[1].accessor}>{book.title}</td>
            <td id={config.columns[2].accessor}>{book.download_count}</td>
            <td id={config.columns[3].accessor}>{book.authors.length > 0 ? book.authors[0].name : 'N/A'}</td>
            <td>
              {idsArr.includes(book.id) ? 'ADDED'
                : <button onClick={() => addToFaves(book)}>SHORTLIST</button>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Books