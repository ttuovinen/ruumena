import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToolContextProvider } from './contexts/ToolContext';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToolContextProvider>
      <App />
    </ToolContextProvider>
  </React.StrictMode>
);
