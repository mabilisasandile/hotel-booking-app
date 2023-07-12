import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItem, setEditedItem] = useState("");

    useEffect(() => {
        getRooms();
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


    return (
        <div className="container-view-rooms">
            <NavBar />
            <h1>Rooms Page</h1>
            <br />
            <button onClick={getRooms}>View rooms</button>
            <br />
            <table className="table-view-rooms">
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Room Type</th>
                        <th>Price</th>
                        <th>Max Occupants</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.room_number}</td>
                            <td>{room.room_type}</td>
                            <td>{room.price}</td>
                            <td>{room.total_occupants}</td>
                            <td>
                                <button onClick={() => handleSave(room.id)}>Save</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Rooms;
