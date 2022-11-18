import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase, database } from "../firebase/init-firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

const GameIndex = () => {
  const [resultsGame2, setResultsGame2] = useState([]);
  const filteredResults = resultsGame2.filter(
    (result) => result.data.winPercent >= 45
  );
  const printResults = () => {
    console.log(resultsGame2);
  };

  const databaseRef = collection(database, "tic-tac-toe-highscores");
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const getDataGame2 = async () => {
      await getDocs(databaseRef)
        .then((response) =>
          setResultsGame2(
            response.docs.map((result) => {
              console.log(result);
              return { data: result.data(), id: result.id };
            })
          )
        )
        .catch((err) => alert(err.message));
    };
    getDataGame2();
  }, []);
  return (
    <div className="gamesIndex">
      <div className="gamesIndex__column">
        <h1>Tic-Tac-Toe</h1>
        <Link href={"/games/game-2"}>
          <button>Tic-Tac-Toe</button>
        </Link>
        <div className="gamesIndex__columnTitle">
          <h3>All-Time High-Scores</h3>
          <h5>(Single Session/No New Game)</h5>
        </div>
        {filteredResults.map((result) => (
          <div key={result.id} className="gamesIndex__columnScore">
            <p>Win Rate: {result.data.winPercent}%</p>
            <p>
              Wins: {result.data.timesWon} | Losses: {result.data.timesLost} |
              Draws: {result.data.timesDraw}
            </p>
            <p>User: {result.data.displayName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameIndex;
