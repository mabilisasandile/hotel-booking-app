
import React, { useState } from "react";
import NavBar from "./NavBar";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const RoomEdit = (room) => {

    const location = useLocation();
    const roomData = location.state.room;

    console.log("SELECTED ROOM DATA:", roomData);

    const id = roomData.id;
    const [room_type, setRoomType] = useState(roomData.room_type);
    const [room_description, setRoomDescription] = useState(roomData.room_description);
    const [no_of_beds, setNoOfBeds] = useState(roomData.no_of_beds);
    const [price, setRoomPrice] = useState(roomData.price);
    const [total_occupants, setTotalOccupants] = useState(roomData.total_occupants);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(roomData.imageURL);

    //Editing the room details
    const handleEditRoom = async (e) => {
        e.preventDefault();
        try {
            if (!room_type || !no_of_beds || !price || !total_occupants) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'All fields are required.',
                    showConfirmButton: true,
                    timer: 3000,
                });
            }
    
            const room = {
                id,
                room_type,
                room_description,
                no_of_beds,
                price,
                total_occupants,
                imageURL,
            };
    
            await setDoc(doc(db, "rooms", id), {
                ...room
            });
    
            //Success message popup
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Room has been updated.',
                showConfirmButton: false,
                timer: 3000,
            });
        } catch (error){
            console.log("Failed to update: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update the room.',
                showConfirmButton: true,
                timer: 3000,
            });
        }
       
    }

    return (
        <div className="container-edit-room">
            <h1>Update room info!</h1>
                <Link to="/rooms" className='return-back-link'><b>Return Back</b></Link>
                <div>
                    <img src={imageURL} className="img-edit-room" alt="banner" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="room_type">Room id:</label>
                    <br></br>
                    <input
                        type="text"
                        className="input-edit-room"
                        value={id}
                    />
                </div>
                <br></br>
                <div>
                    <label htmlFor="room_type">Room type:</label>
                    <br></br>
                    <input
                        type="text"
                        className="input-edit-room"
                        value={room_type}
                        onChange={(e) => setRoomType(e.target.value)}
                    />
                </div>
                <br></br>
                <div>
                <select className="select-add-room" value={room_description} onChange={(e) => setRoomDescription(e.target.value)}>
                    <option value="">Select room description</option>
                    <option value="Standard Room (1 to 2 People)">Double - Standard Room (1 to 2 People)</option>
                    <option value="Private Room (1 to 3">Triple - Private Room (1 to 3)</option>
                    <option value="Family Room (1 to 4)">Quad - Family Room (1 to 4)</option>
                    <option value="Mix Dorm Room (6 People)">Mix - Mix Dorm Room (6 People)</option>
                    <option value="Female Dorm Room (6 people)">Female - Dorm Room (6 people)</option>
                    <option value="Male Dorm Room (6 people)" >King - Male Dorm Room (6 people)</option>
                </select>
                </div>
                <br></br>
                <div>
                    <label htmlFor="no_of_beds">No. of Beds:</label>
                    <br></br>
                    <input
                        type="number"
                        className="input-edit-room"
                        value={no_of_beds}
                        onChange={(e) => setNoOfBeds(e.target.value)}
                    />
                </div>
                <br></br>
                <div>
                    <label htmlFor="price">Price:</label>
                    <br></br>
                    <input
                        type="number"
                        className="input-edit-room"
                        value={price}
                        onChange={(e) => setRoomPrice(e.target.value)}
                    />
                </div>
                <br></br>
                <div>
                    <label htmlFor="total_occupants">Max occupants:</label>
                    <br></br>
                    <input
                        type="text"
                        className="input-edit-room"
                        value={total_occupants}
                        onChange={(e) => setTotalOccupants(e.target.value)}
                    />
                </div>
                <br></br>
                <div>
                    <label htmlFor="imageURL">Image URL:</label>
                    <br></br>
                    <input
                        type="text"
                        className="input-edit-room"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </div>
                <br></br>
                <div>
                    <button className="btn-update-room" onClick={handleEditRoom}>Save Changes</button>
                </div>
                <br></br>
        </div>
    );
};

export default RoomEdit;
