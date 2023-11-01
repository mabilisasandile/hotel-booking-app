import React from "react";
import '../App.css';
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button } from "react-bootstrap";
import { auth } from "../config/firebase";
import FooterClient from "./FooterClient";


const Book = ({ room }) => {

    const location = useLocation();
    const roomData = location.state.room;


    const [room_id, setRoomId] = useState(roomData.id);
    const [image_url, setImageUrl] = useState(roomData.imageURL)
    const [room_type, setRoomType] = useState(roomData.room_type);
    const [room_description, setRoomDescription] = useState(roomData.room_description);
    const [price, setPrice] = useState(roomData.price);
    const [total_occupants, setTotalOccupants] = useState(roomData.total_occupants);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [num_of_guests, setNumOfGuests] = useState(0);
    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [pickUpOption, setPickUpOption] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [showModal, setShowModal] = useState(false);
    // const [user, setUser] = useState(null);

    const user = auth.currentUser;

    // Get today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and format to two digits
    const day = String(today.getDate()).padStart(2, '0'); // Format day to two digits

    const currentDate = `${year}-${month}-${day}`;


    useEffect(() => {
        setEmail(user.email);
        console.log("User logged in:", user);
    }, []);



    const handleShowModal = () => {
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };


    const handleBooking = (async (e) => {
        e.preventDefault()

        //store data into firestore database
        if (arrivalDate >= currentDate) {
            try {
                const docRef = await addDoc(collection(db, "bookings"), {
                    fname: fName,
                    lname: lName,
                    email: email,
                    phone: phone,
                    room_id: room_id,
                    room_type: room_type,
                    room_description: room_description,
                    num_of_guests: num_of_guests,
                    arrivalDate: arrivalDate,
                    arrivalTime: arrivalTime,
                    departureDate: departureDate,
                    pickUpOption: pickUpOption,
                    specialRequests: specialRequests,
                });
    
                console.log(docRef);
                //Success popup
                Swal.fire({
                    icon: 'success',
                    title: 'Saved!',
                    text: 'Successfully saved your booking.',
                    showConfirmButton: false,
                    timer: 3000,
                });
    
            } catch (error) {
                console.error('Error adding document: ', error);
                //Success popup
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'Error occurred while adding the booking.Please try again...',
                    showConfirmButton: false,
                    timer: 3000,
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
        
    });

    return (
        <div>
            <div className="container-book">
                <Link to="/ViewRooms" className='return-back-link'><b>Return Back</b></Link>
                <h2>Hotel Booking</h2> <br />
                <h4>Experience something new every moment</h4>
                <div>
                    <img src={image_url} className="img-book-form" alt="banner" />
                    <br></br>
                    <br></br>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '100px' }}>
                        <p><b> Details | </b></p>
                        <p> <b> | </b> {room_type} <b> | </b></p>
                        <p> <b> | </b> {room_description} <b> | </b></p>
                        <p> <b> | </b> R{price} <b> | </b></p>
                        <p> <b> | </b> Accomodates up to {total_occupants} people <b>||</b></p>
                    </div>
                </div>


                {/*  Large modal */}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleShowModal}
                >
                    Reserve Room
                </button>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reserve Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label>Room ID.</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="input2-book-room"
                                            placeholder={room_id}
                                            value={room_id}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Name</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="input1-book-room"
                                            placeholder="First Name"
                                            onChange={(event) => setFName(event.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="input1-book-room"
                                            placeholder="Last Name"
                                            onChange={(event) => setLName(event.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>E-mail</label>
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            className="input2-book-room"
                                            placeholder={email}
                                            value={email}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Phone</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="input2-book-room"
                                            placeholder="Enter your phone number"
                                            onChange={(e) => setPhone(e.target.value)}
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
                                            className="input2-book-room"
                                            placeholder="Room Type"
                                            value={room_type}
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
                                            className="input2-book-room"
                                            placeholder={room_description}
                                            value={room_description}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Number of Guests</label>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="input1-book-room"
                                            placeholder="0"
                                            onChange={(event) => setNumOfGuests(event.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Arrival Date & Time</label>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            className="input1-book-room"
                                            onChange={(event) => setArrivalDate(event.target.value)}
                                        />

                                        <input
                                            type="time"
                                            className="input3-book-room"
                                            onChange={(event) => setArrivalTime(event.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Departure Date</label>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            className="input1-book-room"
                                            onChange={(event) => setDepartureDate(event.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Free Pickup?
                                    </td>
                                    <td>
                                        <select className="select-book-room" value={pickUpOption} onChange={(e) => setPickUpOption(e.target.value)}>
                                            <option value="Yes Please">Yes Please! - Pick me up on arrival</option>
                                            <option value="No Thanks">No Thanks - I'll make my own way there</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Special Requests</label>
                                    </td>
                                    <td>
                                        <textarea
                                            type="text"
                                            className="input-book-requests"
                                            onChange={(event) => setSpecialRequests(event.target.value)}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleBooking}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">

                        </div>
                    </div>
                </div>



            </div>
            <div>

            </div>
        </div>
    )
}
export default Book;