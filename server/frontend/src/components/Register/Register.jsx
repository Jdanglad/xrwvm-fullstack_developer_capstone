
import React, { useState } from "react";
import "./Register.css";
import Header from '../Header/Header';
//import user_icon from "../assets/person.png"
//import email_icon from "../assets/email.png"
//import password_icon from "../assets/password.png"
import { IconUser, IconMail, IconPassword } from '@tabler/icons-react';


const Register = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");


  const gohome = ()=> {
    window.location.href = window.location.origin;
  }

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin+"/djangoapp/register";
    
    const res = await fetch(register_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password,
            "firstName":firstName,
            "lastName":lastName,
            "email":email
        }),
    });

    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    }
    else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
};

  return(
    <div className="background">
      <Header/>
    <div className="register_container card d-flex justify-content-evenly flex-column bg-light mb-3" style={{width: "50%", marginTop:"2%"}}>
        <h1 className="text-dark mb-4 mt-3" style={{margin:"auto"}}>SignUp</h1>
        <form onSubmit={register}>
        <div className="d-flex justify-content-evenly flex-column" style={{width:"25vw", height:"25vw", margin:"auto"}}>
          <div class="d-flex justify-content-evenly">
            <IconUser stroke={2} class="text-secondary me-3" height="48" width={48} />
            <input type="text"  name="username" placeholder="Username" className="form-control" onChange={(e) => setUserName(e.target.value)}/>
          </div>
          <div class="d-flex justify-content-evenly">
            <IconUser stroke={2} class="text-secondary me-3" height="48" width={48} />
            <input type="text"  name="first_name" placeholder="First Name" className="form-control" onChange={(e) => setFirstName(e.target.value)}/>
          </div>

          <div class="d-flex justify-content-evenly">
            <IconUser stroke={2} class="text-secondary me-3" height="48" width={48} />
            <input type="text"  name="last_name" placeholder="Last Name" className="form-control" onChange={(e) => setlastName(e.target.value)}/>
          </div>

          <div class="d-flex justify-content-evenly">
            <IconMail stroke={2} class="text-secondary me-3" height="48" width="48" />
            <input type="email"  name="email" placeholder="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div class="d-flex justify-content-evenly">
            <IconPassword stroke={2} class="text-secondary me-3" height={48} width={48} />
            <input name="psw" type="password"  placeholder="Password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
          </div>

        </div>
        <div className="submit_panel m-4">
          <input className="btn text-white" type="submit" value="Register" style={{backgroundColor:"#446B4A", width:"25vw", margin:"auto"}}/>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Register;
