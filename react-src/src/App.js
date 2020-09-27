import React from 'react';
import './App.css';
import Game from './components/pages/game/Game'

function App() {
  return (
    <div className="App">
      <h1 className="header">Snake-n-Snack</h1>
      <p className="subheader">Hey player, our snake here really loves eating snacks. Lets not keep it hungry, ok ?</p>
      <Game />
      
    </div>
  );
}

export default App;
