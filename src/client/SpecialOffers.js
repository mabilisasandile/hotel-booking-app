
import React from "react";
import '../App.css';
import offer1 from "../images/offer-1.jpg"
import offer2 from "../images/offer-2.jpg"
import offer3 from "../images/offer-3.jpg"
import offer4 from "../images/offer-4.jpg"
import offer5 from "../images/offer-5.jpg"
import offer6 from "../images/offer-6.jpg"
import offer7 from "../images/offer-7.jpg"
import NavBarClient from "./NavBarClient";
import FooterClient from "./FooterClient";

const Services = () => {

    return (
        <div className="container-services">
            <NavBarClient />
            <h1>Check out our special offers!</h1>
            <table>
                <tr>
                    <td>
                        <img src={offer1} alt="banner" className="img-offer" />
                    </td>
                    <td>
                        <p>
                            OPENING OFFER <br /> <br />
                            The advantages of the offer <br />
                            -25% on your booking <br />
                            Cancellable and refundable until D-day <br />
                            Anywhere in the world  <br />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            FLEXIBLE RATE <br></br> <br></br>
                            The advantages of the offer <br />
                            Flexible cancelation terms <br />
                            Available in Pretoria <br />
                            Starting at R850 per room <br />
                        </p>
                    </td>
                    <td>
                        <img src={offer2} alt="banner" className="img-offer" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src={offer3} alt="banner" className="img-offer" />
                    </td>
                    <td>
                        <p>
                            WEEKEND DEALS <br></br><br></br>
                            Book a two-night stay for the weekend, <br />
                            and enjoy a 25% discount! <br />
                            Non-refundable, <br />
                            non-modifiable, and non-cancelable offer. <br />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            SPECIAL RATE <br></br><br></br>
                            Special rate for your stay at Première Classe: <br />
                            book now and reduce your budget by 15%! <br />
                            Up to three days before your check-in date to change your mind, <br />
                            so say yes to the essentials at lower prices.* <br />
                        </p>
                    </td>
                    <td>
                        <img src={offer4} alt="banner" className="img-offer" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src={offer5} alt="banner" className="img-offer" />
                    </td>
                    <td>
                        <p>
                            BREAKFAST   <br></br><br></br>
                            To start the day, come and enjoy a delicious all-you-can-eat <br />
                            breakfast with a large choice of coffee, <br />
                            baguette, pastries, compote, yogurt and pure orange juice. <br />
                            Indulge yourself!
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            If you need a snack...  <br></br><br></br>
                            Our vending machines allow you to eat at any time of the day.   <br></br>
                            You will find sweet and savory snacks and a large choice of drinks... <br></br>
                            Enough to satisfy all the small munchies or the big gourmets!
                        </p>
                    </td>
                    <td>
                        <img src={offer6} alt="banner" className="img-offer" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src={offer7} alt="banner" className="img-offer" />
                    </td>
                    <td>
                        <p>
                            15% off at Campanile    <br></br><br></br>
                            At lunch and dinner, enjoy a discount at selected restaurants. <br></br>
                            Find the list of our partner restaurants here.
                        </p>
                    </td>
                </tr>
            </table>
            <FooterClient />
        </div>
    );
}

export default Services;






// import React from 'react'
//import '../App.css';
// import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
// import Title from './Title';

// const Services = () => {
//     const service = {
//       services: [
//         {
//           icon: <FaCocktail />,
//           title: "Free CockTail",
//           info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
//         },
//         {
//           icon: <FaHiking />,
//           title: "Endless Hiking",
//           info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
//         },
//         {
//           icon: <FaShuttleVan />,
//           title: "Free Shuttle",
//           info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
//         },
//         {
//           icon: <FaBeer />,
//           title: "Unlimited Beer",
//           info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
//         },
//       ],
//     };
//     return (
//       <div className="container-fluid services">
//         <Title title="Services" />
//         <div className="row">
//           {service.services.map((item, index) => {
//             return (
//               <div
//                 className="col-md-4 col-lg-3 col-12 mx-auto my-3"
//                 key={index}
//               >
//                 <div className="card shadow-lg border-0 p-4">
//                   <article className="service">
//                     <span>{item.icon}</span>
//                     <h6>{item.title}</h6>
//                     <p>{item.info}</p>
//                   </article>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
// }

// export default Services
