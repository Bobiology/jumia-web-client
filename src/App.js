import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import Datatable from "./datatable"
import './app//styles.css';

require("es6-promise").polyfill()
require("isomorphic-fetch")

function App() {
  const [data, setData] = useState([])
  const [q, setQ] = useState("")
  const [searchColumns, setSearchColumns] = useState([
    'countryName',
    'phoneStatus',
  ]);


  useEffect(() => {
    fetch("http://localhost:8081/customers")
    .then((response) => response.json())
    .then((json) => setData(json.content));
  }, [])

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }

  const columns = data[0] && Object.keys(data[0]);

  return (
    <div className="App">
      <div className='container'>
        <table align='center'>
          <tr>
            <td>
            <h1> JUMIA SERVICE - COUNTRIES PHONE NUMBERS</h1> 
            </td>
          </tr>
          <tr className='searchItem'>
            <td>
      <input
          type='text' placeholder='search...' 
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type='checkbox'
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column],
                  );
                }}
              />
              {column}
          </label>
        )) }
            </td>
          </tr>
        </table>
        </div>
      <div className='phone-container'>
        <Datatable data = {search(data)}
        />
     </div>
      </div>
  );
}

export default App;
