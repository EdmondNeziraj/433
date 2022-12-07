import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import Homepage from './components/Homepage';
import Hostpage from './components/Hostpage';
import Matchespage from './components/Matchespage';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/home' render={ () => <Homepage/>} />
        {/* <Route path='/host' component={Hostpage} />
        <Route path='/matches' component={Matchespage} /> */}
      </Routes>
    </div>

    // <div className="App">
    //       <header className="App-header">
    //           This is going to be the hostpage
    //       </header>
    //   </div>
  );
}

export default App;