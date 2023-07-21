
import React from "react";
import '../App.css';
import { useState, useEffect } from "react";
import NavBarClient from "./NavBarClient";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { async } from "@firebase/util";
import aboutImage from '../images/details-5.jpeg';
import FooterClient from "./FooterClient";

//Import the 'Swal.fire' function to display alerts
import Swal from "sweetalert2";

const AboutUs = () => {

    const [company_name, setCompanyName] = useState('');
    const [about_us_info, setAboutUsInfo] = useState('');
    const [moreInfo, setMoreInfo] = useState([]);
    const [isMoreInfo, setIsMoreInfo] = useState(false);

    const handleAddAboutUsInfo = (async (e) => {
        e.preventDefault()

        try {
            const docRef = await addDoc(collection(db, "basicInformation"), {
                company_name: company_name,
                about_us_info: about_us_info,
            });

            console.log(docRef);
            //Success popup
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Successfully added info.',
                showConfirmButton: false,
                timer: 3000,
            });

        } catch (error) {
            console.error('Error adding document: ', error);
            //Error popup
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add info.',
                showConfirmButton: false,
                timer: 3000,
            });
        }
    })

    useEffect(() => {
        getAbousUsInfo();
    }, []);

    const getAbousUsInfo = async () => {

        setIsMoreInfo(true);

        try {
            const querySnapShot = await getDocs(collection(db, "basicInformation"));

            const data = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log(data);
            setMoreInfo(data);

        } catch (error) {
            console.log("Failed to fetch data ", error);
            //Error popup
            Swal.fire({
                icon: 'error',
                title: 'NoData!',
                text: 'Data not found.',
                showConfirmButton: false,
                timer: 3000,
            });
        };
    };

    return (
        <div>
            <NavBarClient />
            <div className="container-about_us">
                <h1>Who we are?</h1>
                <img src={aboutImage} alt="banner" className="img-about" />
                <p className="p-about-us">Ipsum njk msmsj hhsas odjnddn nndkaoo lloasncjcahmdsid bgds asndkkdsa dmkdhdjs asdkaj <br />
                    mksk nhhjj bbbb hhhhhh kkkkk aaaaa hhhhh wwjwj whhhww odd jjjsh aujjj   iiiisdags thhhh <br />
                    the jjdisa afsghs of the  jkadjjab bkih it hjjhs agghn oljdjh ths hjkdsj.
                </p>
                <p className="p-about-us">Ipsum njk msmsj hhsas odjnddn nndkaoo lloasncjcahmdsid bgds asndkkdsa dmkdhdjs asdkaj <br />
                    mksk nhhjj bbbb hhhhhh kkkkk aaaaa hhhhh wwjwj whhhww odd jjjsh aujjj   iiiisdags thhhh <br />
                    the jjdisa afsghs of the  jkadjjab bkih it hjjhs agghn oljdjh ths hjkdsj.
                </p>

                <button className="btn-about-us" onClick={getAbousUsInfo}>More information </button>
                <p>{moreInfo.about_us_info}</p>
                
            </div>
            <FooterClient />
        </div>

    );
}

export default AboutUs;
