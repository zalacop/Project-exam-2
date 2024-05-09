import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import holidazeUrls from "../../utils/url";
import useApi from "../../hooks/useFetchApi";

function Search() {
    const { data: venues } = useApi(holidazeUrls.urlVenues + '?_owner=true&_bookings=true');

    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState(venues);
    const [originalVenues, setOriginalVenues] = useState(venues);

    useEffect(() => {
        setOriginalVenues(venues);
        setSearchResult(venues);
    }, [venues]);

    function handleChange(event) {
        setSearchValue(event.target.value)
    };

    useEffect(() => {
        const filteredResults = originalVenues.filter(venue => {
            const search = searchValue.toLowerCase().trim();
            return (
                venue.name.toLowerCase().includes(search) ||
                (venue.location && Array.isArray(venue.location) && venue.location.some(location =>
                    (location.country && location.country.toLowerCase().includes(searchTerm)) ||
                    (location.city && location.city.toLowerCase().includes(searchTerm)) ||
                    (location.continent && location.continent.toLowerCase().includes(searchTerm))
                ))
            );
        });
        setSearchResult(filteredResults);
    }, [searchValue, originalVenues]);
    

    function handleVenueClick() {
        setSearchValue("");
    }
    
    return (
        <>
            <div>
                <span><FaSearch /></span>
                <input 
                    type="text"
                    className="border"
                    value={searchValue}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder=""
                    id="search" />
            </div>
            <div>
                {searchValue && searchResult.map((venue) => (
                    <div key={venue.id}>
                        <div>{venue.name}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Search;