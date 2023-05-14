import React, { useState,useEffect } from 'react';
import Navbar from './Navbar';
import {Button,Table,Container} from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import getAxiosInstance from "../axios.service";
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



export const Schedule = () => {
    const [planificari, setPlanificari] = useState([]);
    
    
    //functie pentru descarcarea orarului in format pdf
    const printDocument = () => {
      const input = document.getElementById('mySchedule');
      html2canvas(input)
          .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF({
                  orientation: 'landscape',
                  unit: 'mm',
                  format: 'a4'
              });
  
              const imgProps= pdf.getImageProperties(imgData);
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();
              const imgWidth = imgProps.width;
              const imgHeight = imgProps.height;
              const ratio = imgWidth / imgHeight;
  
              let width, height;
              if (imgWidth > imgHeight) {
                  width = pdfWidth;
                  height = pdfWidth / ratio;
              } else {
                  height = pdfHeight;
                  width = pdfHeight * ratio;
              }
  
              const marginX = (pdfWidth - width) / 2;
              const marginY = (pdfHeight - height) / 2;
  
              pdf.addImage(imgData, 'PNG', marginX, marginY, width, height);
              pdf.save('schedule.pdf');
          });
  }
  
  
  
  


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

    const planificariPerZi = (ziua) => {
        return planificari.filter((planificare) => planificare.dataInceput === ziua).sort((a, b) => a.oraInceput-b.oraInceput);
      };

      const numarMaximEvenimente = Math.max(...["luni", "marti", "miercuri", "joi", "vineri"].map((zi) => planificariPerZi(zi).length));//caut ziua cu cele mai multe evenimente si numarul acestora
    return (
      <div className="sidebar-container schedulee">
        <Navbar />
        <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
        <Container >
          <div className="timetable-img text-center"></div>
          <div id="mySchedule" className="table-responsive" style={{ marginTop: "5%" }}>
          <div className="table-responsive" style={{ marginBottom: "0%" }}>
            <Table style={{ marginTop: "-2%" }} bordered hover className="table-bordered">
            <thead></thead>
                 
              <tbody>
              
       
    
                <tr >  
                <th className="text-uppercase" style={{ verticalAlign: "middle", textAlign: "center" }}>Luni</th>
                <td>    
                
                {[...planificariPerZi("luni").map((planificare) => (
                    
                   <td >                   
                    
                   <span style={{ display: "inline-block", margin:"5px" }} class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{planificare.eveniment.denumire}</span>
                   <div style={{ textAlign: "center", margin:"5px"}} class="margin-10px-top font-size14">{planificare.oraInceput}-{planificare.oraSfarsit}</div>
                   <div style={{ textAlign: "center", margin:"5px"}} class="font-size13 text-light-gray">{planificare.sala}</div>
                   
                   </td>
                   
                    )), ...Array(numarMaximEvenimente - planificariPerZi("luni").length).fill(<td></td>)]} {/*am generat un array de celule goale cu Array.fill() pentru a umple spatiul gol in zilele in care sunt mai putine evenimente.
                    Operatorul de spread în JavaScript este reprezentat prin simbolul ... si este folosit pentru a extinde un element iterabil (precum un array sau un obiect) intr-un alt element.*/}
                </td>
                </tr> 

                  <tr >
                  <th className="text-uppercase" style={{ verticalAlign: "middle", textAlign: "center" }}>Marți</th>
                <td >
                {[...planificariPerZi("marti").map((planificare) => (
                     
                    <td >
                      
                    <span  style={{ display: "inline-block", margin:"5px" }} class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{planificare.eveniment.denumire}</span>
                    <div style={{ textAlign: "center", margin:"5px"}} class="margin-10px-top font-size14">{planificare.oraInceput}-{planificare.oraSfarsit}</div>
                    <div style={{ textAlign: "center",margin:"5px" }} class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{planificare.sala}</div>
                    
                    </td>
                   
                    )), ...Array(numarMaximEvenimente - planificariPerZi("marti").length).fill(<td></td>)]}
                </td>
                </tr>

                  <tr>
                  <th className="text-uppercase" style={{ verticalAlign: "middle", textAlign: "center" }}>Miercuri</th>
                <td >
                {[...planificariPerZi("miercuri").map((planificare) => (
                   
                   <td >
                   <span style={{ display: "inline-block", margin:"5px" }} class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{planificare.eveniment.denumire}</span>
                   <div style={{ textAlign: "center", margin:"5px"}} class="margin-10px-top font-size14">{planificare.oraInceput}-{planificare.oraSfarsit}</div>
                   <div style={{ textAlign: "center", margin:"5px"}} class="font-size13 text-light-gray">{planificare.sala}</div>
                   </td>
                   
                    )), ...Array(numarMaximEvenimente - planificariPerZi("miercuri").length).fill(<td></td>)]}
                   
                </td>
                </tr>

                <tr>
                <th className="text-uppercase " style={{ verticalAlign: "middle", textAlign: "center" }}>Joi</th>
                <td>
                {[...planificariPerZi("joi").map((planificare) => (
                    
                    <td>
                    <span style={{ display: "inline-block", margin:"5px" }} class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{planificare.eveniment.denumire}</span>
                    <div style={{ textAlign: "center", margin:"5px"}} class="margin-10px-top font-size14">{planificare.oraInceput}-{planificare.oraSfarsit}</div>
                    <div style={{ textAlign: "center", margin:"5px"}} class="font-size13 text-light-gray">{planificare.sala}</div>
                    </td>
                    
                    )), ...Array(numarMaximEvenimente - planificariPerZi("joi").length).fill(<td></td>)]}
                </td>
                </tr>
                
                <tr>
                <th className="text-uppercase " style={{ verticalAlign: "middle", textAlign: "center" }}>Vineri</th>
                <td>
                {[...planificariPerZi("vineri").map((planificare) => (
                    
                    <td>
                    <span style={{ display: "inline-block", margin:"5px" }} class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{planificare.eveniment.denumire}</span>
                    <div style={{ textAlign: "center", margin:"5px"}} class="margin-10px-top font-size14">{planificare.oraInceput}-{planificare.oraSfarsit}</div>
                    <div style={{ textAlign: "center", margin:"5px"}} class="font-size13 text-light-gray">{planificare.sala}</div>
                    </td>
                   
                    )), ...Array(numarMaximEvenimente - planificariPerZi("vineri").length).fill(<td></td>)]}
                    
                </td>
                </tr>
             
               
              </tbody>
            </Table>
          </div>
          </div>
        </Container>
          <Button  onClick={printDocument}>Descarcă PDF</Button>
        </motion.div>
      </div>
    );
  };
  
  export default Schedule;
    