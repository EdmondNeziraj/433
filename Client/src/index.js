import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MatchesContextProvider } from './context/MatchesContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MatchesContextProvider>
        <App />
      </MatchesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

