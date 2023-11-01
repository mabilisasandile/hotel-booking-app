import React from "react";
import '../App.css';
import NavBarClient from "./NavBarClient";
import FooterClient from "./FooterClient";
import offer1 from "../images/offer-1.jpg"
import offer2 from "../images/offer-2.jpg"
import offer3 from "../images/offer-3.jpg"
import offer4 from "../images/offer-4.jpg"
import offer5 from "../images/offer-5.jpg"
import offer6 from "../images/offer-6.jpg"
import offer7 from "../images/offer-7.jpg"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SpecialOffers = () => {
    return (
        <div className="container-services">
            <NavBarClient />
            <br />
            <br />
            <h1>Check out our special offers!</h1>
            <Row>
                <Col>
                    <Card className="card-special-view">
                        <Card.Img variant="top" src={offer1} />
                        <Card.Body>
                            <Card.Title>OPENING OFFER</Card.Title>
                            <Card.Text>
                                The advantages of the offer
                                - 25% on your booking
                                Cancellable and refundable until D-day
                                Anywhere in the world
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-special-view">
                        <Card.Img variant="top" src={offer2} />
                        <Card.Body>
                            <Card.Title>FLEXIBLE RATE</Card.Title>
                            <Card.Text>
                                The advantages of the offer
                                Flexible cancelation terms
                                Available in Pretoria
                                Starting at R850 per room
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="card-special-view">
                        <Card.Img variant="top" src={offer3} />
                        <Card.Body>
                            <Card.Title>WEEKEND DEALS</Card.Title>
                            <Card.Text>
                                Book a two-night stay for the weekend,
                                and enjoy a 25% discount!
                                Non-refundable,
                                non-modifiable, and non-cancelable offer.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-special-view">
                        <Card.Img variant="top" src={offer4} />
                        <Card.Body>
                            <Card.Title>SPECIAL RATE</Card.Title>
                            <Card.Text>
                                Special rate for your stay at Première Classe:
                                book now and reduce your budget by 15%!
                                Up to three days before your check-in date to change your mind,
                                so say yes to the essentials at lower prices.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="card-special-view">
                        <Card.Img variant="top" src={offer5} />
                        <Card.Body>
                            <Card.Title>BREAKFAST</Card.Title>
                            <Card.Text>
                                To start the day, come and enjoy a delicious all-you-can-eat
                                breakfast with a large choice of coffee,
                                baguette, pastries, compote, yogurt and pure orange juice.
                                Indulge yourself!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-special-view">
                        <Card.Img variant="top" src={offer6} />
                        <Card.Body>
                            <Card.Title>If you need a snack...</Card.Title>
                            <Card.Text>
                                Our vending machines allow you to eat at any time of the day.
                                You will find sweet and savory snacks and a large choice of drinks...
                                Enough to satisfy all the small munchies or the big gourmets!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="card-special-view">
                        <Card.Img variant="top" src={offer7} />
                        <Card.Body>
                            <Card.Title>15% off at Campanile</Card.Title>
                            <Card.Text>
                                At lunch and dinner, enjoy a discount at selected restaurants.
                                Find the list of our partner restaurants here.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <FooterClient />
        </div>
    );
}

export default SpecialOffers;
