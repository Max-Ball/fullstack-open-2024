import { useState } from "react";
import Person from "./Person";

const SearchFilter = ({persons}) => {
    const [filteredPersons, setFilteredPersons] = useState([])
    const [checkFilter, setCheckFilter] = useState('')

    const handleFilter = (event) => {
        setCheckFilter(event.target.value)

        if(event.target.value.trim() === ''){
            setFilteredPersons([]);
            return;
        }
        const filteredPerson = persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredPersons(filteredPerson)
    }
    return (
        <div>
            <div>
                <span>filter shown with <input value={checkFilter} onChange={handleFilter} /></span>
            </div>
            <div>
                {filteredPersons.map(filteredPerson => 
                    <Person person={filteredPerson} key={filteredPerson.name}/>
                    )}
            </div>
        </div>
    )
}

export default SearchFilter;