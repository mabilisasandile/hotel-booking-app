import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, getDocs, where } from "firebase/firestore";
import { auth, db } from '../config/firebase';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goToHomePage = async () => {
        try {
            // Sign in the user
            await signInWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;
            const userId = user.uid;

            // Fetch user data from Firestore
            const data = await getDocs(
                query(collection(db, "users"), where("user_id", "==", userId))
            );

            const searchResults = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            if (searchResults.length > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Successfully logged in.',
                    showConfirmButton: false,
                    timer: 3000,
                });

                navigate('/home');
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning!',
                    text: 'Only Admins permitted for this site.',
                    showConfirmButton: false,
                    timer: 5000,
                });
            }
        } catch (error) {
            console.log("Failed to login:", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Not authorized to access this site.',
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    return (
        <div className="container-signin">
            <h1>Username and Password required to sign in.</h1>
            <br></br>
            <input
                className="input-login"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="username" />
            <br></br>
            <input
                className="input-login"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="password" />
            <br></br>
            <button onClick={goToHomePage} className="btn-signin">Sign In</button>
            <br></br>
            {/* <Link to="/resetpassword" className="link-signup">Forgot password?</Link>  */}
        </div>
    );
}

export default Login;
