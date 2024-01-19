import { useState } from "react";
import Country from "./Country";

const SearchFilter = ({countries}) => {
    const [filteredCountries, setFilteredCountries] = useState([])
    const [checkFilter, setCheckFilter] = useState('')

    const handleFilter = (event) => {
        setCheckFilter(event.target.value)

        if(event.target.value.trim() === ''){
            setFilteredCountries([]);
            return;
        }
        const filteredCountry = countries.filter(c => c.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredCountries(filteredCountry)
    }
    return (
        <div>
            <div>
                <span>find countries: <input value={checkFilter} onChange={handleFilter} /></span>
            </div>
            <div>
                {filteredCountries.map(filteredCountry => 
                    <Country country={filteredCountry} key={filteredCountry.id}/>
                    )}
            </div>
        </div>
    )
}

export default SearchFilter;