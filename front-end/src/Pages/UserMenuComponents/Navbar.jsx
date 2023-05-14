import React, { useState } from 'react';
import { Link } from 'react-router-dom';




export const Navbar = () => {

     
    return (
        <nav className="navbar">
            <h3 className="logo">My Schedule App</h3>
            <ul className="nav-links">
                <Link to="/home" className="home">
                    <li>Acasă</li>
                </Link>
                {/*<Link to="/details" className="details">
                    <li>Account Details</li>
                </Link>*/}
                <Link to="/yourPlans" className="yourPlans">
                    <li>Planificările tale</li>
                </Link>
                <Link to="/makePlan" className="makePlan">
                    <li>Planifică-ți un eveniment</li>
                </Link>
                <Link to="/schedule" className="schedule">
                    <li>Orarul tău</li>
                </Link>
                <Link to="/" className="logout">
                    <li>Deloghează-te</li>
                </Link>
            </ul>
        </nav>
      );
  };
  
  export default  Navbar;
    