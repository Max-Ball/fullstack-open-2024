import { useEffect, useState } from 'react'
import SearchFilter from './SearchFilter'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newCountry, setNewCountry] = useState('')

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const searchedCountry = await countriesService.getSearchResults(newCountry)
      console.log(searchedCountry);
      setCountries(searchedCountry)
      setNewCountry('')
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect( [])

  return (
    <div>
      <h2>Country Finder</h2>
      <form onSubmit={handleSubmit}>
        <span>FROM APP</span><input value={newCountry} onChange={handleCountryChange} />
        <button type="submit">SEARCH</button>
      </form>
      Country name: {countries.map(c => c.name.common)}
      {/* <SearchFilter countries={countries} /> */}
    </div>
  )
}

export default App