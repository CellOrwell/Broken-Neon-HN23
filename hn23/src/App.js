import React, { useState, useEffect } from 'react';
import './index.css';
import useSound from 'use-sound';
import rainSound from './rain.mp3';
import carSound from './carArriving.mp3';
import doorSound from './doorSlam.mp3';
import footstepsSound from './footsteps.mp3';
import snakeGame from './Snake.jsx';

const displaySnake = 1;

function typingEffect(recievedText, delay) {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;

    if (isTyping) {
      const timer = setInterval(() => {
        if (currentIndex < recievedText.length) {
          setText(recievedText.slice(0, currentIndex + 1));
          currentIndex++;
        }
        else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, delay);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isTyping, recievedText, delay]);

  return (
    { text, isTyping }
  );
}

function TypingEffectComponent({ initialText }) {
  const { text, isTyping } = typingEffect(initialText, 40);
  return (
    <div>
      {text}
    </div>
  );
}

function App() {

  const [string, setString] = useState('');

  const updateString = (event) => {
    setString(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();  //Prevents page from refreshing
    // processResponse(string);
    setString('');
  }

  const [playRain] = useSound(rainSound);
  const [playCar] = useSound(carSound);
  const [playDoor] = useSound(doorSound);
  const [playFootsteps] = useSound(footstepsSound);

  const [soundIndex, setSoundIndex] = useState(1);


  const handleInputClick = () => {
    switch (soundIndex) {
      case 1:
        playRain();
        break;
      case 2:
        playCar();
        break;
      case 3:
        playDoor();
        break;
      case 4:
        playFootsteps();
        break;
      default:
        break;
    }

    setSoundIndex(soundIndex + 1);
  };

  const [isGlitching, setIsGlitching] = useState(false);

 
  const applyGlitchEffect = (event) => {
    event.preventDefault(); // Prevents the default behavior (e.g., page refreshing)

    document.body.classList.add('glitch-effect');
    setIsGlitching(true);

    setTimeout(() => {
      document.body.classList.remove('glitch-effect');
      setIsGlitching(false);
    }, 5000);
  };

  return (
    <div>
      <header>

        <h1 style={{ margin: 'auto' }}>HackNotts '23 </h1>
      </header>

      <main>
        <section className="terminalSection" style={{ marginTop: '50px' }}>
          <div className="computerScreen">
            <div className="buttonScreen" style={{ marginTop: '30px' }}>

              <div className="terminal" style={{ marginTop: '20px' }}>
              {snakeGame()};
                {displaySnake ? (
                <TypingEffectComponent initialText={snakeGame()}></TypingEffectComponent> // Render SnakeGame if displaySnake is true
                ) : (
                <TypingEffectComponent initialText="You find yourself in a dimly illuminated parking lot, rain pouring down as you peer through the car's window.
                ">
                </TypingEffectComponent>
                )}
              </div>


              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    style={{ fontSize: 14 }}
                    className="inputBar"
                    type='text'
                    onChange={(event) => updateString(event)}
                    onClick={handleInputClick}

                    placeholder='|'
                  />
                  <button type="submit" style={{ display: 'none' }}>Submit</button>
                </form>

                {/* {isGlitching ? (
                  <div>
                    {}
                  </div>
                ) : (
                  <div>
                    {}
                    <button onClick={applyGlitchEffect}>Apply Glitch Effect</button>
                  </div>
                )} */}

              </div>

            </div>
            <div className="computerLine"></div>
          </div>

        </section>
      </main>
    </div>
  )
}

export default App;