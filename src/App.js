import React, { useEffect, useState, useRef, useCallback } from 'react';
import Footer from './components/Footer';
import SortTools from './components/SortTools';
import RemoveTools from './components/RemoveTools';
import PlayTools from './components/PlayTools';
import ToolTabs from './components/ToolTabs';
import ActiveTools from './components/ActiveTools';
import GenerateTools from './components/GenerateTools';
import examples from './examples';
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
  const [rawText, setRawText] = useState('');
  const [selectedExample, setSelectedExample] = useState('0');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('sort');
  const [snack, setSnack] = useState(null);

  const exampleRef = useRef();
  const tabsRef = useRef();
  const interval = useRef();

  useEffect(() => {
    if (output) {
      window.scrollTo({
        top: tabsRef.current.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  }, [output]);

  const changeActiveTab = newTab => {
    setActiveTab(newTab);
    setOutput(null);
  };

  const insertExampleText = () => {
    if (selectedExample === 'output') {
      setRawText(output);
    } else {
      setRawText(examples[selectedExample].content);
    }
    window.scrollTo({
      top: exampleRef.current.offsetTop - 20,
      behavior: 'smooth',
    });
  };

  const setOutputWith = useCallback(operator => setOutput(operator(rawText)), [
    rawText,
  ]);

  const showSnack = text => {
    setSnack(text);
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(() => {
      setSnack(null);
    }, 3000);
  };

  const handleClipboardCopy = () => {
    navigator.clipboard.writeText(output);
    showSnack('kohdeteksti kopioitu leikepöydälle');
  };

  return (
    <>
      <div className="main-content">
        <div className="title-area">
          <h1 className="maintitle">RUUMENA</h1>
          <div className="subtitle">
            ~ työkalu menetelmällisiin tekstikokeiluihin ~
          </div>
        </div>

        <div className="example-area" ref={exampleRef}>
          <select
            id="example"
            className="example-select"
            onChange={e => setSelectedExample(e.target.value)}
          >
            {examples.map(({ title }, index) => (
              <option key={title} value={index}>
                {title}
              </option>
            ))}
            {!!output && (
              <option key="output" value="output">
                KOHDETEKSTI (&quot;{output.substring(0, 32)}...&quot;)
              </option>
            )}
          </select>
          <button type="button" onClick={insertExampleText}>
            käytä lähdetekstinä
          </button>
          <button
            type="button"
            className="no-border"
            onClick={() => setRawText('')}
            disabled={!rawText}
          >
            tyhjennä
          </button>
        </div>
        <textarea
          className="editor"
          value={rawText}
          spellCheck="false"
          rows="12"
          onChange={event => setRawText(event.target.value)}
          placeholder="Liitä lähdeteksti tähän tai valitse esimerkkiteksti yltä. Käsittele sitä alta löytyvillä työkaluilla."
        />

        <div className="tab-wrapper" ref={tabsRef}>
          <ToolTabs activeTab={activeTab} changeActiveTab={changeActiveTab} />
        </div>

        <div className="output-area-wrapper">
          <ActiveTools
            component={getActiveToolsComponent(activeTab)}
            setOutputWith={setOutputWith}
          />

          <div className="output-area" aria-live="polite">
            {output}
          </div>
          {!!output && (
            <div className="button-wrapper">
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
      </div>

      <Footer />
    </>
  );
}

export default App;
