import React, { useState,useEffect  } from 'react';
import Navbar from './Navbar';
import {Button,Table} from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import getAxiosInstance from "../axios.service";
import { AnimatePresence, motion } from "framer-motion";

export const YourPlans = () => {
  const [planificari, setPlanificari] = useState([]);
    
  
  const token = localStorage.getItem('user');
    const decoded = jwt_decode(token);
    const userId = decoded.sub;
 const planificariList= ()=>{  getAxiosInstance().get(`/schedules/ceva/${userId}`)
    .then(response => {
      const data = response.data;
     
      setPlanificari(data);//actualizare state planificari cu noua lista de planificari prin apelul functiei setPlanificari(data)
    })
    .catch(error => console.log(error));
  }

    useEffect(() => {
      planificariList();
  }, []);

  const handleDelete = async (event) => {
    const planificare = planificari[event.target.value];
    const token = localStorage.getItem('user');
    const decoded = jwt_decode(token);
    const userId = decoded.sub;
     await getAxiosInstance().delete(
      `/schedules/${userId}/${planificare.dataInceput}/${planificare.oraInceput}/${planificare.oraSfarsit}`
    )
    .then(response => {
      planificariList(); // se actualizeaza lista de planificari dupa stergere
    })
    .catch(error => console.log(error));
   
  };

    return (
        <div className="sidebar-container your-plans " >
            <Navbar/>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
            <h1>Planificările dumneavoastră</h1>
    <div className='container ' style={{ overflowY: 'auto', maxHeight: '80vh',scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}> {/*scroll pt tabel in caz ca depaseste dimensiunea paginii*/}
     <Table striped bordered hover size="sm" >
      <thead>
        <tr>
          <th>#</th>
          <th >Denumire eveniment</th>
          <th>Ziua</th>
          <th>Ora începerii</th>
          <th>Ora încheierii</th>
          <th>Număr participanți</th>
          <th>Sală</th>
          <th>Șterge planificare</th>
        </tr>
      </thead>
      <tbody>
           {planificari.map((planificare, index) => (
        <tr>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{index + 1}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{planificare.eveniment.denumire}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{planificare.dataInceput}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{planificare.oraInceput}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{planificare.oraSfarsit}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{planificare.eveniment.numarParticipanti}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{planificare.sala}</td>
          <td>
          <Button className="btn btn-danger" value={index} onClick={handleDelete}>Anulează</Button>
          </td>
        </tr>
         ))}
      </tbody>
    </Table>
    </div>
    </motion.div>
        </div>
      );
  };
  
  export default  YourPlans;
    