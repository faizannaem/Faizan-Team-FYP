import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdOutlineLocalPhone ,MdEmail } from "react-icons/md";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logoImage from "../assets/images/logo.png";
import "../assets/css/footer.css";

const Footer = () => {
  const contentAnimationControls = useAnimation();
  const sectionAnimationControls = useAnimation();
  const contactFormAnimationControls = useAnimation();
  const bottomAnimationControls = useAnimation();

  const { ref: contentRef, inView: contentInView } = useInView();
  const { ref: sectionRef, inView: sectionInView } = useInView();
  const { ref: contactFormRef, inView: contactFormInView } = useInView();
  const { ref: bottomRef, inView: bottomInView } = useInView();

  useEffect(() => {
    if (contentInView) {
      contentAnimationControls.start({ x: 0, opacity: 1 });
    } else {
      contentAnimationControls.start({ x: -50, opacity: 0 });
    }
  }, [contentInView, contentAnimationControls]);

  useEffect(() => {
    if (sectionInView) {
      sectionAnimationControls.start({ x: 0, opacity: 1 });
    } else {
      sectionAnimationControls.start({ x: 50, opacity: 0 });
    }
  }, [sectionInView, sectionAnimationControls]);

  useEffect(() => {
    if (contactFormInView) {
      contactFormAnimationControls.start({ x: 0, opacity: 1 });
    } else {
      contactFormAnimationControls.start({ x: 100, opacity: 0 });
    }
  }, [contactFormInView, contactFormAnimationControls]);

  useEffect(() => {
    if (bottomInView) {
      bottomAnimationControls.start({ y: 0, opacity: 1 });
    } else {
      bottomAnimationControls.start({ y: 50, opacity: 0 });
    }
  }, [bottomInView, bottomAnimationControls]);

  return (
    <footer className="footer">
      <motion.div
        ref={contentRef}
        initial={{ x: -50, opacity: 0 }}
        animate={contentAnimationControls}
        transition={{ duration: 0.5 }}
        className="footer-content"
      >
        <div className="footer-section about logo">
          <img src={logoImage} alt="LCA Tech logo" />
          <p>Your destination for quality laptop resources.</p>
        </div>

        <div ref={sectionRef} className="footer-section links">
          <ul>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Help Center</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div ref={sectionRef} className="footer-section links">
          <ul>
            <li>
              <Link to="#">Computer</Link>
            </li>
            <li>
              <Link to="#">Laptop</Link>
            </li>
            <li>
              <Link to="#">Tablet</Link>
            </li>
            <li>
              <Link to="#">Graphic Card</Link>
            </li>
          </ul>
        </div>
        <div ref={contactFormRef} className="footer-section contact-form">
          <h2>Contact Us</h2>
          <div className="contact">
            <p>
              <MdOutlineLocalPhone /><span> :+92-321-1006989</span>
            </p>
            <p>
              <MdEmail  /><span> :faizannaeem564@gmail.com</span>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={bottomRef}
        initial={{ y: 50, opacity: 0 }}
        animate={bottomAnimationControls}
        transition={{ duration: 0.5 }}
        className="footer-bottom"
      >
        <div className="socials">
          <Link to="#">
            <FaFacebook />
          </Link>
          <Link to="#">
            <FaTwitter />
          </Link>
          <Link to="#">
            <FaInstagram />
          </Link>
          <Link to="#">
            <FaLinkedin />
          </Link>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} LCA_TECT. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
