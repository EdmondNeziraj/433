import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import Homepage from './components/Homepage';
import Hostpage from './components/Hostpage';
import Matchespage from './components/Matchespage';


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/home' element={<Homepage/>} />
          <Route path='/matches' element={<Matchespage/>} />
          <Route path='/host' element={<Hostpage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;