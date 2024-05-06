import React from "react";
import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";

export function FetchVenues() {
    const { data, isLoading, isError } = useApi(holidazeUrls.urlVenues);

    if(isLoading) {
        return <p>Loading...</p>
    }
    if(isError) {
        return <p>Something went wrong!</p>
    }
     console.log(holidazeUrls.urlVenues + "?_owner=true")
    console.log(data)

    return (
        <div>
            {data.map((venue) => (
                <div key={venue.id}>
                    <h3>{venue.name}</h3>
                </div>
            ))}
        </div>
    );
}
