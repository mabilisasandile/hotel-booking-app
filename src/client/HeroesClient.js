import React from "react";
import { useEffect } from "react";
import '../App.css';
import image1 from '../images/details-5.jpeg';
import image2 from '../images/details-1.jpeg';
import image3 from '../images/details-4.jpeg';
import image4 from '../images/image2.jpg';
import image5 from '../images/image1.jpg';
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


function HeroesClient() {

  const carouselItems = [
    {
      image: image1,
      title: "BLUE HAVEN HOTEL",
      slogan: "Where Tranquility meet Luxury",
    },
    {
      image: image2,
      title: "BLUE HAVEN HOTEL",
      slogan: "Where Tranquility meet Luxury",
    },
    {
      image: image3,
      title: "BLUE HAVEN HOTEL",
      slogan: "Where Tranquility meet Luxury",
    },
    {
      image: image4,
      title: "BLUE HAVEN HOTEL",
      slogan: "Where Tranquility meet Luxury",
    },
    {
      image: image5,
      title: "BLUE HAVEN HOTEL",
      slogan: "Where Tranquility meet Luxury",
    },
  ];


  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index} className="custom-carousel-item">
          <img
            className="d-block w-100"
            src={item.image}
            alt={`Slide ${index}`}
          />
          <div className="carousel-text">
            <h2>{item.title}</h2>
            <p>{item.slogan}</p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>

  );
}

export default HeroesClient;