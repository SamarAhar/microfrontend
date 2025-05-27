import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import React from 'react';
import App from './App.jsx'
// import { ApolloProvider } from '@apollo/client';
// import client from './apolloClient';

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <App />
  </StrictMode>
)
