
import React, { useState, useEffect } from "react";
import '../App.css';
import image1 from '../images/room-1.jpeg';
import image2 from '../images/room-2.jpeg';
import image3 from '../images/room-3.jpeg';
import image4 from '../images/room-4.jpeg';
import image5 from '../images/room-5.jpeg';
import image6 from '../images/room-6.jpeg';
import image7 from '../images/room-7.jpeg';
import image8 from '../images/room-8.jpeg';
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import NavBarClient from "./NavBarClient";
import FooterClient from "./FooterClient";
import { db } from "../config/firebase";
import { collection, getDocs, doc } from "firebase/firestore";


function GalleryClient() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        getImages();
    })


    const getImages = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "gallery"));

            const images = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setImages(images);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    };



    return (
        <div>
            <NavBarClient />
            
            <div>
                {images.length > 0 ? (
                    <Carousel>
                        {images.map((item, index) => (
                            <Carousel.Item key={index} className="custom-carousel-item">
                                <img
                                    className="d-block w-100"
                                    src={item.imageURL}
                                    alt={`Slide ${index}`}
                                />
                                <div className="carousel-text">
                                    <h2>GALLERY</h2>
                                    <p>Slide to view more images...</p>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h2>Loading...</h2>
                    </div>
                )}
            </div>

            <FooterClient />
        </div>
    );
}

export default GalleryClient;