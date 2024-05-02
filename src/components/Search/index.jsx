import React from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
    return (
        <>
            <div>
                <span><FaSearch /></span>
                <input type="text" />
            </div>
        </>
    );
}

export default Search;