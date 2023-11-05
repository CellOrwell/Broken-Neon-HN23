import React, { useState, useEffect } from 'react';
import './index.css';
import useSound from 'use-sound';
import rainSound from './rain.mp3';
import carSound from './carArriving.mp3';
import doorSound from './doorSlam.mp3';
import footstepsSound from './footsteps.mp3';

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
  const { text, isTyping } = typingEffect(initialText, 30);
  return (
    <div>
      {text}
    </div>
  );
}

function App() {
  const [playRain] = useSound(rainSound);
  const [playCar] = useSound(carSound);
  const [playDoor] = useSound(doorSound);
  const [playFootsteps] = useSound(footstepsSound);

  const [soundIndex, setSoundIndex] = useState(true);

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
      // setResponseIndex(0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };


  const handleSubmit = (event) => {

    event.preventDefault();
    console.log(string);
    const intChoice = parseInt(string, 10); // Convert string to an integer
    // clearResponses();

    // Send the user input to the API
    fetch(apiUrl + '/api/giveUserAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ choice: intChoice }), // Send the integer input

    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ended') {
          setResponses([]);
          fetchResponse(); // Fetch initial response again
          setInfo(data.message); // Update the info state with the fetched dialogue
        } else {
          setResponses((prevResponses) => [...prevResponses, data.message]);
          fetchResponse(); // Fetch the next part of the dialogue
          setInfo(data.message); // Update the info state with the fetched dialogue
        }
      });

    // Clear the input field
    setString(''); // Clear the 'string' state
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
                {/* <button className="computerButton"></button> */}

                <TypingEffectComponent initialText={info}>
                </TypingEffectComponent>



              </div>


              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    style={{ fontSize: 14 }}
                    className="inputBar"
                    type='text'
                    onChange={(event) => updateString(event)}
                    onClick={handleInputClick}
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