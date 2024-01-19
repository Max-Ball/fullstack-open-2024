import CountryInfo from "./CountryInfo";

const Country = ({country, showInfo}) => {
    return (
        <div>
            <h3>{country.name.common} </h3>
            {showInfo ? <CountryInfo country={country} /> : ''}
        </div>
    )
}

export default Country;