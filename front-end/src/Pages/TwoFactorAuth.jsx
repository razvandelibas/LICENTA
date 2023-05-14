import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getAxiosInstance from "./axios.service";
import jwt_decode from "jwt-decode";
import ClipLoader from "react-spinners/ClipLoader";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TwoFactorAuth = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [canShowPage, setCanShowPage] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => { //cu ajutorul useEffect verificarea de mai jos are loc la fiecare randare a paginii. Fara el, daca utilizatorul are acces la pagina, dar intre timp token-ul expira sau este sters din localStorage, acesta ar putea sa acceseze in continuare pagina TwoFactorAuth.
    
    const token = localStorage.getItem('user');
    if (token !== null) {
     // const decoded = jwt_decode(token);
      setCanShowPage(true); //afisam pagina daca exista jwt-ul
     
     
    } else {
      setMessage('Nu aveți acces la această pagină.');
      //navigate('/login');
    }
   
  }, []);
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(code);
    const token = localStorage.getItem('user');
    const decoded = jwt_decode(token);
    const userId = decoded.sub;
    const role=decoded.role;
    console.log(userId);
    const response = await getAxiosInstance().get(`/user/check-authCode/${userId}/${code}`);
    if (response.data.message === 'This is the code!') {
      console.log(response.data.message);
    getAxiosInstance().post('/auth/2fa', {
      'code': code      
    })
    .then(response => {
      //setMessage("This is the code! Welcome!");
      toast.success("Acesta este codul! Bine ai venit!");
    /*  if(role==="BasicUser")
      {
        navigate("/home");
      }
      else if(role==="Admin")
      {
        navigate("/admin");
      }*/
      setLoading(true);
      navigate("/home");
    })
    .catch(error => {
      setLoading(false);
      //setMessage("Cam pari hacker boss!");
      toast.error("Ceva nu a mers! Încearcăa din nou.");
    });
    
    // navigate("/profile");
      
  }else { 
            setLoading(true);
            //setMessage('Incorrect code!');
            toast.error('Incorrect code!');
            return;
        }
  };

  return (
        <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
    <div className="auth-form-container"> 
        
      {canShowPage ? (
        <form className="two-factor-form" onSubmit={handleSubmit}>
          <p>{message}</p>
          <ToastContainer />
          <h2>Verifică-ți email-ul</h2>
          <div  style={{ textAlign: "center" }}>
            <ClipLoader color={'D0021B'} loading={loading} size={30} aria-label="Loading Spinner" data-testid="loader" />
            </div>
          <label htmlFor="code">Introdu codul de securitate: </label>
          <input value={code} onChange={(e) => setCode(e.target.value)}  placeholder="cod de securitate" id="code" name="code" />
          <button  style={{marginLeft:'10px'}} type="submit" className="button" onClick={(e)=>handleSubmit(e)}>Trimite</button>
        </form>
      ) : (
        <p>{message}</p>
        )}
      
    </div>
        </motion.div>
  );
};