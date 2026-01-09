import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/about.css";
import Founder1 from "../assets/images/team/founder1.jpg";
import Founder2 from "../assets/images/team/founder2.jpg";
import Founder3 from "../assets/images/team/founder3.jpeg";
import ComputerImage from "../assets/images/quality-image.jpg";
import MemoryImage from "../assets/images/a-digital.jpg";
import PriceImage from "../assets/images/price.jpg";

const About = () => {
  const aboutContentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 1,
      },
    },
  };

  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Remove ref3 and inView3 since they are not being used
  // const [ref3, inView3] = useInView({
  //   triggerOnce: true,
  //   threshold: 0.5,
  // });

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="about-container">
      <div className="about-bg-banner">
        <div className="banner-content">
          <motion.h2
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          >
            #About Us
          </motion.h2>
        </div>
      </div>
      <div className="about-content">
        <motion.div
          className="about-text"
          variants={aboutContentVariants}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          ref={ref1}
        >
          <p>
            Welcome to CLA TECH, your ultimate destination for high-quality
            computer parts and accessories. At CLA TECH, we understand the
            importance of having reliable components to enhance your computing
            experience, whether you're a professional gamer, a tech enthusiast,
            or a business professional.
          </p>
        </motion.div>

        <motion.div
          className="about-points"
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={aboutContentVariants}
          ref={ref2}
        >
          <motion.div className="about-point">
            <img src={ComputerImage} alt="Quality Assurance" />
            <h3>Quality Assurance</h3>
            <p>
              We source our products from reputable manufacturers to ensure
              reliability, performance, and durability.
            </p>
          </motion.div>

          <motion.div className="about-point">
            <img src={MemoryImage} alt="Extensive Selection" />
            <h3>Extensive Selection</h3>
            <p>
              Explore a wide range of computer parts and accessories, including
              CPUs, GPUs, motherboards, RAM, storage solutions, cooling systems,
              gaming peripherals, and more.
            </p>
          </motion.div>

          <motion.div className="about-point">
            <img src={PriceImage} alt="Competitive Pricing" />
            <h3>Competitive Pricing</h3>
            <p>
              Enjoy competitive prices on top-tier products, allowing you to get
              the best value for your money.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Founder Section */}
      <div className="founder-section">
        <h2>Our Founders</h2>
        <div className="founder-carousel">
          <Slider {...settings}>
            <div className="founder">
              <img src={Founder1} alt="Founder 1" />
              <h3>Fizan Naeem</h3>
              <p>Empowering the next generation of tech enthusiasts by bridging the gap between quality hardware and affordable solutions. Our vision is to make high-end technology accessible to every student in Pakistan.</p>
            </div>
            <div className="founder">
              <img src={Founder2} alt="Founder 2" />
              <h3>Sadia Mushtaq</h3>
              <p>Transforming the tech landscape through innovation and commitment. My goal is to create a seamless shopping experience where every developer and gamer finds exactly what they need to succeed.</p>
            </div>
            <div className="founder">
              <img src={Founder3} alt="Founder 3" />
              <h3>Iqra Naeem</h3>
              <p>Dedicated to excellence and transparency in the MERN stack ecosystem. We don’t just sell hardware; we provide the foundation for your digital dreams with guaranteed quality and unwavering customer support.</p>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default About;
