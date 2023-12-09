import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'; // Import Firebase Auth functions



const NavBar = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Store user information

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
                navigate('/');
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
                        <a className="nav-link" href="/home">
                            HOME
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Rooms">
                            ROOMS
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Bookings">
                            BOOKINGS
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/gallerypage">
                            GALLERY
                        </a>
                    </li>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="primary"
                            id="dropdown-basic"
                            className="nav-dropdown"
                        >
                            MORE
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/NewRoom">ADD ROOM</Dropdown.Item>
                            <Dropdown.Item href="/AboutUs">ABOUT</Dropdown.Item>
                            <Dropdown.Item href="/Services">SERVICE</Dropdown.Item>
                            <Dropdown.Item href="/BasicInfo">SETTINGS</Dropdown.Item>
                            <Dropdown.Item href="/contact">CONTACT</Dropdown.Item>
                            <Dropdown.Item href="/regist">ADD ADMIN</Dropdown.Item>
                            {user ? (
                                // Render "Sign Out" item if user is signed in
                                <Dropdown.Item onClick={signOut}>SIGN OUT</Dropdown.Item>
                            ) : (
                                // Render "Sign In" item if user is not signed in
                                <Dropdown.Item href="/login">SIGN IN</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar;