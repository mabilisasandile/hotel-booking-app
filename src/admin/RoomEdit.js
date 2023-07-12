
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { collection, getDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";

const RoomEdit = ({ rooms, selectedRoom, setRooms, setIsEditing, getRooms }) => {
    
    const id = selectedRoom.id;
    
    const [room_type, setRoomType] = useState(selectedRoom.room_type);
    const [no_of_beds, setNoOfBeds] = useState(selectedRoom.no_of_beds);
    const [price, setRoomPrice] = useState(selectedRoom.price);
    const [total_occupants, setTotalOccupants] = useState(selectedRoom.total_occupants);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState('');

    //Editing the room details
    const handleEditRoom = async (e) => {
        e.preventDefault();

        if (!room_type || !no_of_beds || !price || !total_occupants) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }

        const room = {
            id,
            room_type,
            no_of_beds,
            price,
            total_occupants,
        };

        await setDoc(doc(db, "rooms", id), {
            ...room
        });

        setRooms(rooms);
        setIsEditing(false);
        getRooms();

        //Success message popup
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Room has been updated.',
            showConfirmButton: false,
            timer: 1500,
        });

    }

    return (
        <div className="container-view-rooms">
            <h1>View & Edit room</h1>
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
                    <label htmlFor="no_of_beds">No. of Beds:</label>
                    <input
                        type="text"
                        id="no_of_beds"
                        value={no_of_beds}
                        onChange={(e) => setNoOfBeds(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setRoomPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="total_occupants">Max occupants:</label>
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

export default RoomEdit;
