import React from "react";
import '../App.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import NavBarClient from "./NavBarClient";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { query, where } from "firebase/firestore";


const RoomAvailability = (room_data) => {

    const location = useLocation();
    const roomData = location.state.room_data;

    console.log("Room availability:", roomData);
    

    const selected_room_id = useState(roomData.room_id)
    const [room_type, setRoomType] = useState(roomData.room_type);
    const [room_description, setRoomDescription] = useState(roomData.room_description);
    const [imageURL, setImageURL] = useState(roomData.imageURL);
    const [bookedCheckInDate, setBookedCheckeInDate] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [booking, setBooking] = useState([]);

    console.log("Selected Room ID:", selected_room_id);

    const handleCheckUp = () => {

    }

    const getBookings = async () => {
        try {
            const data = await getDocs(query(collection(db, "bookings")
                , where("room_id", "===", selected_room_id)));

            const booking_info = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            console.log("Booking data:", booking_info);
        } catch (error) {
            console.log("Failed to fetch data", error);
            alert("Cannot determine that at the moment");
        }
    };

    return (
        <div>
            <NavBarClient />
            <table>
                <tbody>
                    <tr>
                        <td>
                        <input
                                type="text"
                                className="input1-book-room"
                                value={selected_room_id}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="date"
                                className="input1-book-room"
                                onChange={(event) => setCheckInDate(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <button onClick={getBookings}>Check bookings</button>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
export default RoomAvailability;