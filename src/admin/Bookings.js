import React, { useState, useEffect } from "react";
import '../App.css';
import NavBar from "./NavBar";
import Footer from "./Footer";
import EditBooking from "./EditBooking";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

//Import the 'Swal.fire' function to display alerts
import Swal from "sweetalert2";

const Rooms = () => {
    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();
    let booking = [];

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "bookings"));

            const bookings = querySnapshot.docs.map((doc) => ({id: doc.id,
                ...doc.data()
            }));

            setBookings(bookings);
            console.log("Bookings data:", bookings);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    };

    //Go to view and edit room page
    const handleEdit = (id) => {
        console.log("View ID:", id);
        const [booking_info] = bookings.filter(booking => booking.id === id);

        console.log("Selected booking info:", booking_info);
        
        const booking_id = booking_info.id;
        console.log("Booking_id: ", booking_id);
        
        navigate('/EditBooking', {state: {booking_info: booking_info}} );

    };
     
    //Cancel a booking
    const handleDelete = id => {

        //Warning popup
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                //Get the booking to be deleted
                booking = bookings.filter(room => booking.id === id);

                //Delete booking from the database (firestore)
                deleteDoc(doc(db, "bookings", id));

                //Success popup
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Data has been deleted.',
                    showConfirmButton: false,
                    timer: 3000,
                });

                const bookingsCopy = bookings.filter(room => booking.id !== id);
                setBookings(bookingsCopy);    //Update the state with the new list
            }
        });
    }

    return (
        <div className="container-view-rooms">
            
            <NavBar />
            
            <br />
            <button onClick={getBookings}>Click To View Our Booings</button>
            <br />
            <table className="table-view-bookings">
            
                <thead>
                    <tr>
                    <h2>Bookings: </h2>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>
                                <img src={booking.imageURL} className="img-rooms" alt="banner" />
                                <p>Room ID: {booking.room_id}</p>
                                <p>Type: {booking.room_type}</p>
                            </td>
                            <td>
                                <p>Booking Code: {booking.id}</p>
                                <p>Client Name(s): {booking.fName} {booking.lName}</p>
                                <p>E-mail: {booking.email}</p>
                                <p>Number of Guests: {booking.num_of_guests}</p>
                                <p>Arrival Date & Time: {booking.arrivalDate} {booking.arrivalTime}</p>
                                <p>Departure Date: {booking.departureDate}</p>
                                <p>Pick Up? : {booking.pickUpOption}</p>
                                <p>Any Special Request(s)? : {booking.specialRequests}</p>
                                <button className="btn-edit" onClick={() => handleEdit(booking.id)}>Update Booking info</button> <br></br> <br></br>
                                <button className="btn-delete" onClick={() => handleDelete(booking.id, booking.value)}>Delete Booking</button> <br />
                            </td>                           
                        </tr>
                    ))}                   
                </tbody>
            </table>
            <Footer />
        </div>
    );
};

export default Rooms;
