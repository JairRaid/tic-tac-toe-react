import "./App.css";
import notifIcon from "./assets/coming soon.png";
import NewGame from "./components/NewGame.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useRef, useState } from "react";

function App() {
  const [gameType, setGametype] = useState(null);
  const [playerOneMark, setPlayerOneMark] = useState("o");
  const [notification, setNotification] = useState(false);
  const notifRef = useRef(null);

  function handleSelect(markSelected) {
    setPlayerOneMark(markSelected);
  }

  function startGame(game) {
    setGametype(game);
  }

  function restartGame() {
    setGametype(null);
    setPlayerOneMark("o");
  }

  function showNotification() {
    if (notification) return;
    if (notifRef.current) {
      clearTimeout(notifRef.current);
    }

    setNotification(true);

    console.log(notifRef);
    notifRef.current = setTimeout(() => {
      setNotification(false);
    }, 3000);
  }

  return (
    <>
      <main>
        <NewGame
          ngClass={gameType ? "new-game hide" : "new-game"}
          onSelectX={() => handleSelect("x")}
          onSelectO={() => handleSelect("o")}
          markClassX={
            playerOneMark === "x" ? "mark-item selected" : "mark-item"
          }
          markClassO={
            playerOneMark === "o" ? "mark-item selected" : "mark-item"
          }
          onStartGameVsCPU={() => showNotification()}
          onStartGameVsPLAYER={() => startGame("vs player")}
        />
        <GameBoard
          gbClass={gameType ? "game-board" : "game-board hide"}
          onRestart={restartGame}
          playerMark={playerOneMark}
          game={gameType}
        />
        <div
          className={notification ? "notification" : "notification hide-notif"}
        >
          <img src={notifIcon} alt="coming soon notification" />
        </div>
      </main>
    </>
  );
}

export default App;
