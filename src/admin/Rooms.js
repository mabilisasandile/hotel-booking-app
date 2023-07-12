import React, { useState, useEffect } from "react";
import '../App.css';
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

//Import the 'Swal.fire' function to display alerts
import Swal from "sweetalert2";
import RoomEdit from "./RoomEdit";

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

    //Go to view and edit room page
    const handleEdit = id => {
        const [room] = rooms.filter(room => room.id === id);

        setSelectedRoom(room);
        setIsEditing(true);
        navigate('/RoomEdit');
    };

    //Delete a room
    const handleDelete = id => {

        //Warning popup
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                //Get the room to be deleted
                const [room] = rooms.filter(room => room.id == id);

                //Delete room from the database (firestore)
                deleteDoc(doc(db, "employees", id));

                //Success popup
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Data has been deleted.',
                    showConfirmButton: false,
                    timer: 1500,
                });

                //Delete room at the state
                const roomsCopy = rooms.filter(room => room.id !== id);
                setRooms(roomsCopy);    //Update the state with the new list
            }
        });
    }

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
                        <th>Room Type</th>
                        <th>No. of Beds</th>
                        <th>Price</th>
                        <th>Max Occupants</th>
                        <th>Actions</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.room_type}</td>
                            <td>{room.no_of_beds}</td>
                            <td>{room.price}</td>
                            <td>{room.total_occupants}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(room.id)}>Edit</button>
                                {isEditing && (
                                    <RoomEdit
                                        getRooms={getRooms}
                                        rooms={rooms}
                                        selectedRoom={selectedRoom}
                                        setRooms={setRooms}
                                        setIsEditing={setIsEditing}
                                    />
                                )}
                            </td>
                            <td>
                                <button className="btn-cancel" onClick={() => handleDelete(room.id, room.value)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>

            </div>
        </div>
    );
};

export default Rooms;
