import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuNavbar } from "../menu/MenuNavbar";

function Navbar() {
    return (
        <div className="navbar w-auto h-auto bg-base-100 drop-shadow-xl m-4 rounded-lg rounded-b-md ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {MenuNavbar.map((item, index) => {
                            return (
                                <>
                                    <li key={index}><a href={item.url}><FontAwesomeIcon icon={item.icon} />{item.title}</a></li>
                                </>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-lg w-auto h-auto" href="/">Stasiun Geofisika Padang Panjang</a>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    )
}

export default Navbar