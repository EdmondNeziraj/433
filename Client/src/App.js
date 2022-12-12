import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import Homepage from './pages/Homepage';
import Hostpage from './pages/Hostpage';
import Matchespage from './pages/Matchespage';
import MatchDetail from './pages/MatchDetail';
import NewMatch from './pages/NewMatch';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {

  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/home' element={<Homepage/>} />
          <Route path='/matches' element={<Matchespage/>} />
          <Route path='/host' element={<Hostpage/>} />
          <Route path={'/matches/6390d443a1442e54c59c5812'} element={<MatchDetail/>} />
          <Route path='/matches/new' element={<NewMatch/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;