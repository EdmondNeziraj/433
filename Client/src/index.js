import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MatchesContextProvider } from './context/MatchesContext';
import { AuthContextProvider } from './context/AuthContext';
import { MatchContextProvider } from './context/MatchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MatchesContextProvider>
        <MatchContextProvider>
          <App />
        </MatchContextProvider>
      </MatchesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

