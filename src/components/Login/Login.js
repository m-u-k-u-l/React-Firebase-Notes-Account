import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import firebase from "firebase/compat/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/database";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Login = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('userCredential--', userCredential)
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });


    // if (title !== "" && description !== "") {
    //   firebase.database().ref("notebook").push({
    //     title: title,
    //     description: description,
    //   });
    // }

  };

  return (
    <>
      <div className="noteadd">
        <h1>Login</h1>
        <div className="form-group">
          <input
            type="text"
            className="noteadd-header"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type='password'
            name="password"
            className="noteadd-description"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="noteadd-button">
          <button onClick={Login}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
