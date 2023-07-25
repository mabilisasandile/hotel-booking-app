import React, { useState, useEffect } from "react";
import '../App.css';
import NavBarClient from "./NavBarClient";
import FooterClient from "./FooterClient";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../config/firebase";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMoneyCheck, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

//Import the 'Swal.fire' function to display alerts
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

    

    //Filter rooms with price range
    const handleFilteredData = async () => {

        try {
            const queryData = query(collection(db, 'rooms'),
                where('price', '<=', parseInt(amountEntered)));

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

            //Error popup
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch filtered rooms!',
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };


    //View room availability
    const handleAvailability = id => {
        const [room_data] = rooms.filter(room => room.id === id);

        setSelectedRoom(room_data);
        setIsChecking(true);
        
        navigate('/roomAvailability', {state: {room_data: room_data}});
    };


    //Book the room
    const handleBooking = id => {
        const [room] = rooms.filter(room => room.id === id);
        console.log("room data:", room);

        setSelectedRoom(room);
        setIsBooking(true);
        navigate('/book', { state: { room: room } });
    }


    return (
        <div className="container-view-rooms">
            <NavBarClient />

            <table className="table-view-rooms">
                <br />
                <br />
                <h2>Room Image & Description</h2>
                <br></br>
                <br></br>
                <Search />
                <br></br>
                <label>Filter Rooms With Price: R</label>
                <br></br>
                <input
                    type="number"
                    className="input-search"
                    placeholder="Filter with price range..."
                    value={amountEntered}
                    onChange={(e) => setAmountEntered(e.target.value)}
                />
                <button className="btn-filtered-rooms" onClick={handleFilteredData}>View</button>
                <br></br>
                <br></br>
                <button className="btn-view-rooms" onClick={getRooms}>View All Rooms</button>
                <br></br>
                <br></br>
                <div>
                    {isFiltered ?
                        <tbody>
                            {data.map((room) => (
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
                        :
                        <tbody>
                            {rooms.map((room) => (
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
                    }
                </div>

            </table>
            <div>
                <FooterClient />
            </div>
        </div >
    );
};

export default Rooms;
