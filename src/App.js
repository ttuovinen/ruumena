import React, { useEffect, useState, useRef } from 'react';
import Footer from './components/Footer';
import SortTools from './components/SortTools';
import RemoveTools from './components/RemoveTools';
import PlayTools from './components/PlayTools';
import ToolTabs from './components/ToolTabs';
import ActiveTools from './components/ActiveTools';
import { exampleText } from './example';
import './App.css';

const getActiveToolsComponent = activeTab => {
  switch (activeTab) {
    case 'sort':
      return SortTools;
    case 'remove':
      return RemoveTools;
    case 'play':
      return PlayTools;
    default:
      return null;
  }
};

function App() {
  const [rawText, setRawText] = useState(exampleText);
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('sort');

  const scrollRef = useRef();

  useEffect(() => {
    if (output) {
      window.scrollTo({
        top: scrollRef.current.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  }, [output]);

  const setOutputWith = operator => setOutput(operator(rawText));

  return (
    <>
      <div className="main-content">
        <h1>RUUMENA</h1>
        <textarea
          className="editor"
          value={rawText}
          spellCheck="false"
          rows="12"
          onChange={event => setRawText(event.target.value)}
        />

        <div className="tab-wrapper" ref={scrollRef}>
          <ToolTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <ActiveTools
          component={getActiveToolsComponent(activeTab)}
          setOutputWith={setOutputWith}
        />

        <div className="output-area" aria-live="polite">
          {output}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
