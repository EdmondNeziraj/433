import React, {useState, useEffect} from 'react';
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
  const [matches, setMatches] = useState([{}]);

  useEffect(() => {
      fetch("http://localhost:5000/matches")
          .then((response) => response.json())
          .then((responseJson) => {
              setMatches(responseJson)
          });
  }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/home' element={<Homepage/>} />
          <Route path='/matches' element={<Matchespage matches={matches} />} />
          <Route path='/host' element={<Hostpage/>} />
          <Route path="/matches/:id" element={<MatchDetail matches={matches}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;