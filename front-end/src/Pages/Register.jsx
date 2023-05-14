import React, {useState} from "react";
import axios from 'axios';
import getAxiosInstance from "./axios.service";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = (props) => {
    const[email, setEmail] =useState('');
    const[pass, setPass] =useState('');
    const[name, setName] =useState('');
    const [message, setMessage] = useState('');
    const[verifyPass, setVerifyPass] =useState('');
    const navigate = useNavigate();
   
    //const history = useHistory();
const handleSubmit = async (e) => {
        e.preventDefault();
    
        
    const response = await getAxiosInstance().get(`/user/check-email/${email}`); //verificare daca email-ul exista deja in baza de date 
        if (response.data.message === 'Email already exists!') {
            //setMessage('Email already exists!');
            toast.error('Adresa introdusă există deja!');
            console.log(response.data.message);
            return;

         } else  if (!/^\S+@\S+\.\S+$/.test(email)) {//verificare format de tip email
         // setMessage("Please enter a valid email address!");
          toast.error("Vă rugăm introduceți o adresă validă!");
      } else if (pass !== verifyPass) { //verificare daca parolele coincid
          //setMessage("Passwords do not match!");
          toast.error("Parolele nu coincid!");
      } else {
        
        getAxiosInstance().post('/user/register', {
            'name': name,
            'email': email,
            'password': pass
            
          })
          .then(response => {
           // setMessage("Registration successful!");
           toast.success("Te-ai înregistrat cu succes! Bun venit!");
           // history.push('/login');
          })
          .catch(error => {
           
            //setMessage("Registration failed!");
            toast.error("Înregistrare eșuată!");
            
          });
        }
   
      }
return (
  <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
     <div className="auth-form-container">
            <h2>Înregistrare</h2>  
            {message && <p>{message}</p>} 
            <ToastContainer />
       <form className="register-form" onSubmit={handleSubmit}>
            <label htmlfor="name">Nume</label>
            <input value={name} onChange={(e) => setName(e.target.value)}  id="name" placeholder="Nume" name="name" />
            <label htmlfor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@gmail.com" id="email" name="email"/>
            <label htmlfor="password">Parola</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="parola ta" id="password" name="password"/>
            <label htmlfor="password">Verifică Parola</label>
            <input value={verifyPass} onChange={(e) => setVerifyPass(e.target.value)} type="password" placeholder="verifică parola" id="verify password" name="verify password"/>
            <button  type="submit" className="button" onClick={(e)=>handleSubmit(e)}>Înregistrează-te</button>
            <button className="link-btn" onClick={ ()=> navigate("/login")}>Ai dejaun cont? Autentifică-te aici!</button>
       </form>
    </div>
    </motion.div>
            )
            
        }
            
