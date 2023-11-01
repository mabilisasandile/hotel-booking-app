import React, { useEffect } from "react";
import '../App.css';
import { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { db } from "../config/firebase";
import { getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, list } from "firebase/storage";
import { v4 } from "uuid";  //Import v4 from the uuid library and use it to randomise characters 

//importing the initialized storage from the Firebase setup
import { storage } from "../config/firebase";

//Popups
import Swal from "sweetalert2";

const NewRoom = () => {

    //Declaration of variables to contain input data
    const [room_type, setRoomType] = useState('');
    const [room_description, setRoomDescription] = useState('');
    const [no_of_beds, setNoOfBeds] = useState('');
    const [price, setRoomPrice] = useState(0);
    const [total_occupants, setTotalOccupants] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [imageURL, setImageURL] = useState('');

    //Upload image to the Firebase storage
    const handleUpload = () => {

        try {
            const imageRef = ref(storage, `hotel_images/${imageUpload.name + v4()}`);

            const uploadImage = uploadBytes(imageRef, imageUpload).then(() => {
                getDownloadURL(imageRef).then((url) => {    //Get the image url
                    setImageURL(url);
                    Swal.fire({
                        icon: 'success',
                        title: 'Uploaded!',
                        text: 'Image has been uploaded.',
                        showConfirmButton: false,
                        timer: 5000,
                    });
                })
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error uploading image!',
                showConfirmButton: false,
                timer: 5000,
            });
        }

    }

    const handleNewRoom = (async (e) => {
        e.preventDefault()

        //store data into firestore database
        try {
            const docRef = await addDoc(collection(db, "rooms"), {
                room_type: room_type,
                room_description: room_description,
                no_of_beds: no_of_beds,
                price: price,
                total_occupants: total_occupants,
                imageURL: imageURL,
            });

            console.log(docRef);
            //Success popup
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Successfully added new room.',
                showConfirmButton: false,
                timer: 5000,
            });

        } catch (error) {
            console.error('Error adding document: ', error);
        }


    });

    return (
        <div>
            <NavBar />
            <div className="container-add-room">
                <br></br>
                <div className="form-add-room">
                    <br></br>
                    <h3>
                        Add a new room.
                    </h3>
                    <br></br>
                    <br></br>

                    <select className="select-add-room" value={room_type} onChange={(e) => setRoomType(e.target.value)}>
                        <option value="">Select room type..</option>
                        <option value="double">Double</option>
                        <option value="triple">Triple</option>
                        <option value="quad">Quad</option>
                        <option value="mix">Mix</option>
                        <option value="queen">Queen</option>
                        <option value="king" >King</option>
                    </select>
                    <br></br>
                    <br></br>
                    <select className="select-add-room" value={room_description} onChange={(e) => setRoomDescription(e.target.value)}>
                        <option value="">Select room description</option>
                        <option value="Standard Room (1 to 2 People)">Double - Standard Room (1 to 2 People)</option>
                        <option value="Private Room (1 to 3">Triple - Private Room (1 to 3)</option>
                        <option value="Family Room (1 to 4)">Quad - Family Room (1 to 4)</option>
                        <option value="Mix Dorm Room (6 People)">Mix - Mix Dorm Room (6 People)</option>
                        <option value="Female Dorm Room (6 people)">Female - Dorm Room (6 people)</option>
                        <option value="Male Dorm Room (6 people)" >King - Male Dorm Room (6 people)</option>
                    </select>
                    <br></br>
                    <br></br>
                    <input
                        type="number"
                        className="input-add-room "
                        placeholder="Number of beds"
                        onChange={(event) => setNoOfBeds(event.target.value)} />
                    <br></br>
                    <br></br>
                    <input
                        type="number"
                        className="input-add-room "
                        placeholder="Price"
                        onChange={(event) => setRoomPrice(event.target.value)} />
                    <br></br>
                    <br></br>
                    <input
                        type="text"
                        className="input-add-room "
                        placeholder="Number of occupants"
                        onChange={(event) => setTotalOccupants(event.target.value)} />
                    <br></br>
                    <br></br>
                    <img src={imageURL} className="img-new-room" alt="banner" /> <br></br>
                    <label>Insert Image: </label>
                    <input
                        type="file"
                        onChange={(event) => setImageUpload(event.target.files[0])} />
                    <button onClick={handleUpload}>Upload</button>
                    <br></br>
                    <br></br>
                    <button className="btn-add-room" onClick={handleNewRoom}>Save new room</button>
                    <br></br>
                    <div></div>
                </div>
            </div>
            <div>
                <Footer />
            </div>


        </div>

    );
}
export default NewRoom;