import React, { createContext, useContext, useState } from 'react';

interface IToolContext {
  showExtraSorters: boolean;
  setShowExtraSorters: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolContext = createContext<IToolContext | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

function ToolContextProvider({ children }: ProviderProps) {
  const [showExtraSorters, setShowExtraSorters] = useState(false);
  return (
    <ToolContext.Provider value={{ showExtraSorters, setShowExtraSorters }}>
      {children}
    </ToolContext.Provider>
  );
}

function useTools() {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolContextProvider');
  }
  return context;
}

export { ToolContextProvider, useTools };
