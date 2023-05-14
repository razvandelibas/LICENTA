import AdminNavbar from "./AdminNavbar";
import React, { useState,useEffect  } from 'react';
import getAxiosInstance from "../axios.service";
import {Table} from 'react-bootstrap';
import { AnimatePresence, motion } from "framer-motion";


export const VizualizarePrioritati = () => {
    const [prioritati, setPrioritati] = useState([]);
    const [message, setMessage] = useState('');

    const prioritatiList=()=>{ getAxiosInstance().get("/schedules/afisarePrioritati/all")
        .then(response => {
            const data = response.data;   
            setPrioritati(data);
        })
        .catch(error => {
            setMessage('Ceva nu a mers!');
          });

    }

    useEffect(() => {
        prioritatiList();
    }, []);

    return (
        <div className="sidebar-container">
            <AdminNavbar/>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
            <h1>Politicile Instituției</h1>
            <div className='container ' style={{ overflowY: 'auto', maxHeight: '80vh',scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}> {/*scroll pt tabel in caz ca depaseste dimensiunea paginii*/}
     <Table striped bordered hover size="sm" >
      <thead>
        <tr>
          <th>#</th>
          <th >Denumire</th>
          <th>Nivel de prioritate</th>
          
        </tr>
      </thead>
      <tbody>
           {prioritati.map((prioritate, index) => (
        <tr>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{index + 1}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{prioritate.denumire}</td>
          <td className="margin-10px-top font-size14" style={{ verticalAlign: "middle", textAlign: "center" }}>{prioritate.prioritate}</td>
         
        </tr>
         ))}
      </tbody>
    </Table>
    </div>
    </motion.div>
        </div>
    );

};

export default  VizualizarePrioritati;