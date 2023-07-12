
import React from 'react';
import Home from "./admin/home";
import SignIn from "./admin/SignIn";
import Login from "./client/Login"
import SignUp from "./client/SignUp";
import ResetPassword from "./admin/ResetPassword";
import NewRoom from './admin/NewRoom';
import Services from './admin/Services';
import Rooms from './admin/Rooms';
import NavBar from './admin/NavBar';
import Regist from './admin/Regist';
import BasicInfo from './admin/BasicInfo';
import AboutUs from './admin/AboutUs';
import RoomEdit from './admin/RoomEdit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import { db } from './config/firebase';
import { collection, addDoc } from 'firebase/firestore';

function App() {

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/newroom" element={<NewRoom />} />
          <Route path="/services" element={<Services />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/navbar" element={<NavBar />} />
          <Route path="/basicinfo" element={<BasicInfo />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/roomedit" element={<RoomEdit />} />
        </Routes>       
      </>
    </Router>
  );
}

export default App;
