import React, { useState } from 'react';

import "./Login.css";
import Header from '../Header/Header';
import { IconUser, IconPassword } from '@tabler/icons-react';

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
    <div class="card bg-light" style={{width:"50%", margin:"auto", marginTop:"2%", marginBottom:"13%"}} onClick={onClose}>
      <div onClick={(e) => {
          e.stopPropagation();
        }} className="login_container d-flex justify-content-evenly flex-column"
      >
          <h1 className="text-dark mb-4 mt-3" style={{margin:"auto"}}>Sign-in</h1> 
          <form onSubmit={login}>
            <div className="d-flex justify-content-evenly flex-column" style={{width:"25vw", height:"12vw", margin:"auto"}}>
              <div class="d-flex justify-content-evenly" >
                <IconUser stroke={2} class="text-secondary me-3" height="48" width={48} />
                <input type="text" name="username" class="form-control" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
              </div>
              <div class="d-flex justify-content-evenly" >
                <IconPassword stroke={2} class="text-secondary me-3" height={48} width={48} />
                <input name="psw" type="password" class="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>     
              </div>
            </div>
            <div className="submit_panel mt-3">
              <input class="btn text-white wrapt-text" style={{width:"25vw", backgroundColor:"#446B4A", margin:"auto"}} type="submit" value="Login"/>
            </div>
            <div className="submit_panel mt-4 mb-4">
              <a class="btn text-white wrapt-text" style={{width:"25vw", backgroundColor:"#446B4A", margin:"auto"}} href="/register">Register Now</a>
            </div>
          </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
