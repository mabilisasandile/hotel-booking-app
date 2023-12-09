import React from "react";
import '../App.css';

const MapClient = () => {

    return (
        <div class="mapouter">
            <div className="gmap_canvas">
                <iframe
                    className="map-frame"
                    src="https://maps.google.com/maps?q=Pretoria&t=&z=10&ie=UTF8&iwloc=&output=embed"></iframe>

                <a href="https://2yu.co">2yu</a><br />

                <a href="https://embedgooglemap.2yu.co" />
            </div>
        </div>
    );
}

export default MapClient;