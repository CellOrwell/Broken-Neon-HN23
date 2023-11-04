import React, { Component } from 'react';
import './index.css';


function gameDisplay(user_input) {

  //Check what game was inputted by user
  //Call specific function to draw ASCII game

  //Have a continuous calling of this function?  To constantly update the game,

  return (
    <div>
      {/* Display ASCII game */}

    </div>
  )
}

function chatProcessing(user_input) {

  //Retrieve input user responses, process information
  //Display returned output data

  return (
    <div>

    </div>
  );
}


function App() {
  // class App extends Component {
  // render() {
  return (
    <div>
      <header>
        <img src={require('./hacknottsLogo.png')} style={{
          width: '200px',
          height: '200px',
          verticalAlign: 'middle',

        }}></img>
        {/* <h1>HackNotts '23 </h1> */}
      </header>

      <main>
        <section className="terminalSection" style={{ marginTop: '50px' }}>
          <div className="computerScreen">
            <div className="buttonScreen" style={{ marginTop: '30px' }}>
              {/* <button className="computerButton" onClick={()}></button> */}
              {/* <button className="computerButton"></button> */}

              <div className="terminal" style={{ marginTop: '20px' }}>
                <p>ADVENTURE GAME STUFF</p>
                <button className="computerButton"></button>

              </div>

            </div>


            {/* <div className="computerButton">


            </div> */}
          </div>

        </section>

        <section classame="chatBar">
          {chatProcessing()};

        </section>
      </main>

    </div>

  );
}
// }

export default App;
