import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

import Link from "next/link";

function Header() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const authenticate = async () => {
    //TODO: find out about error handling
    await signInWithPopup(auth, provider).catch((err) => console.log(err));
  };

  return (
    <div className="header">
      <Link href="/" className="header__logo">
        <p>
          Full-Stack<span className="header__logoPink"> Game</span>
        </p>
      </Link>
      <div className="header__nav">
        <div className="header__option">
          <button
            className="header__authentication"
            onClick={() => {
              !user ? authenticate() : auth.signOut();
            }}
          >
            {!user ? "Guest" : user.displayName.split(" ")[0]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
