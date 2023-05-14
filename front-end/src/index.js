import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
/*import reportWebVitals from './reportWebVitals';*/
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
//cu linia dezactivam cache-ul in momentul in care navigam pe pagini deoarece browser-ul poate incarca o copie in cache a paginii web, care inca contine codul vechi(de exemplu cand incercam sa introduc codul de pe emaill si trebuia sa dau refresh la pagina ca sa mearga).
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/*reportWebVitals();*/
