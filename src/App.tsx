import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './App.css';
import ActiveTools from './components/ActiveTools';
import DarkModeSwitch from './components/DarkModeSwitch';
import Footer from './components/Footer';
import ToolTabs from './components/ToolTabs';
import { NO_INPUT, UNITS } from './constants';
import examples from './examples';
import { TabOptions, UnitOptions } from './types/types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedExample, setSelectedExample] = useState('0');
  const [activeTab, setActiveTab] = useState<TabOptions>('sort');
  const [unit, setUnit] = useState<UnitOptions>('word');
  const [snack, setSnack] = useState('');

  const exampleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  let timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    if (outputText && outputText !== NO_INPUT && tabsRef?.current) {
      window.scrollTo({
        top: tabsRef.current.offsetTop - 20,
      });
    }
  }, [outputText]);

  // Show warning if selected unit is not reasonable for input text
  const unitWarning = useMemo(() => {
    if (!inputText || unit === 'word') {
      return null;
    }
    const linebreakRatio = inputText.split('\n').length / inputText.length;
    if (linebreakRatio > 0.02 && unit === 'sentence') {
      return 'toimii parhaiten kertovan/asiatekstin kanssa';
    }
    if (linebreakRatio < 0.012 && unit === 'line') {
      return 'toimii parhaiten runomuotoisen tekstin kanssa';
    }
    return null;
  }, [inputText, unit]);

  const changeActiveTab = (newTab: TabOptions) => {
    setActiveTab(newTab);
    setOutputText('');
  };

  const insertExampleText = () => {
    setInputText(
      selectedExample === 'output'
        ? outputText
        : examples[+selectedExample].content
    );
    if (exampleRef?.current) {
      window.scrollTo({
        top: exampleRef.current.offsetTop - 20,
      });
    }
  };

  const setOutputWith = useCallback(
    (operator: (seed: string) => string) => {
      setOutputText(inputText ? operator(inputText) : NO_INPUT);
    },
    [inputText]
  );

  const showSnack = (text: string) => {
    setSnack(text);
    const id = setTimeout(() => {
      setSnack('');
    }, 3000);
    timeoutRef.current = id;
  };

  const handleClipboardCopy = () => {
    navigator.clipboard.writeText(`${outputText}`);
    showSnack('kohdeteksti kopioitu leikepöydälle');
  };

  const handlePutOutputToInput = () => {
    setInputText(outputText);
    showSnack('kohdeteksti kopioitu lähdetekstiksi');
    if (exampleRef?.current) {
      window.scrollTo({
        top: exampleRef.current.offsetTop - 20,
      });
    }
  };

  return (
    <>
      <DarkModeSwitch />
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
            {!!outputText &&
              typeof outputText === 'string' &&
              outputText !== NO_INPUT && (
                <option key="output" value="output">
                  KOHDETEKSTI (&quot;{outputText.substring(0, 32)}...&quot;)
                </option>
              )}
          </select>
          <button type="button" onClick={insertExampleText}>
            käytä lähdetekstinä
          </button>
          <button
            type="button"
            className="no-border"
            onClick={() => setInputText('')}
            disabled={!inputText}
          >
            tyhjennä
          </button>
        </div>
        <textarea
          className="editor"
          value={inputText}
          spellCheck="false"
          rows={12}
          onChange={(event) => setInputText(event.target.value)}
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
                onChange={(event) => setUnit(event.target.value as UnitOptions)}
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
            {outputText}
          </div>
          {outputText && outputText !== NO_INPUT && (
            <div className="button-wrapper">
              <button type="button" onClick={handleClipboardCopy}>
                kopioi leikepöydälle
              </button>
              <button type="button" onClick={handlePutOutputToInput}>
                kopioi lähdetekstiksi
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
};

export default App;
