import React from "react";
import '../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { addDoc, collection, doc } from "firebase/firestore";
import Swal from "sweetalert2";


const Regist = () => {
    const navigate = useNavigate();
    const history = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (({ navigation }) => {
        createUserWithEmailAndPassword(auth, email, password).then(async () => {

            const user = auth.currentUser;
            const userId = user.uid;

            // const docRef = await addDoc(collection(db, 'users', userId), {
            const docRef = await addDoc(collection(db, 'users'), {
                user_id: user.uid,
                email: email,
                role: "admin"
            });

            console.log("New user:", docRef);

            // Handle successful signup
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Successfully registered.',
                showConfirmButton: false,
                timer: 3000,
            });
            console.log("Signed Up Successfully.");
            history.push("/login");
            navigate('/login');

        }).catch((error) => {

            // Handle signup error
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong.',
                showConfirmButton: false,
                timer: 3000,
            });
            console.log("Failed to register!", error);

        })
    })



    return (
        <div className="container-signup">
            <h1> Admin Registration</h1>
            <br></br>
            <input className="input-signup" type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} /> <br />
            <br></br>
            <input className="input-signup" type="password" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} /> <br />
            <br></br>
            <button className="btn-3" onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Regist;
