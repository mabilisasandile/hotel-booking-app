import React from "react";
import '../App.css';
import { useState } from "react";
import NavBar from "./NavBar";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

//importing the initialized storage from the Firebase setup
import { storage } from "../config/firebase";

//Popups
import Swal from "sweetalert2";

const NewRoom = () => {

    //Declaration of variables to contain input data
    const [room_type, setRoomType] = useState('');
    const [no_of_beds, setNoOfBeds] = useState('');
    const [price, setRoomPrice] = useState('');
    const [total_occupants, setTotalOccupants] = useState('');
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState('');

    //Assign image to the 'image' variable...
    const imageUpload = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    //Upload image to the Firebase storage
    const handleUpload = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, 'images/${imageUpload.name + v4()}');
        uploadBytes(imageRef, imageUpload).then(() => {
            //Success popup
            Swal.fire({
                icon: 'success',
                title: 'Uploaded!',
                text: 'Image has been uploaded.',
                showConfirmButton: false,
                timer: 1500,
            });
        })


        storage.ref('images').child(image.name).getDownloadURL().then((url) => {
            console.log(url);   //Check URL's existance

            //Assign the download URL to the "imageURL" variable
            setImageURL(url);
        });

    }

    const handleNewRoom = (async (e) => {
        e.preventDefault()

        //store data into firestore database
        try {
            const docRef = await addDoc(collection(db, "rooms"), {
                room_type: room_type,
                no_of_beds: no_of_beds,
                price: price,
                total_occupants: total_occupants,
                imageURL: imageURL
            });

            console.log(docRef);
            //Success popup
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Successfully added new room.',
                showConfirmButton: false,
                timer: 1500,
            });

        } catch (error) {
            console.error('Error adding document: ', error);
        }


    });

    return (
        <div>
            <NavBar />
            <div className="container-add-room">
                <form className="form-add-room">
                    <h3>
                        Add a new room here:
                    </h3>
                    <br></br>
                    <br></br>

                    <select className="select-add-room" value={room_type} onChange={(e) => setRoomType(e.target.value)}>
                        <option value="">Select room type..</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="triple">Triple</option>
                        <option value="Quad">Quad</option>
                        <option value="Queen">Queen</option>
                        <option value="King">King</option>
                    </select>

                    <br></br>
                    <br></br>
                    <input
                        type="text"
                        className="input-add-room "
                        placeholder="Number of beds"
                        onChange={(event) => setNoOfBeds(event.target.value)} />
                    <br></br>
                    <br></br>
                    <input
                        type="text"
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
                    <input
                        type="file"
                        placeholder="Insert image"
                        onChange={imageUpload} />
                    <button onClick={handleUpload}>Upload</button>
                    <br></br>
                    <br></br>
                    <button className="btn-add-room" onClick={handleNewRoom}>Save new room</button>

                </form>
            </div>
            <footer>
                <div className="container-footer">
                    <table>
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Legal</th>
                                <th>Essentials</th>
                                <th>Social media</th>
                            </tr>
                            <tr>
                                <td>Gauteng</td>
                                <td>Copyright</td>
                                <td>Email</td>
                                <td>Twitter</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </footer>


        </div>

    );
}
export default NewRoom;