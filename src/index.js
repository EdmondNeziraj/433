import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Match from './components/Match'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <Match />
    <Match />
    <App />
    <Footer />
  </React.StrictMode>
);

