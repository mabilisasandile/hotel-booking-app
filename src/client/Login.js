import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';

import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../config/firebase';

const Login=()=>{

    const navigate = useNavigate();
    const history = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goToHomePage = (()=>{

        signInWithEmailAndPassword(auth, email, password).then(()=>{
            alert("Successfully logged in")
            history.push("/Home");
            navigate('/Home');

        }).catch((error)=>{
            return (
                <div>
                    <p>Invalid username/password entered, re-enter!</p>
                </div>
            )
        })
        

    })

    return(
        <div className="container-signin">
            <h1>Sign In Here</h1>

            <br></br>

            <input 
            className="input-login" 
            onChange={(event) => setEmail(event.target.value)}
            type="email" 
            placeholder="username"/> <br />

            <br></br>

            <input 
            className="input-login" 
            onChange={(event) => setPassword(event.target.value)}
            type="password" 
            placeholder="password"/> <br />

            <br></br>

            <button onClick={goToHomePage} className="btn-signin">Sign In</button> <br />

            <br></br>

            <Link to="./ResetPassword" className="link-signup">Forgot password</Link> <br />
            
            <br></br>
            
            <Link to="./SignUp" className="link-signup">Don't have an account: Sign up</Link>
        </div>
        
    );

}

export default Login;