import React, { useState, useEffect } from 'react';
import './index.css';
import useSound from 'use-sound';
import rainSound from './rain.mp3';
import carSound from './carArriving.mp3';
import doorSound from './doorSlam.mp3';
import footstepsSound from './footsteps.mp3';
import snakeGame from './Snake.jsx';

const displaySnake = 1;



function App() {
  const [playRain] = useSound(rainSound);
  const [playCar] = useSound(carSound);
  const [playDoor] = useSound(doorSound);
  const [playFootsteps] = useSound(footstepsSound);

  const [soundIndex, setSoundIndex] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);







  function typingEffect(recievedText, delay) {
    // const [text, setText] = useState('');
    // const [isTyping, setIsTyping] = useState(true);

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
    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    useEffect(() => {
      if (formSubmitted === true) {
        // If formSubmitted is true, clear the text by resetting the state
        setText('');
        setFormSubmitted(false); // Reset formSubmitted
      }
    }, [formSubmitted]);

    useEffect(() => {
      let currentIndex = 0;

      if (isTyping) {
        const timer = setInterval(() => {
          if (currentIndex < initialText.length) {
            setText(initialText.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            setIsTyping(false);
            clearInterval(timer);
          }
        }, 30);

        return () => {
          clearInterval(timer);
        };
      }
    }, [isTyping, initialText]);

    return (
      <div>
        {text}
      </div>
    );
  }







  // const handleInputClick = () => {
  //   switch (soundIndex) {
  //     case 1:
  //       playRain();
  //       break;
  //     case 2:
  //       playCar();
  //       break;
  //     case 3:
  //       playDoor();
  //       break;
  //     case 4:
  //       playFootsteps();
  //       break;
  //     default:
  //       break;
  //   }

  //   setSoundIndex(soundIndex + 1);
  // };

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


  //API REQUESTS:

  const [string, setString] = useState('');
  const updateString = (event) => {
    setString(event.target.value);
  }

  const [info, setInfo] = useState('');

  const [responses, setResponses] = useState([]);
  const [responseIndex, setResponseIndex] = useState(0);
  const [apiEndpoint, setApiEndpoint] = useState('getInfo'); // Initial endpoint
  const [apiEndpointChoices, setApiEndpointChoices] = useState('getChoices'); // Initial choices endpoint
  const apiUrl = 'http://localhost:4000';

  // const clearResponses = () => {
  //   setResponses([]); // Clears all the responses
  // };


  const fetchResponse = async () => {
    try {
      const response = await fetch(apiUrl + '/api/getInfo');
      if (!response.ok) {
        throw new Error(`ERROR: status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setInfo(data.message); // Update the info state with the fetched dialogue
      setLighting(data.lights);
      // setResponseIndex(0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  function setLighting(light) {
    switch(light) {
      case "dim":
        document.getElementsByClassName("lightingScreen")[0].style.opacity = "0.25";
        document.getElementsByClassName("lightingScreen")[0].style.color = "yellow";
        break;
      case "whitescreen":
        document.getElementsByClassName("lightingScreen")[0].style.opacity = "0.45";
        document.getElementsByClassName("lightingScreen")[0].style.color = "white";
        break;
      case "flickeron":
        document.getElementsByClassName("lightingScreen")[0].style.opacity = "0.65";
        document.getElementsByClassName("lightingScreen")[0].style.color = "yellow";
        break;
    }
    return(<div class="lightingScreen"></div>);
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    const intChoice = parseInt(string, 10);

    fetch(apiUrl + '/api/giveUserAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ choice: intChoice }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ended') {
          setResponses([]);
          fetchResponse();
          setInfo(data.message);
          setFormSubmitted(true); // Reset formSubmitted


        } else {
          setResponses((prevResponses) => [...prevResponses, data.message]);
          fetchResponse();
          setInfo(data.message);
        }
      });

    setString('');
    document.querySelector('.inputBar').value = '';


  };




  useEffect(() => {
    const fetchInitialResponse = async () => {
      try {
        const response = await fetch(apiUrl + '/api/getInfo');
        if (!response.ok) {
          throw new Error(`ERROR: status: ${response.status}`);
        }
        const data = await response.json();
        setInfo(data.message);
        setResponseIndex(0);

      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialResponse();

  }, [apiEndpoint, apiEndpointChoices]);


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
              {snakeGame(`As you walk in, you hear something behind you...

** B A M **
        
The door slams shut,  Panic sets in, and you fumble for the light switch. Unfortunately, it's a power outage, and the entire arcade remains in darkness.
        
In the dim glow of an emergency exit sign, you can make out the flickering screen of an arcade machine in the distance,
casting an eerie light within the room.

What do you do?`)};
                {displaySnake ? (
                <TypingEffectComponent initialText={snakeGame(`As you walk in, you hear something behind you...

** B A M **
        
The door slams shut,  Panic sets in, and you fumble for the light switch. Unfortunately, it's a power outage, and the entire arcade remains in darkness.
        
In the dim glow of an emergency exit sign, you can make out the flickering screen of an arcade machine in the distance,
casting an eerie light within the room.

What do you do?`)}></TypingEffectComponent> // Render SnakeGame if displaySnake is true
                ) : (<div></div>)}
              </div>


              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    style={{ fontSize: 14 }}
                    className="inputBar"
                    type="text"
                    onChange={(event) => updateString(event)}
                    // onClick={handleInputClick}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        handleSubmit(event);
                      }
                    }}
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