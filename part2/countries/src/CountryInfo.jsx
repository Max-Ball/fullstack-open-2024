const CountryInfo = ({country}) => {
    return (
        <div>
            <h4>Region: {country.region}</h4>
            <h4>Capital: {country.capital[0]}</h4>
            <h4>Population: {country.population}</h4>
            <h4>Map: <a href={country.maps.googleMaps} target="_blank">{country.maps.googleMaps}</a></h4>
            <div>
                <h4>
                    Coat of arms:
                </h4>
                <img src={country.coatOfArms.png} alt={`${country.name.common} Coat of Arms`} width="100px"/>
            </div>
            <div>
                <h4>
                    Flag:
                </h4>
                <img src={country.flags.png} alt={`${country.name.common} Coat of Arms`} width="100px" border="1px"/>
            </div>
        </div>
    )
}

export default CountryInfo;