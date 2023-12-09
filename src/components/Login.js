import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import Regist from "./Regist";

const Login = () => {

    const navigate = useNavigate();
    const history = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goToHomePage = (() => {

        signInWithEmailAndPassword(auth, email, password).then(() => {
            //Success message popup
            Swal.fire({
                icon: 'success',
                title: 'Logged In!',
                text: 'Successfully Signed In.',
                showConfirmButton: false,
                timer: 3000,
            });
            history.push("/Home");
            navigate('/Home');

        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Invalid password/username entered!',
                showConfirmButton: true,
                timer: 3000,
            });
        })


    })

    return (
        <div className="container-signin">
            <h1>Sign In Here</h1>

            <br></br>

            <input
                className="input-login"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="username"
            />

            <br></br>
            <br></br>

            <input
                className="input-login"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="password"
            />

            <br></br>
            <br></br>

            <button onClick={goToHomePage} className="btn-signin">Sign In</button> <br />

            <br></br>

            <Link to="./ResetPassword" className="link-signup">Forgot password</Link> <br />

            <br></br>

            <Link to="/regist" className="link-signup">Don't have an account: Sign up</Link>
        </div>

    );

}

export default Login;