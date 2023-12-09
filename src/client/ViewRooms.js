import React, { useState, useEffect } from "react";
import "../App.css";
import NavBarClient from "./NavBarClient";
import FooterClient from "./FooterClient";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMoneyCheck, faPeopleGroup, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Swal from "sweetalert2";

const Rooms = () => {
    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [data, setData] = useState([]);
    const [amountEntered, setAmountEntered] = useState(0);
    const [isFiltered, setIsFiltered] = useState(false);

    const user = auth.currentUser;


    useEffect(() => {
        getRooms();
        console.log("User data:", user);
    }, []);

    const getRooms = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "rooms"));

            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setRooms(data);
            console.log(data);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    };

    // Filter rooms with price range
    const handleFilteredData = async () => {
        try {
            const queryData = query(collection(db, "rooms"), where("price", "<=", parseInt(amountEntered)));

            const querySnapshot = await getDocs(queryData);
            let items = [];

            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                items.push(doc.data());
            });

            setData(items);

            setIsFiltered(true);

            console.log("View filtered data: ", items);
        } catch (error) {
            console.log("Failed to fetch filtered rooms: ", error);

            // Error popup
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to fetch filtered rooms!",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    // View room availability
    const handleAvailability = (id) => {
        const [room_data] = rooms.filter((room) => room.id === id);

        setSelectedRoom(room_data);
        setIsChecking(true);

        navigate("/roomAvailability", { state: { room_data: room_data } });
    };

    // Book the room
    const handleBooking = (id) => {
        const [room] = rooms.filter((room) => room.id === id);
        console.log("room data:", room);

        setSelectedRoom(room);

        if (user) {
            setIsBooking(true);
            navigate("/book", { state: { room: room } });
        }
        else {
            Swal.fire({
                icon: "Info",
                title: "Info.",
                text: "You need sign in to continue.",
                showConfirmButton: true,
                timer: 5000,
            });
            navigate("/signin");
        }

    };

    return (
        <div className="container-view-rooms">
            <NavBarClient />

            <div style={{ marginTop: '100px', height: 'auto' }}>
                <div className="col-12">
                    <h2>Rooms</h2>

                    <Search />

                    <div className="container-filter">
                        <label>Filter with price(R)</label>
                        <input
                            type="number"
                            className="input-search"
                            placeholder="Filter price(R) range..."
                            value={amountEntered}
                            onChange={(e) => setAmountEntered(e.target.value)}
                        />

                        <Button className="btn-filtered-rooms" onClick={handleFilteredData}>
                            <FontAwesomeIcon icon={faFilter} />
                        </Button>
                    </div>

                    <div style={{ marginTop: '100px', height: '400px' }}>
                        {rooms.length < 1 ? (
                            <h5>Loading...</h5>
                        ) : (
                            <h5>Select room to check availability or reserve. </h5>
                        )}
                    </div>

                </div>
            </div>

            <div className="row container-rooms">
                {isFiltered
                    ? data.map((room) => (
                        <div className="col-4 card-room-filter" key={room.id}>
                            <Card>
                                <Card.Img variant="top" src={room.imageURL} />
                                <Card.Body>
                                    <Card.Title>Type: {room.room_type}</Card.Title>
                                    <Card.Text>Description: {room.room_description}</Card.Text>
                                    <Card.Text>
                                        <FontAwesomeIcon icon={faBed} /> {room.no_of_beds}
                                    </Card.Text>
                                    <Card.Text>
                                        <FontAwesomeIcon icon={faMoneyCheck} /> R{room.price}
                                    </Card.Text>
                                    <Card.Text>
                                        <FontAwesomeIcon icon={faPeopleGroup} /> {room.total_occupants}
                                    </Card.Text>
                                    <div style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <button
                                            className="btn-check-room"
                                            onClick={() => handleAvailability(room.id)}
                                        >
                                            Check Availability
                                        </button>
                                        <button
                                            className="btn-check-room"
                                            onClick={() => handleBooking(room.id, room.value)}
                                        >
                                            Reserve Room
                                        </button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                    : rooms.map((room) => (
                        <div className="col-4 card-room-view" key={room.id}>
                            <Card>
                                <Card.Img variant="top" src={room.imageURL} />
                                <Card.Body>
                                    <Card.Title>Type: {room.room_type}</Card.Title>
                                    <Card.Text>{room.room_description}</Card.Text>
                                    <Card.Text>
                                        <FontAwesomeIcon icon={faBed} /> {room.no_of_beds}
                                    </Card.Text>
                                    <Card.Text>
                                        <FontAwesomeIcon icon={faMoneyCheck} /> R{room.price}
                                    </Card.Text>
                                    <Card.Text>
                                        <FontAwesomeIcon icon={faPeopleGroup} /> {room.total_occupants}
                                    </Card.Text>
                                    <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <button
                                            className="btn-check-room"
                                            onClick={() => handleAvailability(room.id)}
                                        >
                                            Check Availability
                                        </button>
                                        <button
                                            className="btn-check-room"
                                            onClick={() => handleBooking(room.id, room.value)}
                                        >
                                            Reserve Room
                                        </button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
            </div>
            <div>
                <FooterClient />
            </div>
        </div>
    );
};

export default Rooms;
