import { createRoot } from 'react-dom/client';
import App from './App';
import { ToolContextProvider } from './contexts/ToolContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ToolContextProvider>
    <App />
  </ToolContextProvider>
);
