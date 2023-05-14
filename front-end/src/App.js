import React, {useState} from "react";
/*import logo from './logo.svg';*/
import './App.css';
import { Login} from './Pages/Login';
import { Register } from './Pages/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Routes,
  Navigate
} from "react-router-dom";
import { TwoFactorAuth } from "./Pages/TwoFactorAuth";

import {Home} from './Pages/UserMenuComponents/Home'
import {AccountDetails} from './Pages/UserMenuComponents/AccountDetails'
import {YourPlans} from './Pages/UserMenuComponents/YourPlans'
import {MakeaPlan} from './Pages/UserMenuComponents/MakeaPlan'
import {Schedule} from './Pages/UserMenuComponents/Schedule'

import EditarePrioritati from "./Pages/AdminMenuComponents/EditarePrioritati";
import VizualizarePrioritati from "./Pages/AdminMenuComponents/VizualizarePrioritati";
import EditareSali from "./Pages/AdminMenuComponents/EdittareSali";
import VizualizareSali from "./Pages/AdminMenuComponents/VizualizareSali";
import {AnimatePresence} from "framer-motion";

function App() {

/*  const [currentForm, setCurrentForm]= useState('login');

  const toggleForm =(formName) => { //pentru switch-ul intre pagini la apsarea unui buton
    setCurrentForm(formName);

  }*/

  return (
    
      <div className="App">
      <Router>
      <AnimatePresence>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/2fa" element={<TwoFactorAuth />} />
         {/* <Route path="/Menu" element={<UserMenu />} />*/}
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<AccountDetails />} />
          <Route path="/yourPlans" element={<YourPlans />} />
          <Route path="/makePlan" element={<MakeaPlan />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/editarePrioritati" element={<EditarePrioritati/>}/>
          <Route path="/vizualizarePrioritati" element={<VizualizarePrioritati/>}/>
          <Route path="/editareSali" element={<EditareSali/>}/>
          <Route path="/vizualizareSali" element={<VizualizareSali/>}/>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        </AnimatePresence>
      </Router>
    </div>
  //cu navigate daca user-ul aceseaza "/" va fi redirectionat catre pagina"/login"

  );
}

export default App;
