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
    <div class="background" style={{display:"flex", flexDirection:"column"}}>
      <Header/>
    <div class="card" style={{width: "50vw",margin: "auto", marginTop:"5%", marginBottom:"10%"}} onClick={onClose}>
      <div style={{margin:"10%"}}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
          <form className="login_panel" style={{}} onSubmit={login}>
            <div class="d-flex justify-content-evenly flex-wrap" style={{width:""}}>
              <input type="text" name="username" class="form-control mb-4 p-2" style={{width:"35vw"}} placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
              <input name="psw" type="password" class="form-control mb-3 p-2" style={{width:"35vw"}} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>            
            </div>
              <div>
              <input className="action_button" class="btn btn-dark text-white wrapt-text" style={{width:"35vw",marginTop:"5%", marginBottom:"5%"}} type="submit" value="Login"/>
              </div>
              <div>
              <a className="loginlink" class="btn btn-dark text-white wrapt-text" style={{width:"35vw"}} href="/register">Register Now</a>
              </div>
          </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
