import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import jwt_decode from "jwt-decode";
import getAxiosInstance from "../axios.service";
import AdminNavbar from '../AdminMenuComponents/AdminNavbar';
import { AnimatePresence, motion } from "framer-motion";

export const Home = () => {
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
     
    const token = localStorage.getItem('user');
    const decoded = jwt_decode(token);
    const userId = decoded.sub;
    const userRole = decoded.role;
    
    getAxiosInstance().get(`/user/${userId}`)
    .then(response => {
        setUserName(response.data.name)
        
    })
    .catch(error => console.log(error));
  
    useEffect(() => {
        if (userRole === "Admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }, [userRole]); //deaorece are dependinta userRole ruleaza doar la prima randare sau de fiecare data cand se  se modifica dependintele

    return (
        <div className="sidebar-container home-page">
            {isAdmin ? <AdminNavbar /> : <Navbar />} {/* Afiseaza meniul in functie de rolul utilizatorului */}
          <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
            
            <div className="home-message">
                <h1>Bine ai venit, {userName}!</h1>
                
            </div>
            </motion.div>
        </div>
      );
  };
  
  export default  Home;
    