import React, { useEffect } from 'react';
// import './App.css';
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom"
import HostMatch from './pages/HostMatch';
import Matches from './pages/Matches';
import MatchDetail from './pages/MatchDetail';
import EditMatch from './pages/EditMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useMatchesContext } from './hooks/useMatchesContext';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const { matches, dispatch } = useMatchesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch('http://localhost:5000/matches')
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_MATCHES', payload: json })
      }
    }

    fetchMatches();
  }, []);

  console.log(matches);

  return (
    <div className='app-body'>
      <Router>
        <Routes>
          <Route exact path='/' element={user ? <Matches matches={matches} /> : <Login/>} />
          <Route path='/matches' element={<Matches matches={matches} />} />
          <Route path='/host' element={user ? <HostMatch /> : <Login error={'You must be logged in to host a match!'} />} />
          <Route path="/matches/:id" element={<MatchDetail matches={matches} />} />
          <Route path="/matches/:id/edit" element={<EditMatch matches={matches} />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/matches' />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/matches' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;