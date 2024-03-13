import React, { useState } from 'react';

import "./Login.css";
import Header from '../Header/Header';

const Login = ({ onClose }) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open,setOpen] = useState(true)

  let login_url = window.location.origin+"/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password
        }),
    });
    
    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
        sessionStorage.setItem('username', json.userName);
        setOpen(false);        
    }
    else {
      alert("The user could not be authenticated.")
    }
};

  if (!open) {
    window.location.href = "/";
  };
  

  return (
    <div class="background">
      <Header/>
    <div class="card bg-light" style={{width: "50vw", margin: "auto", marginTop:"5%", marginBottom:"5%"}} onClick={onClose}>
      <div style={{margin:"10%"}}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
          <form className="login_panel" onSubmit={login}>
            <h2 className="mb-5 text-dark">Sign-in</h2>
            <div class="d-flex justify-content-evenly flex-wrap">
              <input type="text" name="username" class="form-control mb-4 p-2" style={{width:"35vw"}} placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
              <input name="psw" type="password" class="form-control mb-3 p-2" style={{width:"35vw"}} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>            
            </div>
            <div>
              <input class="btn text-white wrapt-text" style={{width:"35vw",marginTop:"5%", marginBottom:"5%", backgroundColor:"#446B4A"}} type="submit" value="Login"/>
            </div>
            <div>
              <a class="btn text-white wrapt-text" style={{width:"35vw", backgroundColor:"#446B4A"}} href="/register">Register Now</a>
            </div>
          </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
