import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const getSearchResults = async (searchResult) => {
  const response = await axios.get(`${baseUrl}/name/${searchResult}`)
  return response.data
}

export default { getSearchResults, getAllCountries }