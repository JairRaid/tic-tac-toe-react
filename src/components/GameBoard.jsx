import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";
import outlineX from "../assets/icon-x-outline.svg";
import outlineO from "../assets/icon-o-outline.svg";
import iconRestart from "../assets/icon-restart.svg";
import { useEffect, useState } from "react";

function GameBoard({ game, gbClass, onRestart, playerMark }) {
  const [turn, setTurn] = useState("x");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winnerIndexs, setWinnerIndexs] = useState(null);
  const [isWin, setIsWin] = useState(false);

  const [tiesScore, setTiesScore] = useState(0);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  const [restartScreen, setRestartScreen] = useState(false);
  const [tiedScreen, setTiedScreen] = useState(false);
  const [winnerScreen, setWinnerScreen] = useState(false);

  const [playerWhoWin, setPlayerWhoWin] = useState(null);

  const [hovered, setHovered] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(null);

  let imgBoard;

  useEffect(() => {
    evaluateGameStatus();
  }, [board]);

  function drawMark(selectedBox) {
    if (board[selectedBox]) return;

    const newDraw = board.map((box, index) =>
      selectedBox === index ? turn : box
    );
    setBoard(newDraw);
    setTurn(turn === "x" ? "o" : "x");
    setHovered(false);
  }

  function evaluateGameStatus() {
    if (checkWinner()) return;
    checkTie();
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [_, combination] of winningCombinations.entries()) {
      const [firstIndex, secondIndex, thirdIndex] = combination;
      if (board[firstIndex] && board[firstIndex] && board[secondIndex]) {
        if (
          board[firstIndex] === board[secondIndex] &&
          board[secondIndex] === board[thirdIndex]
        ) {
          setWinnerIndexs(combination);
          setWinnerScreen(true);
          let mark = board[firstIndex];
          if (board[firstIndex].length > 1) {
            setPlayerWhoWin(mark[0]);
          }
          updateScore(mark);
          return true;
        }
      }
    }
    return false;
  }

  function checkTie() {
    for (const box of Object.values(board)) {
      if (!box) {
        return;
      }
    }
    setTiedScreen(true);
    setTiesScore((prevSate) => prevSate + 1);
  }

  function updateScore(markSelect) {
    if (markSelect === "x") {
      setPlayerOneScore((prevScore) => prevScore + 1);
    }
    if (markSelect === "o") {
      setPlayerTwoScore((prevScore) => prevScore + 1);
    }
  }

  function showHideRestart(isShow) {
    setRestartScreen(isShow);
  }

  function restartGame() {
    setRestartScreen(false);
    setBoard(Array(9).fill(""));
    setIsWin(false);
    setWinnerIndexs(null);
    setTurn("x");
    setTiesScore(0);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setPlayerWhoWin(null);
  }

  function quitGame() {
    setWinnerScreen(false);
    setTiedScreen(false);
    setBoard(Array(9).fill(""));
    setIsWin(false);
    setWinnerIndexs(null);
    setTurn("x");
    setTiesScore(0);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setPlayerWhoWin(null);
    onRestart();
  }

  function nextRound() {
    setWinnerScreen(false);
    setTiedScreen(false);
    setBoard(Array(9).fill(""));
    setIsWin(false);
    setWinnerIndexs(null);
    setPlayerWhoWin(null);
    setTurn("x");
  }

  function previewMark(boxIndex) {
    if (board[boxIndex]) {
      setHovered(false);
      return;
    }
    setPreviewIndex(boxIndex);
    setHovered(true);
  }

  let imgTurn;
  if (turn === "x") {
    imgTurn = <img src={iconX} alt="x mark icon" />;
  }
  if (turn === "o") {
    imgTurn = <img src={iconO} alt="o mark icon" />;
  }

  if (winnerIndexs && !isWin) {
    console.log(winnerIndexs);
    const [firstIndex, secondIndex, thirdIndex] = winnerIndexs;
    setBoard(
      board.map((box, index) => {
        if (
          index === firstIndex ||
          index === secondIndex ||
          index === thirdIndex
        ) {
          if (box === "x") {
            return "xoutline";
          }
          if (box === "o") {
            return "ooutline";
          }
        }
        return box;
      })
    );
    setIsWin(true);
  }

  imgBoard = board.map((box) => {
    if (box === "x") {
      return <img src={iconX} alt="x mark icon" />;
    }
    if (box === "o") {
      return <img src={iconO} alt="o mark icon" />;
    }
    if (box === "xoutline") {
      return <img src={iconX} alt="x mark icon" />;
    }
    if (box === "ooutline") {
      return <img src={iconO} alt="o mark icon" />;
    }
  });

  if (hovered) {
    imgBoard[previewIndex] = (
      <img
        src={turn === "x" ? outlineX : outlineO}
        alt={turn === "x" ? "x mark icon" : "o mark icon"}
      />
    );
  }

  return (
    <>
      <section className={gbClass}>
        <div className="game-board-header">
          <div className="mark-container-header">
            <img src={iconX} alt="x mark icon" />
            <img src={iconO} alt="o mark icon" />
          </div>
          <div className="player-turn">
            {imgTurn}
            <p>turn</p>
          </div>
          <div
            className="restart-container"
            onClick={() => showHideRestart(true)}
          >
            <img src={iconRestart} alt="restart icon" />
          </div>
        </div>

        <div className="board">
          {imgBoard.map((image, index) => {
            if (board[index] === "xoutline") {
              return (
                <button
                  key={index}
                  className="x-win-button"
                  onClick={() => drawMark(index)}
                >
                  {image}
                </button>
              );
            }
            if (board[index] === "ooutline") {
              return (
                <button
                  key={index}
                  className="o-win-button"
                  onClick={() => drawMark(index)}
                >
                  {image}
                </button>
              );
            }
            return (
              <button
                key={index}
                onClick={() => drawMark(index)}
                onMouseEnter={() => previewMark(index)}
              >
                {image}
              </button>
            );
          })}
        </div>
        <div className="player-score">
          <div className="x-score-container">
            <p className="x-title">X ({playerMark === "x" ? "P1" : "P2"})</p>
            <p className="x-score">{playerOneScore}</p>
          </div>
          <div className="tie-container">
            <p className="tie-title">TIES</p>
            <p className="tie-score">{tiesScore}</p>
          </div>
          <div className="o-score-container">
            <p className="o-title">O ({playerMark === "o" ? "P1" : "P2"})</p>
            <p className="o-score">{playerTwoScore}</p>
          </div>
        </div>
      </section>

      <section
        className={
          restartScreen || winnerScreen || tiedScreen
            ? "game-status"
            : "game-status hide"
        }
      >
        <div className={winnerScreen ? "winner-screen" : "winner-screen hide"}>
          <h2>
            {playerWhoWin === playerMark ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"}
          </h2>
          {playerWhoWin === "x" ? (
            <p className="x-win">
              <img src={iconX} alt="x mark icon" />
              TAKES THE ROUND
            </p>
          ) : (
            <p className="o-win">
              <img src={iconO} alt="o mark icon" />
              TAKES THE ROUND
            </p>
          )}
          <div className="buttons-container">
            <button onClick={() => quitGame()}>QUIT</button>
            <button onClick={() => nextRound()}>NEXT ROUND</button>
          </div>
        </div>
        <div className={tiedScreen ? "tied-screen" : "tied-screen hide"}>
          <h2>ROUND TIED</h2>
          <div className="buttons-container">
            <button onClick={() => quitGame()}>QUIT</button>
            <button onClick={() => nextRound()}>NEXT ROUND</button>
          </div>
        </div>
        <div
          className={restartScreen ? "restart-screen" : "restart-screen hide"}
        >
          <h2>RESTART GAME?</h2>
          <div className="buttons-container">
            <button id="cancel" onClick={() => setRestartScreen(false)}>
              NO, CANCEL
            </button>
            <button id="restart" onClick={() => restartGame()}>
              YES, RESTART
            </button>
          </div>
        </div>
      </section>
      <div
        className={
          restartScreen || winnerScreen || tiedScreen
            ? "overlay"
            : "overlay hide"
        }
      ></div>
    </>
  );
}

export default GameBoard;
