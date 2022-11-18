import Head from "next/head";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase, database } from "../firebase/init-firebase";

import Header from "../components/Header";

//localhost:3000
export default function Home() {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (!user) {
    return (
      <div id={"contentRoot"}>
        <Head>
          <title>Fullstack Game</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <br />

        <main className="main">
          <h1>Welcome!</h1>
        </main>

        <footer className="footer"></footer>
        {/* TODO: Find a better way to import google fonts */}
      </div>
    );
  }

  return (
    <div id="contentRoot">
      <Head>
        <title>Fullstack Game</title>
        <meta
          name="description"
          content="One of several projects in a 24H timeframe"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main">
        <h1>Welcome, {user.displayName}</h1>
      </main>

      <footer className="footer"></footer>
    </div>
  );
}
