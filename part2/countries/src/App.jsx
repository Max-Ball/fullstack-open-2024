import { useEffect, useState } from 'react'
import Country from './Country'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filteredCountries, setFilteredCountries] = useState([])
  const [input, setInput] = useState('')

  async function getAllCountries(){
    try {
      const allCountries = await countriesService.getAllCountries();
      setCountries(allCountries)
      console.log(allCountries);
    } catch (error) {
      console.log(error);
    }
  }
  const handleCountryChange = (event) => {
    const input = event.target.value.toLowerCase();
    const filter = countries.filter(c => c.name.common.toLowerCase().includes(input))
    if (!input) {
      setFilteredCountries([])
    } else {
      setFilteredCountries(filter)
    }
    setInput(event.target.value)
  }

  useEffect(() => {
    getAllCountries()
  }, [])

  const renderCountrySection = () => {
    if (filteredCountries.length === 0) {
      return <div>No matching countries found.</div>;
    }

    if (filteredCountries.length === 1) {
      return (
        <div>
          <h3>Country Information</h3>
          <Country country={filteredCountries[0]} showInfo={true} />
        </div>
      );
    }

    return (
      <div>
        Country name: {filteredCountries.length <= 10
          ? filteredCountries.map((fc) => <Country country={fc} key={fc.name.common} />)
          : 'Too many matches, specify another filter'}
      </div>
    );
  };

  return (
    <div>
      <h2>Country Finder</h2>
      Search A Country: <input value={input} onChange={handleCountryChange} />
      <div>{renderCountrySection()}</div>
    </div>
  );
}

export default App