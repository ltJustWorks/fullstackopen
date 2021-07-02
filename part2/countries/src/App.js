import React, { useEffect, useState } from 'react'
import axios  from '../../phonebook/node_modules/axios'

const SearchBar = ({keyword, handleKeyword}) => {
  return (
    <div>
      Search: <input value={keyword} onChange={handleKeyword} />
    </div>
  )
}

const Country = ({country}) => {
  console.log(country)
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={'flag of ' + country.name} width='300px' height='200px' />
    </div>
  )
}

const Countries = ({countries}) => {
  console.log(countries)
  return (
    <div>
      {countries.map(country => <Country key={country.name} country={country} />)}
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ keyword, setKeyword ] = useState('')

  const handleKeyword = event => setKeyword(event.target.value)

  const filteredCountries = () => {
    if (keyword === '') {
      return countries
    }
    else {
      return countries.filter(country => country.name.toLowerCase().includes(keyword.toLowerCase()))
    }
  }

  useEffect(() => {
      const promise = axios.get('https://restcountries.eu/rest/v2/all')
      promise.then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
    }
  , [])

  return (
    <div>
      <SearchBar keyword={keyword} handleKeyword={handleKeyword} />
      <Countries countries={filteredCountries()} /> 
    </div>
  )
}

export default App