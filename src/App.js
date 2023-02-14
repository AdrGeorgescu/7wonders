import React, { useState } from 'react';
import './App.css';

function getLocalPlayers() {
  return localStorage.getItem('players') && JSON.parse(localStorage.getItem('players'));
}

const categories = [
  'army',
  'coins',
  'wonders',
  'blueCards',
  'yellowCards',
  'purpleCards',
  'greenCards'
];

function App() {
    // TODO:
    // 1. replace the table with divs
  const [ players, setPlayers ] = useState(getLocalPlayers() || []);

  const total = (e) => {
    const column = document.getElementsByName(e.target.name);
    let total = 0;

    column.forEach(e => {
      if (e.value) {
        total += parseInt(e.value);
      }
    });

    const totalElement = document.getElementById(`${e.target.name}Score`);
    totalElement.innerHTML = total;
  };

  const savePlayers = () => {
    const playerNames = document.getElementsByName('playerName');
    const players = [];

    playerNames.forEach(playerName => {
      if (playerName.value) {
        players.push(playerName.value);
      }
    });
    localStorage.setItem('players', JSON.stringify(players));

    setPlayers(players);
  };

  const resetScore = () => {
    const inputs = document.querySelectorAll('table input[type="number"]');
    inputs.forEach(input => input.value = "");

    const playersScores = document.querySelectorAll('.playerScore');
    playersScores.forEach(e => e.innerHTML = "");
  };

  const resetPlayers = () => {
    localStorage.removeItem('players');

    setPlayers([]);
  };


  if (!players.length) {
    return (
        <div className="playersNames">
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />

          <button onClick={savePlayers}> Save </button>
        </div>
    )
  }

  return (
      <div className="App">
        <table border="1" cellPadding="0" cellSpacing="0">
          <thead>
          <tr>
            <th className="playerImage" />
            { players.map(player => <th key={player}>{player}</th>) }
          </tr>
          </thead>
          <tbody>
          {
            categories.map((category) => (
                <tr key={category}>
                  <td className={`${category}Image firstColumn`} />
                  {
                    players.map((player) =>
                        <td key={player}>
                          <input
                              type="number"
                              name={`${player}`}
                              step="1"
                              onChange={total} />
                        </td>
                    )
                  }
                </tr>
            ))
          }
          <tr>
            <td className="totalPoints"></td>
            { players.map(player => <td key={player} id={`${player}Score`} className="playerScore"></td>) }
          </tr>
          </tbody>
        </table>
        <button
            onClick={resetScore}
            className="resetButton">
          Reset Score
        </button>
        <button
            onClick={resetPlayers}
            className="resetButton">
          Reset Players
        </button>
      </div>
  );

}

export default App;
