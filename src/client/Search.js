
import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBed, faMoneyCheck, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

const Search = () => {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    const [isBooking, setIsBooking] = useState(false);

    const navigate = useNavigate();

    const fetchData = async () => {

        const data = await getDocs(query(collection(db, "rooms")
            , where("room_type", "==", searchInput.toLowerCase())));

        setSearchResults(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));

    };

    console.log(searchResults);

    //View room availability
    const handleAvailability = id => {
        const [room] = searchResults.filter(room => room.id === id);

        setIsChecking(true);
        navigate('/roomAvailability');
    };

    //Book the room
    const handleBooking = id => {
        const [room] = searchResults.filter(room => room.id === id);
        console.log("room data:", room);

        setIsBooking(true);
        navigate('/book', { state: { room: room } });
    }


    return (
        <div>
            <input
                type="text"
                className="input-search"
                placeholder="Search room type..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="button" className="btn-search" onClick={fetchData}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            <tbody>
                {searchResults.map((room) => (
                    <tr key={room.id}>
                        <td>
                            <img src={room.imageURL} className="img-rooms" alt="banner" />
                        </td>
                        <td>
                            <p>Type: {room.room_type}</p>
                            <p>Description: {room.room_description}</p>

                            <FontAwesomeIcon icon={faBed} />
                            <> {room.no_of_beds}</>

                            <br></br>
                            <br></br>

                            <FontAwesomeIcon icon={faMoneyCheck} />
                            <> R{room.price}</>

                            <br></br>
                            <br></br>

                            <FontAwesomeIcon icon={faPeopleGroup} />
                            <> {room.total_occupants}</>

                            <br></br>
                            <br></br>

                            <>
                                <button className="btn-check-room" onClick={() => handleAvailability(room.id)}>Check Room Availability</button> <br />
                            </> <br />
                            <button className="btn-check-room" onClick={() => handleBooking(room.id, room.value)}>Book</button> <br />
                        </td>
                    </tr>
                ))}
            </tbody>
        </div>
    );
}

export default Search;