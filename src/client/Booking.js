import React from "react";
import '../App.css';
import { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Booking = () => {

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [room_type, setRoomType] = useState('');
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
                room_type: room_type,
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
                <Link to="/" className='return-back-link'><b>Return Home</b></Link>
                <h2>Hotel Booking</h2> <br />
                <h4>Experience something new every moment</h4>
                <br></br>
                <Link to="/ViewRooms" className='return-back-link'><b>Check Available Rooms!</b></Link>
                <table>
                    <tbody>
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
                                <select className="select-book-room" value={room_type} onChange={(e) => setRoomType(e.target.value)}>
                                    <option value="">Select room type..</option>
                                    <option value="double">Standard Room (1 to 2 People)</option>
                                    <option value="triple">Private Room (1 to 3)</option>
                                    <option value="quad">Family Room (1 to 4)</option>
                                    <option value="mix">Mix Dorm Room (6 People)</option>
                                    <option value="queen">Female Dorm Room (6 people)</option>
                                    <option value="king" >Male Dorm Room (6 people)</option>

                                </select>
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
                                <button className="btn-book-room" onClick={handleBooking}>Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default Booking;