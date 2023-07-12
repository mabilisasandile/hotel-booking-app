
import React from "react";
import '../App.css';
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { async } from "@firebase/util";


const AboutUs = () => {

    const [company_name, setCompanyName] = useState('');
    const [about_us_info, setAboutUsInfo] = useState('');
    const handleAddAboutUsInfo = (async (e) => {
        e.preventDefault()

        try {
            const docRef = await addDoc(collection(db, "basicInformation"), {
                company_name: company_name,
                about_us_info: about_us_info,
            });

            alert("Successfully added information");
            console.log(docRef);

        } catch (error) {
            console.error('Error adding document: ', error);
        }
    })

    useEffect(() => {
        getAbousUsInfo();
    }, []);

    const getAbousUsInfo = async () => {
        try {
            const querySnapShot = await getDocs(collection(db, "about_us_info"));

            const data = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log(data);

            return (
                <div>
                    <p>{data}</p>
                </div>
            );

        } catch (error) {
            console.log("Failed to fetch data ", error);
            return (
                <div>
                    <p>No data found!</p>
                </div>
            );
        };
    };

    return (
        <div>
            <NavBar />
            <div className="container-about_us">
                <h1>About us page</h1>

                <br></br>
                <br></br>
                <label>Enter about us info:</label> <br></br>
                <textarea
                    type="text"
                    className="input-information"
                    placeholder="About us info"
                    // value={getAbousUsInfo}
                    onChange={(event) => setAboutUsInfo(event.target.value)} />
                <br></br>
                <br></br>
                <button className="btn-about-us" onClick={handleAddAboutUsInfo}>Save added information</button>
            </div>
        </div>

    );
}

export default AboutUs;