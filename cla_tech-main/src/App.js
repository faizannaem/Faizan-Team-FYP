import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import useNavigationLoader from "./hooks/useNavigationLoader";
import WhatsApp from "./components/Whatsapp";
import { AuthProvider } from "./AuthContext";
import "./App.css";
import AdminOrders from "./components/AdminOrders"; // Path check kar lein
import AdminDashboard from "./components/AdminDashboard";

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert ${type === "success" ? "alert-success" : "alert-error"}`}>
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const AppContent = () => {
  const loading = useNavigationLoader();
  const [alert, setAlert] = useState({ message: "", type: "" });

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          {alert.message && (
            <Alert 
              message={alert.message} 
              type={alert.type} 
              onClose={() => setAlert({ message: "", type: "" })} 
            />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <WhatsApp phoneNumber="+923433757560" />
          <Footer />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;