import React, { useEffect } from 'react';
import '../styles/Homepage.css';
import axios from 'axios';


const Homepage = () => {

  useEffect( () => {
    axios.get('/home')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>This is going to be the homepage</h1>
      </header>
    </div>
  );
}

export default Homepage;
