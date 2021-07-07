import React, { useEffect, useState } from 'react'
import axios  from 'axios'

const SearchBar = ({keyword, handleKeyword}) => {
  return (
    <div>
      Search: <input value={keyword} onChange={handleKeyword} />
    </div>
  )
}

const Country = ({country}) => {
  console.log(country)
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
    const query = country.capital

    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${query}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data.current)
        console.log('setWeather success')
      })
  }, [country.capital])

  console.log(weather)
  console.log('array: ' + weather.weather_icons)
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

      <h2>Weather in {country.capital}</h2>
      <div><b>Temperature:</b> {weather.temperature} Celsius</div>
      <img src={weather.weather_icons} alt={weather.weather_descriptions} />
      <div><b>Wind:</b> {weather.wind_speed} direction {weather.wind_dir}</div>
    </div>
  )
}

const Countries = ({countries, setShownCountries, hasKeyword}) => {
  console.log(countries)

  if (!hasKeyword) {
    return (
      <div>
        Please enter a search term.
      </div>
    )
  }
  else if (countries.length > 10) {
    return (
      <div>
        Too many results, be more specific
      </div>
    )
  }
  else if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        {countries.map(country => <div key={country.name}>{country.name} <button onClick={() => setShownCountries([country])}>Show</button> </div>)}
      </div>
    )
  }
  else if (countries.length === 0) {
    return (
      <div>
        No results found, try a different search
      </div>
    )
  }

  else {
    return (
      <div>
        <Country country={countries[0]} />
      </div>
    )
  }

}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ shownCountries, setShownCountries ] = useState([])
  const [ keyword, setKeyword ] = useState('')

  const handleKeyword = event => {
    setKeyword(event.target.value)
    setShownCountries(filterCountries(event.target.value)) // Make sure not to pass the 
  }

  const hasKeyword = () => keyword !== ''

  const filterCountries = (keyword) => {
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
      <Countries countries={shownCountries} setShownCountries={setShownCountries} hasKeyword={hasKeyword()} /> 
    </div>
  )
}

export default App