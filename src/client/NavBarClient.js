import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import hotelLogo from '../images/hotel-logo.jpg';
import homeIcon from '../icons/home-icon.png';
import SignOut from '../icons/logout-icon.png';


const NavBarClient = () => {

    const navigate = useNavigate();

    const GotoHomePage =()=>{
        navigate('/');
    }

    const GoToSignInPage =()=>{
        navigate('/Login');
    }

    return (
            <div className='nav-container'>
                <nav>
                <span> 
                <img src={hotelLogo} className="logo-image" alt="banner" /> 
                <img src={homeIcon} className="home-icon" onClick={GotoHomePage} alt="banner" />
                </span>
                    <Link to="/ViewRooms" className='nav-items'><b>View Rooms</b></Link>
                    <Link to="/SpecialOffers" className='nav-items'><b>Special Offers</b></Link>
                    <Link to="/Booking" className='nav-items'><b>Booking</b></Link>
                    <Link to="/AboutUsClient" className='nav-items'><b>About Us</b></Link>
                    <Link to="/ContactUs" className='nav-items'><b>Contact Us</b></Link>

                    <img src={SignOut} className="logout-icon" onClick={GoToSignInPage} alt="banner" />
                </nav>
                
            </div>
    )
}
export default NavBarClient;