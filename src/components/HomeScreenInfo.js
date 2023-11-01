import React from "react";
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocation, faCalendarDay } from "@fortawesome/free-solid-svg-icons";


const HomeScreenInfo = () => {

    // Get today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and format to two digits
    const day = String(today.getDate()).padStart(2, '0'); // Format day to two digits

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekName = daysOfWeek[today.getDay()];
    const currentDate = `${dayOfWeekName}, ${year}-${month}-${day}`;

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
            <div>

                <h4> <FontAwesomeIcon icon={faCalendarDay} />Today: {currentDate}</h4>
                <br></br>
                <h4><FontAwesomeIcon icon={faLocation} />Gauteng, Pretoria 0167, ZA</h4>
                <br></br>
                <h4> <FontAwesomeIcon icon={faPhone} />+27 734 908 931</h4>
            </div>
        </div>
    )

}
export default HomeScreenInfo;