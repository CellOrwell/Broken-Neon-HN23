import React, { useState, useEffect } from 'react';
import './index.css';

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
    processResponse(string);
    setString('');
  }

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
                <TypingEffectComponent initialText="You find yourself in a dimly illuminated parking lot, rain pouring down as you peer through the car's window.
                Recalling your long-standing curiosity about the rarely-visited arcade, you decide to finally explore it for yourself.">
                </TypingEffectComponent>
                <button className="computerButton"></button>
              </div>

              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    style={{ fontSize: 14 }}
                    className="inputBar"
                    type='text'
                    onChange={(event) => updateString(event)}
                    placeholder='|'
                  />
                  <button type="submit" style={{ display: 'none' }}>Submit</button>
                </form>
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
