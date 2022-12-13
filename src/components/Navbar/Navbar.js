import React,{useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Navbar.css";
import {signOut, getAuth, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserStatus(1)
        console.log('User is signed in -', uid)
      } else {
        setUserStatus(0)
        console.log('User is signed out')
      }
    });
  }, []);

  const Logout = (e) =>{
    e.preventDefault();
    const auth = getAuth();
      signOut(auth);
      navigate('/login')
  }

  console.log('userStatus :', userStatus)

  return (
    <>
      <header className="navbar">
        <h2 className="heading">📓 React firebase Notebook </h2>
        <div >
        {userStatus?
        <>
        <Link to='/'> Notes </Link>
        <Link to='/add'> | Add Note </Link>
        <span onClick={Logout}> | Logout </span>
        </>
        : null}
        {!userStatus? 
        <>
        <Link to='/login'> | Login </Link>
        <Link to='/signup'> | SignUp </Link>
        </>
        :null}
        </div>
      </header>
    </>
  );
};

export default Navbar;
