import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import NoteAdd from "./components/NoteAdd";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Notebook from "./components/Notebook";
import Layout from "./components/Layout/Layout";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const firebaseConfig = {
  apiKey: "AIzaSyCakD1xKmohYfzV13ljaw2z4Y3s1wNofBw",
  authDomain: "react-firebase-book-f3295.firebaseapp.com",
  projectId: "react-firebase-book-f3295",
  storageBucket: "react-firebase-book-f3295.appspot.com",
  messagingSenderId: "803952575355",
  appId: "1:803952575355:web:cb17c7e229036963ab33de",
  measurementId: "G-0L5BXRHBJ3"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [noteBookData, setNoteBookData] = useState([]);

  const updateNotes = () => {
    firebase
      .database()
      .ref("notebook")
      .on("child_added", (snapshot) => {
        let note = {
          id: snapshot.key,
          title: snapshot.val().title,
          description: snapshot.val().description,
        };
        let notebook = noteBookData;
        notebook.push(note);
        setNoteBookData([...noteBookData]);
      });

    firebase
      .database()
      .ref("notebook")
      .on("child_removed", (snapshot) => {
        let notebook = noteBookData;
        notebook = noteBookData.filter((note) => note.id !== snapshot.key);
        setNoteBookData(notebook);
      });
  };

  

  // const user = auth.currentUser;

  // if(user){
  //   console.log('currentuser-', user)
  // }else{
  //   console.log('currentuser-', user)
  // }


  useEffect(() => {
    updateNotes();
    
  }, []);

  // console.log('data : ', noteBookData)
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="add" element={<NoteAdd />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={ <Notebook notebook={noteBookData} /> } />
      <Route path="*" element={<center><h1><br/><br/><br/><br/>404</h1></center>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
