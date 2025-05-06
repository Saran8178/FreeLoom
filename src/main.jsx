import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SavedJobsProvider } from './Lancer/SavedJobsContext'; // Wrap it here instead

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SavedJobsProvider>
        <App />
      </SavedJobsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
