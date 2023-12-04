import React, { useState, useEffect } from 'react';
import '../App.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'; // Import Firebase Auth functions


const NavBarClient = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Store user information
    // const today = new Date();

    useEffect(() => {
        const auth = getAuth();

        // Check the user's authentication status
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });
    }, []);

    const signOut = () => {
        const auth = getAuth();

        firebaseSignOut(auth)
            .then(() => {
                // Sign-out successful, redirect to the sign-in page or any other desired location
                navigate('/signin');
            })
            .catch((error) => {
                // An error occurred during sign-out.
                console.error('Sign out error: ', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong.',
                    showConfirmButton: false,
                    timer: 3000,
                });
            });
    };

    return (
        <nav className="navbar navbar-expand-lg my-navbar">
            <a className="navbar-brand" href="#">
                BlueHaven
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">
                            HOME
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/ViewRooms">
                            ROOMS
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/SpecialOffers">
                            SPECIALS
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/aboutusclient">
                            ABOUT US
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/contactus">
                            CONTACT US
                        </a>
                    </li>
                    {user ? (
                        // Render "Sign Out" item if user is signed in
                        <li className="nav-item">
                            <a className="nav-link" onClick={signOut}>
                                SIGN OUT
                            </a>
                        </li>
                    ) : (
                        // Render "Sign In" item if user is not signed in
                        <li className="nav-item">
                            <a className="nav-link" href="/signin">
                                SIGN IN
                            </a>
                        </li>
                    )}

                </ul>
            </div>
        </nav>
    );
};

export default NavBarClient;
