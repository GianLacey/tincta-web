import { useState, useEffect } from 'react';
import 'normalize.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // 👈 CAMBIADO A HashRouter
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import './App.css'


function App() {
 

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        {/* Otras páginas */}
      </Routes>
    </Router>
  );
}

export default App;