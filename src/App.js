import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import Footer from './components/Footer';
import ToolTabs from './components/ToolTabs';
import ActiveTools from './components/ActiveTools';
import examples from './examples';
import './App.css';
import { NO_INPUT, UNITS } from './constants';

function App() {
  const [rawText, setRawText] = useState('');
  const [selectedExample, setSelectedExample] = useState('0');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('sort');
  const [unit, setUnit] = useState('word');
  const [snack, setSnack] = useState(null);

  const exampleRef = useRef();
  const tabsRef = useRef();
  let timeout = useRef();

  useEffect(() => {
    if (output && output !== NO_INPUT) {
      window.scrollTo({
        top: tabsRef.current.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  }, [output]);

  // Show warning if selected unit is not reasonable for input text
  const unitWarning = useMemo(() => {
    if (!rawText || unit === 'word') {
      return null;
    }
    const linebreakRatio = rawText.split('\n').length / rawText.length;
    if (linebreakRatio > 0.01 && unit === 'sentence') {
      return 'toimii parhaiten kertovan/asiatekstin kanssa';
    }
    if (linebreakRatio < 0.005 && unit === 'line') {
      return 'toimii parhaiten runomuotoisen tekstin kanssa';
    }
    return null;
  }, [rawText, unit]);

  const changeActiveTab = (newTab) => {
    setActiveTab(newTab);
    setOutput(null);
  };

  const insertExampleText = () => {
    setRawText(
      selectedExample === 'output' ? output : examples[selectedExample].content
    );
    window.scrollTo({
      top: exampleRef.current.offsetTop - 20,
      behavior: 'smooth',
    });
  };

  const setOutputWith = useCallback(
    (operator) => {
      setOutput(rawText ? operator(rawText) : NO_INPUT);
    },
    [rawText]
  );

  const showSnack = (text) => {
    setSnack(text);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSnack(null);
    }, 2000);
  };

  const handleClipboardCopy = () => {
    navigator.clipboard.writeText(output);
    showSnack('kohdeteksti kopioitu leikepöydälle');
  };

  return (
    <>
      <main className="main-content">
        <header className="title-area">
          <h1 className="maintitle">RUUMENA</h1>
          <div className="subtitle">
            ~ työkalu menetelmällisiin tekstikokeiluihin ~
          </div>
        </header>

        <div className="example-area" ref={exampleRef}>
          <select
            id="example"
            className="example-select"
            onChange={(event) => setSelectedExample(event.target.value)}
          >
            {examples.map(({ title }, index) => (
              <option key={title} value={index}>
                {title}
              </option>
            ))}
            {!!output && typeof output === 'string' && (
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
          onChange={(event) => setRawText(event.target.value)}
          placeholder="Liitä lähdeteksti tähän tai valitse esimerkkiteksti yltä. Käsittele sitä alta löytyvillä työkaluilla."
        />

        <div className="tab-wrapper" ref={tabsRef}>
          <ToolTabs activeTab={activeTab} changeActiveTab={changeActiveTab} />
        </div>

        <div className="output-area-wrapper">
          {/* Unit selector */}
          {['sort', 'remove'].includes(activeTab) && (
            <div className="unit-selector-wrapper">
              Jaa lähdeteksti&nbsp;
              <select
                className="unit-select"
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
              >
                {UNITS.map(({ key, pluralIllative: label }) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              &nbsp;ja
              {!!unitWarning && (
                <div className="unit-warning">({unitWarning})</div>
              )}
            </div>
          )}

          <ActiveTools
            activeTab={activeTab}
            unit={unit}
            setOutputWith={setOutputWith}
          />
          <div className="output-area" aria-live="polite">
            {output}
          </div>
          {output && output !== NO_INPUT && (
            <div className="button-wrapper">
              <button type="button" onClick={handleClipboardCopy}>
                kopioi leikepöydälle
              </button>
              {!!snack && (
                <div className="snack" aria-live="assertive">
                  {snack}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
