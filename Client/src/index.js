import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MatchesContextProvider } from './context/MatchesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MatchesContextProvider>
      <App />
    </MatchesContextProvider>
  </React.StrictMode>
);

