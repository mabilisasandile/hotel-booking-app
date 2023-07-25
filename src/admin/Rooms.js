import React, { useState, useEffect } from "react";
import '../App.css';
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import RoomEdit from "./RoomEdit";

//Import the 'Swal.fire' function to display alerts
import Swal from "sweetalert2";

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
            console.log("Rooms data:", rooms);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    };

    //Go to view and edit room page
    const handleEdit = async (id) => {
        console.log("View ID:", id);
        const [room] = rooms.filter(room => room.id === id);

        setSelectedRoom(room);

        setIsEditing(true);
    
        navigate('/roomedit', {state: {room: room}} );
    };

    useEffect(() => {

        console.log("Handle retrieved data:", selectedRoom);
    }, [selectedRoom]);

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
                const [room] = rooms.filter(room => room.id === id);

                //Delete room from the database (firestore)
                deleteDoc(doc(db, "rooms", id));

                //Success popup
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Data has been deleted.',
                    showConfirmButton: false,
                    timer: 3000,
                });

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

            <button className="btn-view-rooms" onClick={getRooms}>View rooms</button>
            
            <br />
            
            <table className="table-view-rooms">
                <thead>
                    <tr>
                        <th>Image & Description for each room availabe</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>
                                <img src={room.imageURL} className="img-rooms" alt="banner" />
                            </td>
                            <td>
                                <p>Room ID: {room.id}</p>
                                <p>Type: {room.room_type}</p>
                                <p>Room Description: {room.room_description}</p>
                                <p>No. of beds: {room.no_of_beds}</p>
                                <p>Price: R{room.price}</p>
                                <p>Max occupants: {room.total_occupants}</p>
                                <p>Image URL: {room.imageURL}</p>
                                <button className="btn-edit" onClick={() => handleEdit(room.id)}>Edit</button> <br></br> <br></br>
                                <button className="btn-delete" onClick={() => handleDelete(room.id, room.value)}>Delete</button> <br />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Rooms;
