import { useState, useEffect } from 'react';
import 'normalize.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css'

function App() {

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Este es el error:", error));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Otras páginas */}
      </Routes>
    </Router>
  );
}

export default App
