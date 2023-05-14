import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import getAxiosInstance from "./axios.service";
import ClipLoader from "react-spinners/ClipLoader";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = (props) => {
    const[email, setEmail] =useState('');
    const[pass, setPass] =useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);//pt loader
    localStorage.clear('user');

    /*useEffect(()=>{
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);

      },5000)

    },[])*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(email);


        const response = await getAxiosInstance().get(`/user/check-email/${email}`);
        if (response.data.message === 'Email already exists!') {
             //setMessage('Invalid email!');
               //  return;
               getAxiosInstance().post('/auth/login', {
                   'email': email,
                   'password': pass
                   
                 })
                 .then(response => {
                    //console.log(response);
                   localStorage.setItem('user',response.data.acces_token); //pun jwt-ul in local storage
                   //console.log(response.data.acces_token);
                   setLoading(true);
                   navigate("/2fa");
                 })
                 .catch(error => {
                  setLoading(false);
                  // setMessage(`Invalid password for ${email}`);
                  toast.error(`Ați introdus parola greșită pentru ${email}`);
                 });
             
                }
       else { 
            setLoading(false);
           // setMessage('Invalid email!');
           toast.error('Adresă de email invalidă!');
                    return;
            }
    };



    return (
      <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
    <div classNmae="auth-form-container">  
       <form className="login-form" onSubmit={handleSubmit}>
            <h2>Autentificare</h2>
            <div  style={{ textAlign: "center" }}>
            <ClipLoader color={'D0021B'} loading={loading} size={30} aria-label="Loading Spinner" data-testid="loader" />
            </div>
            {message && <p>{message}</p>} 
            <ToastContainer />
            <label htmlfor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="adresa ta de email" id="email" name="email"/>
            <label htmlfor="password">Parola</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="parola ta" id="password" name="password"/>
            <button type="submit" className="button" onClick={(e)=>handleSubmit(e)}>Autentifică-te</button>
            <button className="link-btn" onClick={ ()=> navigate("/register")}>Nu ai un cont? Înregistrează-te aici!</button>
       </form>
    </div>
    </motion.div>
    )
    
    }