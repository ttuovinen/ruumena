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
import { SetOutputFunction, TabOptions, Unit } from './types/types';
import { isLookbehindSupported } from './utils/metaUtils';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState<string | React.ReactNode>('');
  const [selectedExample, setSelectedExample] = useState('0');
  const [activeTab, setActiveTab] = useState<TabOptions>(TabOptions.sort);
  const [unit, setUnit] = useState<Unit>(Unit.word);
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
    if (!inputText || unit === Unit.word) {
      return null;
    }
    const linebreakRatio = inputText.split('\n').length / inputText.length;
    if (linebreakRatio > 0.02 && unit === Unit.sentence) {
      return 'toimii parhaiten kertovan/asiatekstin kanssa';
    }
    if (linebreakRatio < 0.012 && unit === Unit.line) {
      return 'toimii parhaiten runomuotoisen tekstin kanssa';
    }
    if (unit === Unit.sentence && !isLookbehindSupported()) {
      return 'lauseisiin jakaminen ei täysin toimi tässä selaimessa';
    }
    return null;
  }, [inputText, unit]);

  const changeActiveTab = (newTab: TabOptions) => {
    setActiveTab(newTab);
    setOutputText('');
  };

  const changeUnit = (newUnit: Unit) => {
    setUnit(newUnit);
    setOutputText('');
  };

  const insertExampleText = () => {
    setInputText(
      selectedExample === 'output'
        ? (outputText as string)
        : examples[+selectedExample].content
    );
    setOutputText('');
    if (exampleRef?.current) {
      window.scrollTo({
        top: exampleRef.current.offsetTop - 20,
      });
    }
  };

  const setOutputWith: SetOutputFunction = useCallback(
    (operator) => {
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
    setInputText(outputText as string);
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

        <div className="example-area flex-row" ref={exampleRef}>
          <select
            id="example"
            className="example-select"
            onChange={(event) => setSelectedExample(event.target.value)}
            aria-label="valitse esimerkkiteksti"
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
              <div className=" flex-row justify-center">
                Jaa lähdeteksti
                <select
                  className="unit-select"
                  value={unit}
                  onChange={(event) => changeUnit(event.target.value as Unit)}
                  aria-label="valitse yksikkö"
                >
                  {UNITS.map(({ key, pluralIllative: label }) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                ja
              </div>
              {!!unitWarning && (
                <div className="unit-warning text-center">({unitWarning})</div>
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
          {!['statistics'].includes(activeTab) &&
            outputText &&
            outputText !== NO_INPUT && (
              <div className="flex-row justify-center">
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
