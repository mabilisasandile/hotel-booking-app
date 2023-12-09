import React from "react";
import '../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../config/firebase';

const Regist = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (() => {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            //Success message popup
            Swal.fire({
                icon: 'success',
                title: 'Signed Up!',
                text: 'Successfully Signed Up.',
                showConfirmButton: false,
                timer: 3000,
            });
            navigate('/login');

        }).catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Invalid password entered! Ensure your password has minimum 6 characters.',
                showConfirmButton: true,
                timer: 3000,
            });
        })

    })

    return (
        <div className="container-signup">
            <h1>Register Here</h1>
            <br></br>
            <input
                className="input-signup"
                type="email" placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
            />

            <br />
            <br></br>

            <input
                className="input-signup"
                type="password"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)} /> <br />

            <br></br>

            <button className="btn-3" onClick={register}>Save</button>
        </div>

    )

}

export default Regist; 