import React, { useEffect, useState, useRef } from 'react';
import Footer from './components/Footer';
import SortTools from './components/SortTools';
import RemoveTools from './components/RemoveTools';
import PlayTools from './components/PlayTools';
import ToolTabs from './components/ToolTabs';
import ActiveTools from './components/ActiveTools';
import GenerateTools from './components/GenerateTools';
import { exampleText } from './example';
import './App.css';

const getActiveToolsComponent = activeTab => {
  switch (activeTab) {
    case 'sort':
      return SortTools;
    case 'remove':
      return RemoveTools;
    case 'generate':
      return GenerateTools;
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
  const [snack, setSnack] = useState(null);

  const scrollRef = useRef();
  const interval = useRef();

  useEffect(() => {
    if (output) {
      window.scrollTo({
        top: scrollRef.current.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  }, [output]);

  const setOutputWith = operator => setOutput(operator(rawText));

  const showSnack = text => {
    setSnack(text);
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(() => {
      setSnack(null);
    }, 2500);
    console.log(interval.current);
  };

  const handleClipboardCopy = () => {
    navigator.clipboard.writeText(output);
    showSnack('kopioitu leikepöydälle');
  };

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
        {!!output && (
          <div className="button-wrapper">
            {/* <button type="button" onClick={() => setRawText(output)}>
              laita boksiin
            </button> */}
            <button type="button" onClick={handleClipboardCopy}>
              kopioi leikepöydälle
            </button>
            {!!snack && (
              <div className="snack" key={interval}>
                {snack}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;
