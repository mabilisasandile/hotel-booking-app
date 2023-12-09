import React from "react";
import { useState } from "react";
import '../App.css';
import {auth} from '../config/firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

function ResetPassword(){
    
    const forgotPassword = (() =>{
        sendPasswordResetEmail(auth, email).then(()=>{

            Swal.fire({
                icon: 'info',
                title: 'Info!',
                text: 'Email sent. Check your email to reset your password.',
                showConfirmButton: true,
                timer: 8000,
            });

        }).catch((error)=>{
            //Return error response
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong. Please try again!',
                showConfirmButton: true,
                timer: 8000,
            });
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