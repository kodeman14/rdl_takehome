import { useEffect, useState } from 'react'
import { config } from '../assets/config'

const Books = (props) => {
  const [faves, setFaves] = useState([])
  const [ids, setIds] = useState([])


  return (
    <table>
      <thead>
        <tr>
          {config.columns.map(col => (
            <th key={col.accessor}>{col.header}</th>
          ))}
        </tr>
      </thead>
    </table>
  )
}

export default Books