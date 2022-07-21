import { useEffect, useState } from 'react';
import Toggler from './Toggler';

function DarkModeSwitch() {
  const [isOn, setIsOn] = useState(false);

  const turnDarkModeOn = () => {
    setIsOn(true);
    document.body.classList.add('dark');
  };

  const turnDarkModeOff = () => {
    setIsOn(false);
    document.body.classList.remove('dark');
  };

  const toggleDarkMode = () => {
    if (isOn) {
      turnDarkModeOff();
    } else {
      turnDarkModeOn();
    }
  };

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (evt) => {
        if (evt.matches) {
          turnDarkModeOn();
        } else {
          turnDarkModeOff();
        }
      });
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      turnDarkModeOn();
    }
  }, []);

  return (
    <header>
      <Toggler
        className="darkmode-switch"
        name="darkmode"
        ariaLabel="vaihda väritila (vaalea/tumma)"
        checked={isOn}
        onChange={toggleDarkMode}
      />
    </header>
  );
}

export default DarkModeSwitch;
