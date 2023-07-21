import React, { useState } from "react";
import NavBar from "./NavBar";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";


const EditBooking = ({ booking_info }) => {

    const location = useLocation();
    const bookingData = location.state.booking_info;

    console.log("SELECTED BOOKING INFO:", bookingData);

    const [id, setId] = useState(bookingData.id);
    const [fName, setFName] = useState(bookingData.fname);
    const [lName, setLName] = useState(bookingData.lname);
    const [email, setEmail] = useState(bookingData.email);
    const [room_type, setRoomType] = useState(bookingData.room_type);
    const [num_of_guests, setNumOfGuests] = useState(bookingData.num_of_guests);
    const [arrivalDate, setArrivalDate] = useState(bookingData.arrivalDate);
    const [arrivalTime, setArrivalTime] = useState(bookingData.arrivalTime);
    const [departureDate, setDepartureDate] = useState(bookingData.departureDate);
    const [pickUpOption, setPickUpOption] = useState(bookingData.pickUpOption);
    const [specialRequests, setSpecialRequests] = useState(bookingData.specialRequests);

    //Editing the room details
    const handleEditBookingInfo = async (e) => {
        e.preventDefault();

        if (!fName || !lName || !email || !room_type || !num_of_guests || !arrivalDate
            || !arrivalTime || !departureDate || !pickUpOption || !specialRequests) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
                timer: 3000,
            });
        }

        const booking = {
            id,
            fName,
            lName,
            email,
            room_type,
            num_of_guests,
            arrivalDate,
            arrivalTime,
            departureDate,
            pickUpOption,
            specialRequests,
        };

        await setDoc(doc(db, "bookings", id), {
            ...booking
        });

        //Success message popup
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Booking successfully updated.',
            showConfirmButton: false,
            timer: 3000,
        });

    }

    return (
        <div className="container-edit-booking">
            <NavBar />
            <h1>Make necessary changes to this booking</h1>
            <br />
            <>
                {/* <img src={selectedRoom.imageURL} className="img-rooms" alt="banner" /> */}
            </>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Name(s)</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                className="input1-book-room "
                                placeholder="First Name"
                                value={fName}
                                onChange={(event) => setFName(event.target.value)} />
                            <input
                                type="text"
                                className="input1-book-room "
                                placeholder="Last Name"
                                value={lName}
                                onChange={(event) => setLName(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>E-mail</label>
                        </td>
                        <td>
                            <input
                                type="email"
                                className="input2-book-room "
                                placeholder="example@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Room Type</label>
                        </td>
                        <td>
                            <select className="select-add-room" value={room_type} onChange={(e) => setRoomType(e.target.value)}>
                                <option value="">Select room type..</option>
                                <option value="double">Standard Room (1 to 2 People)</option>
                                <option value="triple">Private Room (1 to 3)</option>
                                <option value="Quad">Family Room (1 to 4)</option>
                                <option value="mix">Mix Dorm Room (6 People)</option>
                                <option value="Queen">Female Dorm Room (6 people)</option>
                                <option value="King">Male Dorm Room (6 people)</option>
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
                                className="input2-book-room "
                                placeholder="0"
                                value={num_of_guests}
                                onChange={(event) => setNumOfGuests(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Arrival Date & Time</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                id="date"
                                value={arrivalDate}
                                className="input1-book-room"
                                onChange={(event) => setArrivalDate(event.target.value)} />
                        </td>
                        <td>
                            <input
                                type="time"
                                id="time"
                                className="input3-book-room"
                                value={arrivalTime}
                                onChange={(event) => setArrivalTime(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>departure Date</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                id="date"
                                value={departureDate}
                                onChange={(event) => setDepartureDate(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Free Pickup?
                        </td>
                        <td>
                            <select className="select-add-room" value={pickUpOption} onChange={(e) => setPickUpOption(e.target.value)}>
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
                                className="input-information"
                                value={specialRequests}
                                onChange={(event) => setSpecialRequests(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td>
                            <button onClick={handleEditBookingInfo}>Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
    );
};

export default EditBooking;
