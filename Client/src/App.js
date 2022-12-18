import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom"
import Home from './pages/Home';
import HostMatch from './pages/HostMatch';
import Matches from './pages/Matches';
import MatchDetail from './pages/MatchDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EditMatch from './pages/EditMatch';
import { useMatchesContext } from './hooks/useMatchesContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const { matches, dispatch } = useMatchesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch('http://localhost:5000/matches', {
        // headers: {
        //   'Authorization': `Bearer ${user.token}`
        // }
      })
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_MATCHES', payload: json })
      }
    }

    // if (user) {
      fetchMatches();
    // }
  }, [dispatch, user]);

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/matches' element={<Matches matches={matches} /> }/>
          <Route path='/host' element={user ? <HostMatch /> : <Navigate to='/login' />} />
          <Route path="/matches/:id" element={<MatchDetail matches={matches} /> } />
          <Route path="/matches/:id/edit" element={<EditMatch matches={matches} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;