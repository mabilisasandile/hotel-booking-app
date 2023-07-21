
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserAuthContextProvider } from './components/AuthProvider';
import PrivateRoutes from '../src/components/PrivateRoutes';
import Login from "./components/Login"
import Regist from './components/Regist';


//Admin pages...
import Home from "./admin/Home"
import ResetPassword from "./components/ResetPassword";
import NewRoom from './admin/NewRoom';
import Services from './admin/Services';
import Rooms from './admin/Rooms';
import NavBar from './admin/NavBar';
import BasicInfo from './admin/BasicInfo';
import AboutUs from './admin/AboutUs';
import RoomEdit from './admin/RoomEdit';
import Bookings from './admin/Bookings';
import EditBooking from './admin/EditBooking';


//Client pages...
import HomeClient from "./client/HomeClient";
import ViewRooms from "./client/ViewRooms";
import SpecialOffers from "./client/SpecialOffers";
import AboutUsClient from "./client/AboutUsClient";
import ContactUs from "./client/ContactUs";
import RoomAvailability from "./client/RoomAvailability";
import Book from './client/Book';
import Booking from './client/Booking';


function App() {

  return (

    <UserAuthContextProvider>
      <Router>
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/regist" element={<Regist />} />
            <Route path="/resetpassword" element={<ResetPassword />} />

            {/* Admin routes */}
            <Route path="/home" element={<PrivateRoutes><Home /></PrivateRoutes>} />
            <Route path="/newroom" element={<NewRoom />} />
            <Route path="/services" element={<Services />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/navbar" element={<NavBar />} />
            <Route path="/basicinfo" element={<BasicInfo />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/roomedit" element={<RoomEdit />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/editbooking" element={<EditBooking />} />

            {/* Client routes */}
            <Route path="/" element={<HomeClient />} />
            <Route path="/viewrooms" element={<ViewRooms />} />
            <Route path="/specialoffers" element={<SpecialOffers />} />
            <Route path="/aboutusclient" element={<AboutUsClient />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/roomavailability" element={<RoomAvailability />} />
            <Route path="/book" element={<Book />} />
            <Route path="/booking" element={<PrivateRoutes><Booking /></PrivateRoutes>} />
          </Routes>
        </>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
