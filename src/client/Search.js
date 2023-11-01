import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBed, faMoneyCheck, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";

const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const navigate = useNavigate();

    // Search data specified from the search input
    const fetchData = async () => {
        const data = await getDocs(
            query(collection(db, "rooms"),
                where("room_type", "==", searchInput.toLowerCase()))
        );
        setSearchResults(data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        })));
    };

    // View room availability
    const handleAvailability = (id) => {
        const [room_data] = searchResults.filter((room) => room.id === id);
        setIsChecking(true);
        navigate("/roomavailability", { state: { room_data: room_data } });
    };

    // Book the room
    const handleBooking = (id) => {
        const [room] = searchResults.filter((room) => room.id === id);
        console.log("room data:", room);
        setIsBooking(true);
        navigate("/book", { state: { room: room } });
    };

    return (
        <div>
            <div className="d-flex container-search">
                <input
                    type="text"
                    className="form-control input-search"
                    placeholder="Search room type..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button className="btn-search" onClick={fetchData}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
            </div>
            <div className="row">
                {searchResults.map((room) => (
                    <div className="col-4 card-room-view" key={room.id}>
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
                                <Button
                                    variant="primary"
                                    className="btn-check-room"
                                    onClick={() => handleAvailability(room.id)}
                                >
                                    Check Room Availability
                                </Button>
                                <Button
                                    variant="primary"
                                    className="btn-check-room"
                                    onClick={() => handleBooking(room.id, room.value)}
                                >
                                    Reserve Room
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
