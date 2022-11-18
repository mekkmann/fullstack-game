import React, { useState, useEffect } from "react";
import { initFirebase, database } from "../firebase/init-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game_2 = () => {
  // useState for the game
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [round, setRound] = useState(1);
  const [drawAmount, setDrawAmount] = useState(0);
  const [won, setWon] = useState(false);
  const [draw, setDraw] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [xTurn, setXTurn] = useState(true);
  const [modalTitle, setModalTitle] = useState(false);
  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });

  useEffect(() => {
    checkWinner();
  }, [boardData]);
  // useEffect(() => {
  //   if (gameOver) {
  //     console.log("posting to firestore");
  //     console.log(winPercent);
  //   }
  // }, [gameOver]);

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const createPost = async () => {
    if (!user) return;
    // e.preventDefault();

    await addDoc(collection(database, "tic-tac-toe-highscores"), {
      displayName: user.displayName,
      userID: user.uid,
      timesWon: xScore,
      timesDraw: drawAmount,
      timesLost: oScore,
      winPercent: (xScore / (drawAmount + oScore + xScore)) * 100,
    }).catch((err) => alert(err));
    alert("Highscore Saved!");
  };

  const updateBoardData = (idx) => {
    //will check if idx is empty or not
    if (!boardData[idx] && !won) {
      setRound(1 + round);
      let value = xTurn ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });
      setXTurn(!xTurn);
    }
  };
  const checkWinner = () => {
    //FIX SO THAT HASWON ISNT NECESSARY
    let hasWon = false;
    winCombos.map((combo) => {
      const [a, b, c] = combo;
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        hasWon = true;
        setWon(true);
        setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!`);
        setXScore(xTurn ? xScore : xScore + 1);
        setOScore(xTurn ? oScore + 1 : oScore);
        setGameOver(true);

        return;
      }
    });
    if (round == 10 && !hasWon) displayDraw();
  };
  const displayDraw = () => {
    setDraw(true);
    setModalTitle("Cat's Game!");
    setDrawAmount(drawAmount + 1);
    setGameOver(true);
  };
  const resetGame = () => {
    newRound();
    setXScore(0);
    setOScore(0);
    setDrawAmount(0);
    console.log("about to post");
    createPost();
  };
  const newRound = () => {
    setBoardData({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setXTurn(true);
    setWon(false);
    setDraw(false);
    setModalTitle("");
    setGameOver(false);
    setRound(1);
  };

  return (
    <div className="game2">
      <h1>Tic-Tac-Toe</h1>
      {!user ? (
        <h3 className="game2__warning">Sign In to not lose your highscore</h3>
      ) : (
        <></>
      )}
      <p>After each round:</p>
      <p>Submit your highscore by pressing "new game"</p>
      <p>Keep building your highscore by pressing "another round"</p>
      <hr style={{ width: "35%" }} />
      <div className="game2__menu">
        <p>Player {xTurn ? "X" : "O"}'s turn</p>
      </div>
      <div className="game2__scoreboard">
        <div className="game2__score">
          <h3>X Score: {xScore}</h3>
        </div>
        <h3>|</h3>
        <div className="game2__score">
          <h3>Cat's Games: {drawAmount}</h3>
        </div>
        <h3>|</h3>
        <div className="game2__score">
          <h3>O Score: {oScore}</h3>
        </div>
      </div>
      <div className="game2__board">
        {[...Array(9)].map((v, idx) => {
          return (
            <div
              key={idx}
              className="game2__square"
              onClick={() => {
                updateBoardData(idx);
              }}
            >
              {boardData[idx]}
            </div>
          );
        })}
      </div>
      <div className={`game2__modal ${modalTitle ? "show" : ""}`}>
        <div className="game2__modal__title">{modalTitle}</div>
        <div className="game2__modal__buttons">
          <button onClick={resetGame}>New Game</button>

          <button onClick={newRound}>Another Round</button>
        </div>
      </div>
    </div>
  );
};

export default Game_2;
