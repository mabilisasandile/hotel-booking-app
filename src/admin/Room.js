
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import {firestore} from '../config/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "../config/firebase";

//Import the 'Swal.fire' function to display alerts
import Swal from "sweetalert2";

const Room = (roomId) => {
    const [room, setRoom] = useState([]);
    const [room_type, setRoomType] = useState('');
    const [no_of_beds, setNoOfBeds] = useState('');
    const [price, setRoomPrice] = useState('');
    const [total_occupants, setTotalOccupants] = useState('');
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState('');

    //Collect data related to the room ID 
    useEffect(() => {
        const fetchRoomData = async ()=>{
            const roomRef = firestore.collection('rooms').doc(roomId);
            const snapshop = await roomRef.get();

            if (snapshop.exists) {
                const roomData = snapshop.data();
                setRoom(roomData);
                setRoomType(roomData.room_type);
                setNoOfBeds(roomData.no_of_beds);
                setRoomPrice(roomData.price);
                setTotalOccupants(roomData.total_occupants);
                // setImage(roomData.image);
                // setImageURL(roomData.imageURL);
            }
        };

        fetchRoomData();
    }, [roomId]);

    //Now edit the room details
    const handleEditRoom = (event) =>{
        event.preventDefault();

        //Update the room data in the Firestore
        firestore.collection('rooms').doc(roomId).update({
            room_type,
            no_of_beds,
            price,
            total_occupants,
        });

        //Success message popup
        //Success popup
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Room has been updated.',
            showConfirmButton: false,
            timer: 1500,
        });

        if (!room) {
            return <div>Loading...</div>;
        }
    }
    
    return (
        <div className="container-view-rooms">
            <NavBar />
            <h1>View & Edit room page</h1>
            <br />
            <form>
                <div>
                    <label htmlFor="room_type">Room type:</label>
                    <input
                        type="text"
                        id="room_type"
                        value={room_type}
                        onChange={(e) => setRoomType(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="no_of_beds">Room type:</label>
                    <input
                        type="text"
                        id="no_of_beds"
                        value={no_of_beds}
                        onChange={(e) => setNoOfBeds(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Room type:</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setRoomPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="total_occupants">Room type:</label>
                    <input
                        type="text"
                        id="total_occupants"
                        value={total_occupants}
                        onChange={(e) => setTotalOccupants(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleEditRoom}>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default Room;
