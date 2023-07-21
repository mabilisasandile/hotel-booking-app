import React from "react";
import { useState } from "react";
import '../App.css';
import {auth} from '../config/firebase';
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPassword(){
    
    const forgotPassword = (() =>{
        sendPasswordResetEmail(auth, email).then(()=>{
            alert("Check your email");

        }).catch((error)=>{
            
        })
    })

    const [email, setEmail] = useState('');

    return(
        <div>
            <h2>Reset your password</h2>

            <br></br>

            <input 
            type="text" 
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email" /> <br />

            <br></br>

            <button onClick={forgotPassword}>Reset Password</button>
        </div>
    )

}

export default ResetPassword;