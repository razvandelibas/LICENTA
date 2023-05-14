import React, { useState } from 'react';
import { Link } from 'react-router-dom';




export const AdminNavbar = () => {

     
    return (
        <nav className="navbar">
            <h3 className="logo">My Schedule App</h3>
            <ul className="nav-links">
            <Link to="/home" className="home">
                    <li>Acasă</li>
            </Link>
            <Link to="/editarePrioritati" className="admin">
                    <li>Seteaza politicile</li>
            </Link>
            <Link to="/vizualizarePrioritati" className="admin">
                    <li>Vezi politicile</li>
            </Link>
            <Link to="/editareSali" className="admin">
                    <li>Adaugă săli de evenimente</li>
            </Link>
            <Link to="/vizualizareSali" className="logout">
                    <li>Vezi sălile existente</li>
            </Link>
            <Link to="/" className="logout">
                    <li>Deloghează-te</li>
            </Link>
            </ul>
        </nav>
      );
  };
  
  export default  AdminNavbar;
    