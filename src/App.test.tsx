import { createRoot } from 'react-dom/client';
import App from './App';
import { ToolContextProvider } from './contexts/ToolContext';

it('renders without crashing', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(
    <ToolContextProvider>
      <App />
    </ToolContextProvider>
  );
  root.unmount();
});
