import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import Homepage from './components/Homepage';
import Hostpage from './components/Hostpage';
import Matchespage from './components/Matchespage';
import MatchDetail from './components/MatchDetail';
import NewMatch from './components/NewMatch';


function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/home' element={<Homepage/>} />
          <Route path='/matches' element={<Matchespage/>} />
          <Route path='/host' element={<Hostpage/>} />
          <Route path={'/matches/6390d443a1442e54c59c5812'} element={<MatchDetail/>} />
          <Route path='/matches/new' element={<NewMatch/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;