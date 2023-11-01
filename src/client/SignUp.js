import React from "react";
import '../App.css';
import { useState } from "react";

import {createUserWithEmailAndPassword} from 'firebase/auth';

import {auth} from '../config/firebase';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (() => {
        createUserWithEmailAndPassword(auth, email, password).then(()=>{
            alert("Registered successfully");

        }).catch((error)=>{
            console.log(error);
        })

    })

    return(
        <div className="container-signup">
            <h1>Sign Up Here</h1>
            <br></br>
            <input className="input-signup" type="email" placeholder="Enter email" onChange={(event)=> setEmail(event.target.value)} /> <br />
            <br></br>
            <input className="input-signup" type="password" placeholder="Enter password" onChange={(event)=> setPassword(event.target.value)} /> <br />
            <br></br>
            <button className="btn-3" onClick={register}>Register</button>
        </div>
        
    )

}

export default SignUp; 