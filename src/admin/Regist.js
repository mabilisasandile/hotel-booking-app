import React from "react";
import '../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

import {auth} from '../config/firebase';

const Regist = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (() => {
        createUserWithEmailAndPassword(auth, email, password).then(()=>{
            alert("Registered successfully");
            navigate('/signin');

        }).catch((error)=>{
            console.log(error);
        })

    })

    return(
        <div className="container-signup">
            <h1>Register Here</h1>
            <br></br>
            <input className="input-signup" type="email" placeholder="Enter email" onChange={(event)=> setEmail(event.target.value)} /> <br />
            <br></br>
            <input className="input-signup" type="password" placeholder="Enter password" onChange={(event)=> setPassword(event.target.value)} /> <br />
            <br></br>
            <button className="btn-3" onClick={register}>Save</button>
        </div>
        
    )

}

export default Regist; 