import React from "react";
import '../App.css';
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

//Import the 'Swal.fire' function to display alerts
import Swal from "sweetalert2";

const CheckRoom =()=>{

    return(
        <div>
            <h2>Check the room availability</h2>
            
        </div>
    );
}