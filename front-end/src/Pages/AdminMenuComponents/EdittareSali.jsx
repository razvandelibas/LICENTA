import AdminNavbar from "./AdminNavbar";
import React, { useState } from 'react';
import jwt_decode from "jwt-decode";
import getAxiosInstance from "../axios.service";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Form';
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const EditareSali = () => {

    const [nrSali, setNrSali] = useState(0); // adaugare state pentru numarul de sali selectate
    const [sali, setSali] = useState([]); // adaugare state pentru salile introduse
    const [capacitate, setCapacitate]=useState([]);
    
    const [isActive, setIsActive]=useState(true);

    const handleNrPrioritatiChange = (event) => { // functie pentru a actualiza numarul de sali selectate
        const nrSali = event.target.value;
        setNrSali(nrSali);
        setSali(Array(parseInt(nrSali)).fill("")); // actualizarea state-ului pentru salile introduse cu un array de nrSali elemente goale
    };
  
    const handlePrioritateChange = (index, event) => { // functie pentru a actualiza salile introduse
        const newSali = [...sali];
        newSali[index] = event.target.value;
        setSali(newSali);
    };
  
    const handleCapacitateChange = (index, event) => { // functie pentru a actualiza salile introduse
        const newCapacitate = [...capacitate];
        newCapacitate[index] = event.target.value;
        setCapacitate(newCapacitate);
    };

    const [message, setMessage] = useState('');
    
   
  
    const SaliInputs = []; // array pentru a stoca campurile pentru completarea salilor
    for (let i = 0; i < nrSali; i++) {
    
        SaliInputs.push(
            <Form.Group style={{  justifyContent: 'center', display:'flex' ,flexDirection: 'column',alignItems: 'center' }}  key={i} className="mb-3">
                <Form.Label ><h3 style={{margin:'5px'}}>Sală {i + 1}</h3></Form.Label>
                <div style={{ display: "flex", justifyContent: "space-between", width: "48%" }}>
                  <Form.Control style={{  width: "48%" }} type="text" className="form-control-lg" placeholder="Denumire" value={sali[i]} onChange={(event) => handlePrioritateChange(i, event)} />
                  <Form.Control style={{ width: "48%", marginLeft:'10px' }} type="number" className="form-control-lg" placeholder="Capacitate" min={1} onChange={(event) => handleCapacitateChange(i, event)} />
                  </div>
              </Form.Group>
          );
  
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        const saliList = sali.map((denumire, i) => ({
            denumire,
            capacitate: capacitate[i],
            tipsala: capacitate[i] > 25 ? 2 : 1 //2 daca e mai mare de 25, 1 daca e mai mica
          }));
      console.log(isActive);
      for(let i=0;i<saliList.length;i++)
      {   
        
        await getAxiosInstance().post("/schedules/adaugareSali",{
           'denumire':saliList[i].denumire,
           'tipsala':saliList[i].tipsala,
           'capacitate':parseInt(saliList[i].capacitate,10),
           'isActive':isActive

        })
        .then(response => {
         /* setTimeout(() => {
            setMessage('');
          }, 3000);*/ 
          //setMessage('Noile săli au fost adăugate cu succes!');
          toast.success('Noile săli au fost adăugate cu succes!');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch(error => {
          //setMessage('Ceva nu a mers, încearcă din nou!');
          toast.error('Ceva nu a mers, încearcă din nou!');
        });
    }
    

    };
    
    return (
        <div className="sidebar-container">
            <AdminNavbar/>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
            <h1 style={{ margin:'30px' }}>Introduceți noi săli</h1>
                {message && <p >{message}</p>}
                <ToastContainer />
        <Container className="centered-form-container">
            <Form onSubmit={handleSubmit}>
           
            <Form.Group style={{ justifyContent: 'center', display:'flex' }} controlId="nrPrioritati" className="mb-3">
            <Form.Control style={{ width: "50%" }} type="number" placeholder="Introduceți numărul de săli" className="form-control-lg" min={1} value={nrSali} onChange={handleNrPrioritatiChange} />
          </Form.Group>


          {SaliInputs}
              

              <Button  type="submit" className="btn btn-lg" onClick={handleSubmit}>
                Trimite
              </Button>
            </Form>
            </Container>
            </motion.div>
        </div>
    );

};

export default  EditareSali;