// import { response } from "express";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header(){

  const {userInfo,setUserInfo} = useContext(UserContext);
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  },[]);

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials:'include',
      method: 'POST',
    });
    // invalidate token and reset username
    setUserInfo(null);
  }

  const username = userInfo?.username;
    return(
        <header>
        <Link to="/" className="logo">BlogCentral</Link>
        <nav>
          {username && (
            <>
            <Link to="/create" >Create new Post</Link>
            <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
            </>
          )}
        </nav>
      </header>
    );
}