import React from "react";
import '../App.css';
import { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Book = ({ room }) => {

    const location = useLocation();
    const roomData = location.state.room;

    const [room_id, setRoomId] = useState(roomData.id);
    const [image_url, setImageUrl] = useState(roomData.imageURL)
    const [room_type, setRoomType] = useState(roomData.room_type);
    const [room_description, setRoomDescription] = useState(roomData.room_description);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [num_of_guests, setNumOfGuests] = useState(0);
    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [pickUpOption, setPickUpOption] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');

    const handleBooking = (async (e) => {
        e.preventDefault()

        //store data into firestore database
        try {
            const docRef = await addDoc(collection(db, "bookings"), {
                fname: fName,
                lname: lName,
                email: email,
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
    });

    return (
        <div>
            <div className="container-book">
                <Link to="/ViewRooms" className='return-back-link'><b>Return Back</b></Link>
                <h2>Hotel Booking</h2> <br />
                <h4>Experience something new every moment</h4>
                <img src={image_url} className="img-book-form" alt="banner" />
                <br></br>
                <br></br>
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
                                    placeholder="Room ID"
                                    value={room_id}
                                    onChange={(event) => setRoomId(event.target.value)}
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
                                    placeholder="example@example.com"
                                    onChange={(event) => setEmail(event.target.value)}
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
                                    className="input2-book-room"
                                    placeholder="Room Description"
                                    value={room_description}
                                    onChange={(event) => setRoomDescription(event.target.value)}
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
                        <tr>
                            <td> </td>
                            <td>
                                <button className="btn-book-room" onClick={handleBooking}>Confirm Booking</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default Book;