import React, { useState, useEffect } from "react";
import '../App.css';
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import RoomEdit from "./RoomEdit";
import Footer from "./Footer";
import Swal from "sweetalert2";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Rooms = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "rooms"));

            const rooms = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setRooms(rooms);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    };

    const handleEdit = async (id) => {
        const [room] = rooms.filter((room) => room.id === id);
        setSelectedRoom(room);
        setIsEditing(true);
        navigate('/roomedit', { state: { room: room } });
    };

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.value) {
                deleteDoc(doc(db, "rooms", id)).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Data has been deleted.',
                        showConfirmButton: false,
                        timer: 3000,
                    });

                    const roomsCopy = rooms.filter((room) => room.id !== id);
                    setRooms(roomsCopy);
                });
            }
        });
    };

    return (
        <div className="container-view-rooms">
            <NavBar />
            <div style={{ marginTop: '50px', minHeight: '500px' }}>

                <div>
                    <h1>Rooms Page</h1>
                    <br />
                    <br />
                    {rooms.length < 1 ? (
                        <h5>Loading...</h5>
                    ) : (
                        <h5>You can make necessary changes here. </h5>
                    )}
                </div>

                <Container>
                    <Row>
                        {rooms.map((room) => (
                            <Col key={room.id} xs={12} sm={6} md={4}>
                                <Card className="card-room-view">
                                    <Card.Img variant="top" src={room.imageURL} className="img-rooms" alt="banner" />
                                    <Card.Body>
                                        <Card.Text>
                                            Room ID: {room.id}
                                        </Card.Text>
                                        <Card.Title>
                                            {room.room_type}
                                        </Card.Title>
                                        <Card.Text>
                                            Room Description: {room.room_description}
                                        </Card.Text>
                                        <Card.Text>
                                            No. of beds: {room.no_of_beds}
                                        </Card.Text>
                                        <Card.Text>
                                            Price: R{room.price}
                                        </Card.Text>
                                        <Card.Text>
                                            Max occupants: {room.total_occupants}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            className="btn-edit"
                                            onClick={() => handleEdit(room.id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="btn-delete"
                                            onClick={() => handleDelete(room.id, room.value)}
                                        >
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Rooms;