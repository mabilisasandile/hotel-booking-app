import React, { useEffect } from "react";
import '../App.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import NavBarClient from "./NavBarClient";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { query, where } from "firebase/firestore";
import Swal from "sweetalert2";


const RoomAvailability = (room_data) => {

    const location = useLocation();
    const roomData = location.state.room_data;

    // console.log("Room availability:", roomData);


    const [selected_room_id, setSelectedRoomId] = useState(roomData.id)
    const [room_type, setRoomType] = useState(roomData.room_type);
    const [room_description, setRoomDescription] = useState(roomData.room_description);
    const [imageURL, setImageURL] = useState(roomData.imageURL);
    const [bookedDate, setBookedDate] = useState('');
    const [departure_date, setDepartureDate] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [booking, setBooking] = useState([]);
    let [isBooked, setIsBooked] = useState(false);

    // console.log("Selected Room ID:", selected_room_id);

    const handleCheckUp = async () => {

        try {
            const data = await getDocs(query(collection(db, "bookings")
                , where("room_id", "==", selected_room_id)));

            const [booking_info] = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            console.log("Booking data:", booking_info);
            console.log("Room booked for date:", booking_info.arrivalDate);

            setBooking(booking_info)
            setBookedDate(booking_info.arrivalDate);
            setDepartureDate(booking_info.departureDate);

        } catch (error) {
            console.log("No booking data found:", error);
        }

        if (bookedDate != '') {
            setIsBooked(true);
        }

        if (bookedDate >= checkInDate && bookedDate <= checkOutDate) {
            Swal.fire({
                icon: 'warning',
                title: 'warning!',
                text: 'Room fully booked on this date range, please choose a different date/room!',
                showConfirmButton: true,
                timer: 8000,
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'info!',
                text: 'Room available for booking on the specified date range.',
                showConfirmButton: true,
                timer: 8000,
            });
        }

    };

    return (
        <div className="container-book">
            <NavBarClient />
            <br></br>
            <Link to="/ViewRooms" className='return-back-link'><b>Return Back</b></Link>
            <br></br>
            <img src={imageURL} className="img-book-form" alt="banner" />
            <div>
                {isBooked && <h3>NB! Room fully booked for Date: {bookedDate} until {departure_date}</h3>}
            </div>
            <table>
                <tbody>
                    <br></br>
                    <br></br>
                    <tr>
                        <td>
                            <label>Room ID</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                className="input-check-room"
                                value={selected_room_id}
                                onChange={(event) => setSelectedRoomId(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Room Type</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                className="input-check-room"
                                value={room_type}
                                onChange={(event) => setRoomType(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Room Description</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                className="input-check-room"
                                value={room_description}
                                onChange={(event) => setRoomDescription(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Check In Date</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                className="input1-book-room"
                                value={checkInDate}
                                onChange={(event) => setCheckInDate(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Check Out Date</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                className="input1-book-room"
                                value={checkOutDate}
                                onChange={(event) => setCheckOutDate(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className="btn-check-room" onClick={handleCheckUp}>Check Availability</button>
                        </td>
                    </tr>
                    <br></br>
                    <br></br>
                </tbody>
            </table>

        </div>
    )
}
export default RoomAvailability;