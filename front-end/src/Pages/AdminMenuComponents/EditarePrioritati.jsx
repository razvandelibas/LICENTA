import React, { useState } from 'react';
import jwt_decode from "jwt-decode";
import getAxiosInstance from "../axios.service";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Form';
import Navbar from '../UserMenuComponents/Navbar';
import AdminNavbar from './AdminNavbar';
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditarePrioritati=()=>{


  const [nrPrioritati, setNrPrioritati] = useState(0); // adaugare state pentru numarul de prioritati selectate
  const [prioritati, setPrioritati] = useState([]); // adaugare state pentru prioritatile introduse

  const handleNrPrioritatiChange = (event) => { // functie pentru a actualiza numarul de prioritati selectate
      const nrPrioritati = event.target.value;
      setNrPrioritati(nrPrioritati);
      setPrioritati(Array(parseInt(nrPrioritati)).fill("")); // actualizarea state-ului pentru prioritatile introduse cu un array de nrPrioritati elemente goale
  };

  const handlePrioritateChange = (index, event) => { // functie pentru a actualiza prioritatile introduse
      const newPrioritati = [...prioritati];
      newPrioritati[index] = event.target.value;
      setPrioritati(newPrioritati);
  };

  const [message, setMessage] = useState('');
  
 

  const prioritatiInputs = []; // array pentru a stoca campurile pentru completarea prioritatilor
  for (let i = 0; i < nrPrioritati; i++) {
  
        prioritatiInputs.push(
          <Form.Group style={{  justifyContent: 'center', display:'flex' ,flexDirection: 'column',alignItems: 'center' }}  key={i} className="mb-3">
              
              <Form.Label ><h3 style={{margin:'5px'}}>Tip eveniment prioritate {i + 1}</h3></Form.Label>
            
              
                <Form.Control style={{  width: "48%" }} type="text" className="form-control-lg" placeholder={`Prioritatea ${i + 1}`} value={prioritati[i]} onChange={(event) => handlePrioritateChange(i, event)} />
            </Form.Group>
        );

  }

  const handleSubmit=async (e)=>{
    e.preventDefault();

    const prioritatiList = prioritati.map((denumire, i) => ({
      denumire,
      prioritate: i + 1 
    }));

    
    let numarInregistariAnterior =await getAxiosInstance().get("/schedules/numarPrioritati/count");
     console.log(numarInregistariAnterior);
    for(let i=1; i<=numarInregistariAnterior.data;i++)
    {
      await getAxiosInstance().delete(`/schedules/adaugarePrioritati/${i}`,{
        

    })
    .then(response => {
      
      
      
    })
    .catch(error => {
      setMessage('Ceva nu a mers, încearcă din nou!');
    });
    }

    for(let i=0; i<prioritatiList.length;i++)
   { 
    await getAxiosInstance().post(`/schedules/adaugarePrioritati`,{
        'denumire':prioritatiList[i].denumire,
        'prioritate':prioritatiList[i].prioritate,

    })
    .then(response => {
     /* setTimeout(() => {
        setMessage('');
      }, 3000);*/ 
      //setMessage('Politicile au fost adăugate cu succes!');
      toast.success('Politicile au fost adăugate cu succes!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch(error => {
      //setMessage('Ceva nu a mers, încearcă din nou!');
      toast.error('Ceva nu a mers, încearcă din nou!');
    });

    }
   // window.location.reload(); //refresh la pagina dupa submit
    
  };  

 
    return (
     
        <div className="sidebar-container ">     
                <AdminNavbar/>
                <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
                <h1 style={{ margin:'30px' }}>Introduceți politicile instituției</h1>
                {message && <p >{message}</p>}
                <ToastContainer />
        <Container className="centered-form-container">
            <Form onSubmit={handleSubmit}>
           
            <Form.Group style={{ justifyContent: 'center', display:'flex' }} controlId="nrPrioritati" className="mb-3">
            <Form.Control style={{ width: "50%" }} type="number" placeholder="Introduceți numărul de priorități" className="form-control-lg" min={1} value={nrPrioritati} onChange={handleNrPrioritatiChange} />
          </Form.Group>


          {prioritatiInputs}
              

              <Button  type="submit" className="btn btn-lg" onClick={handleSubmit}>
                Trimite
              </Button>
            </Form>
            </Container>
            </motion.div>
            </div>
          );

};

export default  EditarePrioritati;