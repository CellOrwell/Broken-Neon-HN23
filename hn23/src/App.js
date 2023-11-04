import React, { Component } from 'react';
import './index.css';


function gameDisplay(user_input) {

  //Check what game was inputted by user
  //Call specific function to draw ASCII game

  //Have a continuous calling of this function?  To constantly update the game,
  
  return(
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
        <h1>HACKNOTTS 2023 </h1>
      </header>

      <main>
        <p className="App-intro">
          With Jesra, Josh, Freddie, and ofc chica our beloved ~<br></br><br></br>
        </p>

        <section className="terminalSection">
          <div className="terminal">
            <p>ADVENTURE GAME STUFF</p>
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
