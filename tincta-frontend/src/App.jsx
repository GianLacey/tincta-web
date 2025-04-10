import { useState, useEffect } from 'react';
import 'normalize.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // 👈 CAMBIADO A HashRouter
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import './App.css'
import Contacto from './pages/Contact';


function App() {
  useEffect(() => {
    fetch("/tincta-web/tincta-frontend/data/artwork.js") // 👈 MODIFICÁ ESTA URL SEGÚN TU REPO O ELIMINÁ SI NO ES NECESARIO
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Este es el error:", error));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path='/Contact' element={<Contacto />}/>
        {/* Otras páginas */}
      </Routes>
    </Router>
  );
}

export default App;