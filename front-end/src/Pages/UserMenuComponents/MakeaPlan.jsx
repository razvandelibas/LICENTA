import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import getAxiosInstance from '../axios.service';
import Navbar from './Navbar';
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MakeaPlan = (props) => {
  const [denumire, setDenumire] = useState('');
  const [numarParticipanti, setNumarParticipanti] = useState('');
  const [durata, setDurata] = useState('');
  const [ziua, setZiua] = useState('');
  const [prioritati, setPrioritati] =useState([]);
  const [nivelPrioritate,setNivelPrioritate] =useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
    
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleConfirm = () => {
        handleSubmit();
      };

      
      const prioritatiList= ()=>{  getAxiosInstance().get("/schedules/afisarePrioritati/all")
      .then(response => {
        const data = response.data;
        console.log(data);
       
        setPrioritati(data);//actualizare state planificari cu noua lista de planificari prin apelul functiei setPlanificari(data)
      })
      .catch(error => console.log(error));
    }
   
      useEffect(() => {
        prioritatiList();
    }, []);

  const handleSubmit = (e) => {
   if(e) e.preventDefault();

    getAxiosInstance().post('/schedule', {
        'ziua': ziua,
        'denumire':denumire,
        'durata':parseInt(durata, 10),
        'numarParticipanti':parseInt(numarParticipanti, 10),
        'nivelPrioritate':parseInt(nivelPrioritate,10)
    })
    .then(response => {
       // setMessage("Planificare realizata cu succes!");
       toast.success("Planificare realizata cu succes!");
        handleCloseModal();
       // history.push('/login');
      })
      .catch(error => {
       
        if (error.response.data.message) {
          toast.error(error.response.data.message);
      } else {
          toast.error("Ceva nu a mers! Încearcă iar.");
      }
       
        handleCloseModal();
      });   


  };

  return (
    <div className="sidebar-container make-plan">
      <Navbar />
      <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
        <h1 style={{ margin:'40px', marginTop:'120px' }}>Creează o planificare</h1>
        {message && <p>{message}</p>} 
        <ToastContainer />
      <Container style={{maxHeight:'500px', display:'flex', justifyContent:'center', alignItems:'center',height:'100vh'  }} className="centered-form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group style={{  justifyContent: 'center', display:'flex' ,flexDirection: 'column',alignItems: 'center' }} controlId="denumire" className="mb-3">
        
            <Form.Control
             
              type="text"
              placeholder="Denumire eveniment"
              value={denumire}
              onChange={(e) => setDenumire(e.target.value)}
              className="form-control-lg"
            />
          </Form.Group>

          <Form.Group style={{  justifyContent: 'center', display:'flex' ,flexDirection: 'column',alignItems: 'center' }} controlId="numarParticipanti" className="mb-3">
            
            <Form.Control
             
              type="number"
              placeholder="Număr de participanți"
              value={numarParticipanti}
              onChange={(e) => setNumarParticipanti(e.target.value)}
              className="form-control-lg"
            />
          </Form.Group>

          <Form.Group style={{  justifyContent: 'center', display:'flex' ,flexDirection: 'column',alignItems: 'center' }} controlId="durata" className="mb-3">
            
            <Form.Control
             
              type="number"
              placeholder="Durata (ore)"
              value={durata}
              onChange={(e) => setDurata(e.target.value)}
              className="form-control-lg"
            />
          </Form.Group>

          <Form.Group style={{  justifyContent: 'center', display:'flex',flexDirection: 'column', alignItems: 'center' }} controlId="ziua" className="mb-3">
            
            <Form.Select
            style={{margin:'10px'}}
              value={nivelPrioritate}
              onChange={(e) => setNivelPrioritate(e.target.value)}
              placeholder="Selectează nivelul de prioritate"
              className="custom-select custom-select-lg"
            >
              <option value="">Selectează nivelul de perioritate</option>
              {prioritati.map(prioritate => (
                <option key={prioritate.id} value={prioritate.id}>
                {prioritate.denumire}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group style={{  justifyContent: 'center', display:'flex',flexDirection: 'column', alignItems: 'center' }} controlId="ziua" className="mb-3">
            
            <Form.Select
            style={{margin:'10px'}}
              value={ziua}
              onChange={(e) => setZiua(e.target.value)}
              placeholder="Selectează ziua"
              className="custom-select custom-select-lg"
            >
              <option value="">Selectează ziua</option>
              <option value='luni'>luni</option>
              <option value='marti'>marți </option>
              <option value='miercuri'>miercuri </option>
              <option value='joi'>joi</option>
              <option value='vineri'>vineri </option>
            </Form.Select>
          </Form.Group>

            <Button style={{margin:'10px'}} type="submit" className="btn btn-lg" onClick={(e) => handleShowModal(e)}>Creează planificarea</Button>
          
     {showModal && (
    <div className="overlay" onClick={handleCloseModal}></div>
    )}
    {showModal && (
       <div className="popup">
            <h2>Confirmare planificare</h2>
            <p >Denumire eveniment: {denumire}</p>
            <p >Număr de participanți: {numarParticipanti}</p>
            <p >Durata (ore): {durata}</p>
            <p >Nivel Prioritate: {nivelPrioritate}</p>
            <p >Ziua: {ziua}</p>
            <p>Ești sigur de alegerile făcute?</p>
            <div>
              <Button variant="secondary" onClick={handleCloseModal} style={{ marginRight: '10px' }}> Înapoi</Button>
              <Button  variant="primary" onClick={handleConfirm}> Confirmă </Button>
            </div>
       </div>
)}  
        </Form>
      </Container>
      </motion.div>
    </div>
  );
};

export default MakeaPlan;