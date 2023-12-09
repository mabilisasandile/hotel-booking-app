
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserAuthContextProvider } from './components/AuthProvider';
import PrivateRoutes from '../src/components/PrivateRoutes';
import ResetPassword from "./components/ResetPassword";

//Admin pages...
import Home from "./admin/home";
import NewRoom from './admin/NewRoom';
import Services from './admin/Services';
import Rooms from './admin/Rooms';
import NavBar from './admin/NavBar';
import BasicInfo from './admin/BasicInfo';
import AboutUs from './admin/AboutUs';
import Contact from './admin/Contact';
import RoomEdit from './admin/RoomEdit';
import Bookings from './admin/Bookings';
import EditBooking from './admin/EditBooking';
import Regist from './admin/Regist';
import Login from './admin/Login';
import GalleryPage from './admin/GalleryPage';


//Client pages...
import HomeClient from "./client/HomeClient";
import ViewRooms from "./client/ViewRooms";
import SpecialOffers from "./client/SpecialOffers";
import AboutUsClient from "./client/AboutUsClient";
import ContactUs from "./client/ContactUs";
import RoomAvailability from "./client/RoomAvailability";
import Book from './client/Book';
import HeroesClient from './client/HeroesClient';
import SignUp from './client/SignUp';
import SignIn from './client/SignIn';
import GalleryClient from './client/GalleryClient';


function App() {


  return (

    <UserAuthContextProvider>
      <Router>
        <>
          <Routes>
            <Route path="/resetpassword" element={<ResetPassword />} />

            {/* Admin routes */}
            <Route path="/home" element={<PrivateRoutes><Home /></PrivateRoutes>} />
            <Route path="/regist" element={<Regist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newroom" element={<NewRoom />} />
            <Route path="/services" element={<Services />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/navbar" element={<NavBar />} />
            <Route path="/basicinfo" element={<BasicInfo />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/roomedit" element={<RoomEdit />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/editbooking" element={<EditBooking />} />
            <Route path="/gallerypage" element={<GalleryPage />} />

            {/* Client routes */}
            <Route path="/" element={<HomeClient />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/viewrooms" element={<ViewRooms />} />
            <Route path="/specialoffers" element={<SpecialOffers />} />
            <Route path="/aboutusclient" element={<AboutUsClient />} />
            <Route path="/herosclient" element={<HeroesClient />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/roomavailability" element={<RoomAvailability />} />
            <Route path="/galleryclient" element={<GalleryClient />} />
            <Route path="/book" element={<PrivateRoutes><Book /></PrivateRoutes>} />
          </Routes>
        </>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
