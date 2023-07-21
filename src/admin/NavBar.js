import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import hotelLogo from '../images/hotel-logo.jpg';
import homeIcon from '../icons/home-icon.png';
import SignOut from '../icons/logout-icon.png';


const NavBar = () => {

    const navigate = useNavigate();

    const GotoHomePage =()=>{
        navigate('/home');
    }

    const GoToSignInPage =()=>{
        navigate('/SignIn');
    }

    return (
            <div className='nav-container'>
                <nav>
                <span> 
                <img src={hotelLogo} className="logo-image" alt="banner" /> 
                <img src={homeIcon} className="home-icon" onClick={GotoHomePage} alt="banner" />
                </span>
                    <Link to="/Rooms" className='nav-items'><b>View Rooms</b></Link>
                    <Link to="/NewRoom" className='nav-items'><b>Add New Room</b></Link>
                    <Link to="/Bookings" className='nav-items'><b>Bookings</b></Link>
                    <Link to="/Services" className='nav-items'><b>Special Offers</b></Link>
                    <Link to="/AboutUs" className='nav-items'><b>About Us</b></Link>
                    <Link to="/BasicInfo" className='nav-items'><b>Information</b></Link>

                    <img src={SignOut} className="logout-icon" onClick={GoToSignInPage} alt="banner" />
                </nav>
                
            </div>
    )
}
export default NavBar;
