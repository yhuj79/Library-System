import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../style/Slide.module.css";
import { Segment } from "semantic-ui-react";

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: false,
};

function Slide() {
  return (
    <Segment className={styles.slide}>
      <Slider {...settings}>
        <img alt="" src={require("../assets/slide/1.png")} />
        <img alt="" src={require("../assets/slide/2.png")} />
        <img alt="" src={require("../assets/slide/3.png")} />
        <img alt="" src={require("../assets/slide/4.png")} />
        <img alt="" src={require("../assets/slide/5.png")} />
      </Slider>
    </Segment>
  );
}

export default Slide;
