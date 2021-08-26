import React from 'react';

const Footer: React.FC = () => (
  <footer className="page-footer">
    <p>Teemu T. Tuovinen 2019-2021</p>
    <p>
      <a
        href="https://github.com/ttuovinen/ruumena"
        target="_blank"
        rel="noopener noreferrer"
      >
        git
      </a>
      {' | '}
      <a href="https://nokturno.fi" target="_blank" rel="noopener noreferrer">
        nokturno.fi
      </a>
    </p>
  </footer>
);

export default Footer;