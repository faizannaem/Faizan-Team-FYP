import React, { useState } from "react";
import { motion } from "framer-motion";
import imageLogo from "../assets/images/logo.png";
import "../assets/css/contact.css";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. URL theek kiya (Port 5000) 
      // 2. Simple JSON bheja (FormData ki zaroorat nahi)
      const response = await axios.post("http://localhost:5000/api/feedback", feedback);

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "We have received your feedback. Thank you!",
        });
        setFeedback({ name: "", email: "", message: "" }); // Form clear karein
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Could not connect to the server. Please check if backend is running.",
      });
    }
  };

  return (
    <div className="contact-container">
      {/* ... Baki UI bilkul wahi rahegi ... */}
      <div className="contact-bg-banner">
        <div className="c-banner-content">
          <motion.h2
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          >
            #Contact Us
          </motion.h2>
        </div>
      </div>
      <div className="main-contact-container">
        <div className="cla-container">
          <img src={imageLogo} alt="CLA_TECH Logo" />
          <p>
            "Reach out to CLA TECH... (Aapka text)"
          </p>
        </div>
        <div className="contact-form-container">
          <h3>Get in Touch</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" "
                value={feedback.name}
                onChange={handleChange}
                required
                className="input-name"
              />
              <label htmlFor="name" className="label-input">Enter your name</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={feedback.email}
                onChange={handleChange}
                required
                className="input-email"
              />
              <label htmlFor="email" className="label-input">Email</label>
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder=" "
                value={feedback.message}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="message" className="label-input">Enter your message</label>
            </div>
            <button type="submit" className="send-button">
              Send Message
            </button>
          </form>
        </div>
        <div className="iframe-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.551346362243!2d74.30134731514332!3d31.55106198135891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMzJzA0LjAiTiA3NMKwMTgnMTIuOCJF!5e0!3m2!1sen!2spk!4v1630000000000!5m2!1sen!2spk"
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;