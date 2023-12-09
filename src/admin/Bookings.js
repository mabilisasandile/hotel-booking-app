import React, { useState, useEffect } from "react";
import '../App.css';
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();
    let booking = [];

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "bookings"));

            const bookings = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setBookings(bookings);
            console.log("Bookings data:", bookings);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    };

    const handleEdit = (id) => {
        const [booking_info] = bookings.filter(booking => booking.id === id);

        const booking_id = booking_info.id;

        navigate('/EditBooking', { state: { booking_info: booking_info } });
    };

    const handleDelete = id => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                booking = bookings.filter(room => booking.id === id);
                deleteDoc(doc(db, "bookings", id)).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Booking deleted.',
                        showConfirmButton: false,
                        timer: 3000,
                    });

                    const bookingsCopy = bookings.filter(room => booking.id !== id);
                    setBookings(bookingsCopy);
                    getBookings();
                });
            }
        });
    }

    return (
        <div className="container-view-bookings">

            <NavBar />
            <div>
                <br></br>
                <br></br>
                {bookings.length < 1 ? (
                    <div style={{ marginTop: '40px', height: '400px' }}>
                        <h5 style={{ color: 'white' }}>Loading...</h5>
                    </div>
                ) : (
                    <h3 style={{ color: 'white' }}>Clients and Rooms Reserved</h3>
                )}

            </div>
            <Container>
                <Row>
                    {bookings.map((booking) => (
                        <Col key={booking.id} xs={12} sm={6} md={4}>
                            <Card className="card-room-view">
                                <Card.Body>
                                    <Card.Text>
                                        Arrival Date & Time: {booking.arrivalDate} {booking.arrivalTime}
                                    </Card.Text>
                                    <Card.Text>
                                        Room ID: {booking.room_id}
                                    </Card.Text>
                                    <Card.Title>
                                        {booking.room_type}
                                    </Card.Title>
                                    <Card.Text>
                                        Booking Code: {booking.id}
                                    </Card.Text>
                                    <Card.Text>
                                        Client Name(s): {booking.fName} {booking.lName}
                                    </Card.Text>
                                    <Card.Text>
                                        E-mail: {booking.email}
                                    </Card.Text>
                                    <Card.Text>
                                        Number of Guests: {booking.num_of_guests}
                                    </Card.Text>
                                    <Card.Text>
                                        Departure Date: {booking.departureDate}
                                    </Card.Text>
                                    <Card.Text>
                                        Pick Up? : {booking.pickUpOption}
                                    </Card.Text>
                                    <Card.Text>
                                        Request(s)? : {booking.specialRequests}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        className="btn-edit"
                                        onClick={() => handleEdit(booking.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="btn-delete"
                                        onClick={() => handleDelete(booking.id, booking.value)}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default Bookings;
