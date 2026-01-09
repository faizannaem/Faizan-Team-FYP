import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../assets/css/whatsApp.css";

const WhatsApp = ({ phoneNumber }) => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div className="whatsapp-icon" onClick={handleWhatsAppClick}>
      <FaWhatsapp />
    </div>
  );
};

export default WhatsApp;
