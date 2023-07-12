
import React from "react";
import '../App.css';
import { useState } from "react";
import NavBar from "./NavBar";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const BasicInfo =()=>{

    const [contact_address, setContactAddress] = useState('');
    const [contact_phone, setContactPhone] = useState('');
    const [contact_email, setContactEmail] = useState('');
    const [available_facilities, setAvailableFacilities] = useState('');
    const [hotel_policy, setHotelPolicy] = useState('');
    const [check_in_time, setCheckInTime] = useState('');
    const [check_out_time, setCheckOutTime] = useState('');
    //const [hotel_map, setHotelMap] = useState('');
    //const [social_media, setSocialMedia] = useState('');


    const handleAddBasicInfo = (async (e) => {
        e.preventDefault()

        try {
            const docRef = await addDoc(collection(db, "basicInformation"), {
                contact_address: contact_address,
                contact_phone: contact_phone,
                contact_email: contact_email,
                available_facilities: available_facilities,
                hotel_policy: hotel_policy,
                check_in_time: check_in_time,
                check_out_time: check_out_time
            });

            alert("Successfully added information");
            console.log(docRef);

        } catch (error) {
            console.error('Error adding document: ', error);
        }
    })

    return (
        <div>
            <NavBar />
            <form className="container-info">
                <h2>Add & Update our hotel basic info:</h2>
                <br></br>
                <input
                    type="text"
                    className="input-add-contact"
                    placeholder="Enter Address"
                    onChange={(event) => setContactAddress(event.target.value)} />
                <br></br>
                <br></br>
                <input
                    type="text"
                    className="input-add-contact"
                    placeholder="Enter Phone"
                    onChange={(event) => setContactPhone(event.target.value)} />
                <br></br>
                <br></br>
                <input
                    type="text"
                    className="input-add-contact"
                    placeholder="Enter Email"
                    onChange={(event) => setContactEmail(event.target.value)} />
                <br></br>
                <br></br>
                <label>Enter our available facilities:</label> <br></br>
                <textarea 
                    type="text"
                    className="input-information"
                    placeholder="Available facilities"
                    onChange={(event) => setAvailableFacilities(event.target.value)} />
                <br></br>
                <br></br>
                <label>Enter our hotel policy:</label> <br></br>
                <textarea 
                    type="text"
                    className="input-information"
                    onChange={(event) => setHotelPolicy(event.target.value)} />
                <br></br>
                <br></br>
                <label htmlFor="time">Select check in time:</label>
                <input
                    type="time"
                    id="time"
                    onChange={(event) => setCheckInTime(event.target.value)} />
                <br></br>
                <br></br>
                <label htmlFor="time">Select check out time:</label>
                <input
                    type="time"
                    id="time"
                    onChange={(event) => setCheckInTime(event.target.value)} />
                <br></br>
                <div>
                    <button>Save Info</button>
                </div>
            </form>
        </div>
    );
}

export default BasicInfo;