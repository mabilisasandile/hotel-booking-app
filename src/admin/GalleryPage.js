import React, { useEffect } from "react";
import '../App.css';
import { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { db } from "../config/firebase";
import { getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, list } from "firebase/storage";
import { v4 } from "uuid";  //Import v4 from the uuid library and use it to randomise characters 

//importing the initialized storage from the Firebase setup
import { storage } from "../config/firebase";

//Popups
import Swal from "sweetalert2";

const GalleryPage = () => {

    //Declaration of variables to contain input data
    const [imageName, setImageName] = useState('');
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
                        timer: 3000,
                    });
                })
            })
        } catch (error) {
            console.log("Error uploading image:", error );
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error uploading image!',
                showConfirmButton: false,
                timer: 3000,
            });
        }
    }

    const handleNewImage = (async (e) => {
        e.preventDefault()

        //store data into firestore database
        try {
            const docRef = await addDoc(collection(db, "gallery"), {
                imageName: imageName, 
                imageURL: imageURL,
            });

            console.log(docRef);
            //Success popup
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Successfully added new image.',
                showConfirmButton: false,
                timer: 1500,
            });

        } catch (error) {
            console.error('Error adding image document: ', error);
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
                        Add a new image.
                    </h3>
                    <br></br>
                    <br></br>
                    <input
                        type="text"
                        className="input-add-room"
                        placeholder="Image name"
                        onChange={(event) => setImageName(event.target.value)} />
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
                    <button className="btn-add-room" onClick={handleNewImage}>Save</button>
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
export default GalleryPage;