import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login/Login'
import Home from './components/Home/Home';


function App() {
  return (

      <div className="App">
      <ToastContainer position='top-right'></ToastContainer>
      <Router>
       <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
      </div>
   
  );
}

export default App;
