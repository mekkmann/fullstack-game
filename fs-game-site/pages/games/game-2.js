import React from "react";
import { useState, useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { database } from "../../firebase/init-firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getDoc,
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  collection,
  deleteDoc,
} from "firebase/firestore";

import Header from "../../components/Header";
import Game_2 from "../../components/Game-2";

//localhost:3000/games/game-1
const Game2 = () => {
  return (
    <div id={"contentRoot"}>
      <Head>
        <title>Fullstack Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <br />
      <Game_2 />

      <footer className="footer"></footer>
    </div>
  );
};

export default Game2;