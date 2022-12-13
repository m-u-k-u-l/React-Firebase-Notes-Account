import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/database";
import "./SignUp.css";
import {
  getFirestore,
} from "firebase/firestore";
import {app} from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate  } from "react-router-dom";


const db = getFirestore(app);

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const Signup = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = userCredential.user.uid;
      console.log('user--', user)
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        // profile_picture : imageUrl
      });
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });


function writeUserData(userId, name, email, imageUrl) {
  
}
    

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
        <h1>New Registration</h1>
        <div className="form-group">
          <input
            type="text"
            className="noteadd-header"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <button onClick={Signup}>SignUp</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
