import React from "react";
import '../App.css';
import { useState } from "react";
import NavBar from "./NavBar";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Card, Form, Button } from 'react-bootstrap';
import Swal from "sweetalert2";

const BasicInfo = () => {
    const [contact_address, setContactAddress] = useState('');
    const [contact_phone, setContactPhone] = useState('');
    const [contact_email, setContactEmail] = useState('');
    const [available_facilities, setAvailableFacilities] = useState('');
    const [hotel_policy, setHotelPolicy] = useState('');
    const [check_in_time, setCheckInTime] = useState('');
    const [check_out_time, setCheckOutTime] = useState('');

    const handleAddBasicInfo = async (e) => {
        e.preventDefault();

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

            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Successfully added information.',
                showConfirmButton: false,
                timer: 5000,
            });
            console.log(docRef);

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong.',
                showConfirmButton: false,
                timer: 5000,
            });
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div>
            <NavBar />
            <Card className="container-info">
                <Card.Body>
                    <Card.Title>Add & Update our hotel basic info:</Card.Title>
                    <Form>
                        <Form.Group controlId="contactAddress">
                            <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                onChange={(event) => setContactAddress(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="contactPhone">
                            <Form.Control
                                type="text"
                                placeholder="Enter Phone"
                                onChange={(event) => setContactPhone(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="contactEmail">
                            <Form.Control
                                type="text"
                                placeholder="Enter Email"
                                onChange={(event) => setContactEmail(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="availableFacilities">
                            <Form.Label>Enter our available facilities:</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Available facilities"
                                onChange={(event) => setAvailableFacilities(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="hotelPolicy">
                            <Form.Label>Enter our hotel policy:</Form.Label>
                            <Form.Control
                                as="textarea"
                                onChange={(event) => setHotelPolicy(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="checkInTime">
                            <Form.Label>Select check in time:</Form.Label>
                            <Form.Control
                                type="time"
                                onChange={(event) => setCheckInTime(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="checkOutTime">
                            <Form.Label>Select check out time:</Form.Label>
                            <Form.Control
                                type="time"
                                onChange={(event) => setCheckOutTime(event.target.value)}
                            />
                        </Form.Group>

                        <Button onClick={handleAddBasicInfo}>Save Info</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BasicInfo;
