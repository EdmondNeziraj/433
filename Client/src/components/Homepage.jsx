import React, { useEffect } from 'react';
import '../styles/Homepage.css';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';


const Homepage = () => {

  useEffect( () => {
    axios.get('/home')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  })

  return (
    <div className="App">
      <header className="App-header">
        This is going to be the homepage, yep
      </header>
    </div>
  );
}

export default Homepage;
