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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import FooterClient from './FooterClient';



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
    const [showModal, setShowModal] = useState(true);

    // Get today's date
    // const currentDate = new Date().toLocaleDateString();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and format to two digits
    const day = String(today.getDate()).padStart(2, '0'); // Format day to two digits

    const currentDate = `${year}-${month}-${day}`;

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

        if (bookedDate !== '') {
            setIsBooked(true);
        }

        console.log({ start: bookedDate >= checkInDate });
        console.log({ end: bookedDate <= checkOutDate });
        console.log("Today's date:", currentDate);
        console.log("Checkin date:", checkInDate);
        console.log("Checkout date:", checkOutDate);
        console.log({ start: checkInDate < currentDate });
        console.log({ end: checkInDate < currentDate });

        if (checkInDate >= currentDate) {
            if (checkInDate >= bookedDate) {
                if (checkOutDate <= departure_date) {
                    console.log('not available');
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning!',
                        text: 'Room fully booked on this date range, please choose a different date or room!',
                        showConfirmButton: true,
                        timer: 8000,
                    });
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning!',
                        text: `Room fully booked for date: ${bookedDate} to ${departure_date}`,
                        showConfirmButton: true,
                        timer: 10000,
                    });
                }

            } else {
                console.log('available');
                Swal.fire({
                    icon: 'info',
                    title: 'Info!',
                    text: 'Room available for booking on the specified date range.',
                    showConfirmButton: true,
                    timer: 8000,
                });
            }
        } else {
            //Return error response
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Invalid date selected!',
                showConfirmButton: true,
                timer: 8000,
            });
        }


    };


    const handleClose = () => {
        setShowModal(false);
    };

    const handleReOpen = () => {
        setShowModal(true);
    }



    return (
        <div className="container-book">
            <NavBarClient />
            <br></br>
            <Link to="/ViewRooms" className='return-back-link'><b>Return Back</b></Link>
            <br></br>
            <img src={imageURL} className="img-book-form" alt="banner" />
            <button className="btn-check-room" onClick={handleReOpen}>Show Checkup Form</button>

            <div>
                {isBooked && <h3>NB! Room fully booked for Date: {bookedDate} until {departure_date}</h3>}
            </div>

            {/* Render the modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Room Availability Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form content here */}
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
                                    // onChange={(event) => setSelectedRoomId(event.target.value)}
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
                                    // onChange={(event) => setRoomType(event.target.value)}
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
                                    // onChange={(event) => setRoomDescription(event.target.value)}
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
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCheckUp}>
                        Check Availability
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <FooterClient />
            </div>
        </div>
    );

}
export default RoomAvailability;