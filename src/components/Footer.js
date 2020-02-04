import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="page-footer">
    <p>Ruumena on työkalu menetelmällisiin tekstikokeiluihin</p>
    <p>
      Teemu T. Tuovinen |{' '}
      <a href="https://nokturno.fi" target="_blank" rel="noopener noreferrer">
        nokturno.fi
      </a>{' '}
      | 2019-2020
    </p>
    <p>
      esimerkkiteksti: ote{' '}
      <a
        href="https://www.gutenberg.org/ebooks/56496"
        target="_blank"
        rel="noopener  noreferrer"
      >
        Elias Lönnrotin matkapäiväkirjasta
      </a>
    </p>
    <p>
      <a
        href="https://github.com/ttuovinen/ruumena"
        target="_blank"
        rel="noopener noreferrer"
      >
        git
      </a>
    </p>
  </footer>
);

export default Footer;
