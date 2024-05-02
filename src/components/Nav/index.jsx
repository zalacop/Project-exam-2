import React from "react";
import { CgProfile } from "react-icons/cg";

function Nav() {
    return (
        <div>
            <ul>
                <li>
                    Venues
                </li>
                <li>
                    Log in
                </li>
                <li>
                    <CgProfile />
                </li>
            </ul>
        </div>
    );
}

export default Nav;