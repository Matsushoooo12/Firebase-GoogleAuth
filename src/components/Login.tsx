import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

interface User {
  displayName: string | null;
  uid: string | null;
  email: string | null;
}

const Login: React.FC = () => {
  const [user, setUser] = React.useState<User>({
    uid: "",
    email: "",
    displayName: "",
  });
  // Google プロバイダ オブジェクトのインスタンスを作成
  const provider = new GoogleAuthProvider();
  const clickRedirectLogin = () => {
    // ログインページにリダイレクトしてログインを行う場合
    signInWithRedirect(auth, provider);
  };

  const clickPopupLogin = () => {
    signInWithPopup(auth, provider);
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        const name = user.displayName;
        setUser({
          uid: uid,
          email: email,
          displayName: name,
        });
      } else {
        setUser({
          uid: "",
          email: "",
          displayName: "",
        });
        console.log("signed out");
      }
    });
  }, [setUser]);

  const clickLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("ログアウトしました");
      })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  };

  console.log(auth.currentUser);
  return (
    <div>
      <div>
        {auth.currentUser ? (
          <div>
            <h1>ログイン状態です</h1>
            <p>{user.displayName}</p>
            <p>{user.email}</p>
            <div>
              <button onClick={() => clickLogout()}>Logout</button>
            </div>
          </div>
        ) : (
          <div>
            <h1>ログアウト状態です</h1>
            <div>
              <button onClick={() => clickRedirectLogin()}>
                RedirectLogin
              </button>
              <button onClick={() => clickPopupLogin()}>PopupLogin</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
