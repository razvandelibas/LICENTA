import AdminNavbar from "./AdminNavbar";
import React, { useState,useEffect  } from 'react';
import {Button,Table} from 'react-bootstrap';
import getAxiosInstance from "../axios.service";
import { AnimatePresence, motion } from "framer-motion";


export const VizualizareSali = () => {
    const [sali, setSali] = useState([]);
    const [message, setMessage] = useState('');
    const [isActive, setIsActive]=useState(true);

    const saliList=()=>{ getAxiosInstance().get("/schedules")
    .then(response => {
      const data = response.data;
     
      setSali(data);
    })
    .catch(error => {
        setMessage('Ceva nu a mers!');
      });

      
    }
    
    useEffect(() => {
        saliList();
    }, []);

    
    const handleUpdate = async(event)=>{
        const sala=sali[event.target.value];

        if(sala.isActive)
        {
            setIsActive(false);
        }
        else{
            setIsActive(true);
        }

        await getAxiosInstance().put(`/schedules/${sala.id}/updateIsActive`,{
            'isActive':isActive
        })
        .then(response => {
            saliList();
        })
        .catch(error => {
            setMessage('Ceva nu a mers!');
          });
    }

    return (
        <div className="sidebar-container">
            <AdminNavbar/>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
            <h1>Sălile instituției</h1>
            <div className='container ' style={{ overflowY: 'auto', maxHeight: '80vh',scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}> {/*scroll pt tabel in caz ca depaseste dimensiunea paginii*/}
     <Table striped bordered hover size="sm" >
      <thead>
        <tr>
          <th>#</th>
          <th >Denumirea sălii</th>
          <th>Capacitate</th>
          <th>Tipul sălii</th>
          <th>Stare</th>
          <th>Modifică starea sălii</th>
        </tr>
      </thead>
      <tbody>
           {sali.map((sala, index) => (
        <tr>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{index + 1}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{sala.denumire}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{sala.capacitate}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{sala.capacitate > 25 ? 'Curs' : 'Laborator'}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{sala.isActive ? 'Activă' : 'Inactivă'}</td>
          <td>
          <Button className="btn btn-danger" value={index} onClick={handleUpdate} >Modifică</Button>
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

export default  VizualizareSali;