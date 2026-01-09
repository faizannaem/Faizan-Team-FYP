import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineShop2 } from "react-icons/md";
import { motion } from "framer-motion";
import { RiImageLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import "../assets/css/cart.css";
import {
  clearCart,
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../app/actions/actionsCart";

Modal.setAppElement("#root");

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    city: "",
    address: "",
  });
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentTimer, setPaymentTimer] = useState(60);
  const [imageAdded, setImageAdded] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    type: "",
  });

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  const handleCheckout = () => {
    setOrderModalOpen(true);
  };

  const handlePaymentMethodChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMethod(selectedValue);

    if (selectedValue === "Jazz") {
      setPhoneNumber("03066545644");
    } else if (selectedValue === "Easy Paisa") {
      setPhoneNumber("0333420442");
    } else {
      setPhoneNumber("");
    }
  };

  // ************ UPDATED: Ab ye Screenshot bhi bhejega ************
  const handlePayment = async () => {
    if (!paymentScreenshot) {
      setAlertMessage({
        message: "Please upload a payment screenshot.",
        type: "error",
      });
      return;
    }

    // Image bhejne ke liye FormData lazmi hai
    const formData = new FormData();
    formData.append("customerName", customerDetails.name);
    formData.append("city", customerDetails.city);
    formData.append("address", customerDetails.address);
    formData.append("total", total);
    // 'payment_screenshot' wahi naam hai jo backend (Multer) mein likha hai
    formData.append("payment_screenshot", paymentScreenshot); 

    try {
      const response = await axios.post("http://localhost:5000/api/orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // File ke liye ye header zaroori hai
        },
      });

      if (response.status === 201 || response.status === 200) {
        setOrderPlaced(true);
        dispatch(clearCart());
        resetOrderProcess();

        Swal.fire({
          icon: "success",
          title: "Order Placed Successfully",
          text: "Order aur Screenshot dono database mein save ho gaye hain!",
        });
      }
    } catch (error) {
      console.error("Order fail ho gaya:", error);
      setAlertMessage({
        message: "Failed to place order. Backend connection check karein!",
        type: "error",
      });
    }
  };
  // ***************************************************************

  const handleProceedToPayment = () => {
    const { name, city, address } = customerDetails;

    if (!name || !city || !address) {
      setAlertMessage({
        message: "Please fill in all the customer details.",
        type: "error",
      });
    } else {
      setOrderModalOpen(false);
      setPaymentModalOpen(true);
      setPaymentTimer(300);
    }
  };

  useEffect(() => {
    let timerInterval;
    if (paymentModalOpen && !imageAdded && paymentTimer > 0) {
      timerInterval = setInterval(() => {
        setPaymentTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (paymentTimer === 0 && !imageAdded) {
      clearInterval(timerInterval);
      resetOrderProcess();
    }
    return () => clearInterval(timerInterval);
  }, [paymentModalOpen, imageAdded, paymentTimer]);

  const handleFileChange = (e) => {
    if (!selectedMethod) {
      setAlertMessage({
        message:
          "Please choose a payment method before uploading the screenshot.",
        type: "error",
      });
      return;
    }

    const file = e.target.files[0];
    if (file) {
      setPaymentScreenshot(file);
      setImageAdded(true);
      setPaymentTimer(0);
      setTimeout(
        () =>
          setAlertMessage({
            message: "Image Uploaded Successfully",
            type: "success",
          }),
        100
      );
    }
  };

  const resetOrderProcess = () => {
    setOrderModalOpen(false);
    setPaymentModalOpen(false);
    setCustomerDetails({ name: "", city: "", address: "" });
    setPaymentScreenshot(null);
    setOrderPlaced(false);
    setImageAdded(false);
    setSelectedMethod("");
    setPhoneNumber("");
    setAlertMessage({ message: "", type: "" });
  };

  const handleAddImageIconClick = () => {
    fileInputRef.current.click();
  };

  const renderAlertMessage = () => {
    if (alertMessage.message && alertMessage.type) {
      return (
        <div
          className={`alert-message ${
            alertMessage.type === "error" ? "alert-error" : "alert-success"
          }`}
        >
          {alertMessage.message}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {renderAlertMessage()}
      <div className="cart-banner-container">
        <div className="cart-banner">
          <motion.h2
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          >
            #CART
          </motion.h2>
        </div>
      </div>
      <div className="cart-main-container">
        {cart.length === 0 ? (
          <div className="empty_cart">
            <h2>Your Shopping cart is empty</h2>
            <Link to="/product">
              <button className="shop-btn">
                <MdOutlineShop2 className="shop-icon" />
                <span className="shop-text">Shop Now</span>
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-sub-container">
              {cart.map((item) => (
                <div className="add-cart-box" key={item.id}>
                  <div className="add-cart-img_box">
                    <img
                      src={item.image}
                      alt={item.Name}
                      className="responsive-image"
                    />
                  </div>
                  <div className="add-cart-detail">
                    <div className="add-cart-info">
                      <h4>{item.cat}</h4>
                      <h3>{item.Name}</h3>
                      <p>
                        Price: <span>{item.price} pkr</span>
                      </p>
                      <p>
                        Total: <span>{item.qty * item.price} pkr</span>
                      </p>
                    </div>
                    <div className="add-cart-quantity">
                      <button
                        onClick={() => dispatch(incrementQty(item))}
                        className="increment-btn"
                      >
                        +
                      </button>
                      <input type="number" value={item.qty} readOnly />
                      <button
                        onClick={() => dispatch(decrementQty(item))}
                        className="decrement-btn"
                      >
                        -
                      </button>
                    </div>
                    <div className="close-btn-icon-container">
                      <AiOutlineClose
                        onClick={() => dispatch(removeFromCart(item))}
                        className="pd-close-btn"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="add-cart-bottom">
              <div className="Total-price-container">
                <h4>
                  Sub Total: <span>{total} PKR</span>
                </h4>
              </div>
              <button
                className="checkout-btn"
                aria-label="Checkout"
                onClick={handleCheckout}
              >
                <IoBagCheckOutline className="checkout-icon" />
                <span className="checkout-text">Checkout</span>
              </button>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={orderModalOpen}
        onRequestClose={resetOrderProcess}
        contentLabel="Order Details"
        className="modal-main-details"
        overlayClassName="modal-overlay"
      >
        <div className="alert-message-container">{renderAlertMessage()}</div>
        <IoMdClose className="close-icon" onClick={resetOrderProcess} />
        <h2>Order Details</h2>
        <div className="order-items">
          {cart.map((item) => (
            <div className="order-item" key={item.id}>
              <img src={item.image} alt={item.Name} />
              <div>
                <h4>{item.Name}</h4>
                <p>Price: {item.price} pkr</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="total-price">
          <span>Total:</span> {total} PKR
        </h3>
        <form className="customer-details-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Name"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter City"
              value={customerDetails.city}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, city: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Enter Address"
              value={customerDetails.address}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  address: e.target.value,
                })
              }
            />
          </div>
          <button
            type="button"
            className="proceed-to-payment-btn"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={paymentModalOpen}
        onRequestClose={resetOrderProcess}
        contentLabel="Payment Details"
        className="modal-payment-details"
        overlayClassName="modal-overlay"
      >
        <div className="alert-message-container">{renderAlertMessage()}</div>
        <IoMdClose className="close-icon" onClick={resetOrderProcess} />
        <div className="accounts-container-main">
          <h2>Payment Details</h2>
          <div className="account-holder-details">
            <h4 className="account-holder-name">
              Account Holder: <span>Siyam Jutt</span>
            </h4>
            {phoneNumber && (
              <div>
                <h4 className="phone-number">
                  Phone Number: <span>{phoneNumber}</span>
                </h4>
              </div>
            )}
            <div className="form-group">
              <select
                id="payment_method_choose"
                value={selectedMethod}
                onChange={handlePaymentMethodChange}
                className="input-u-payment-holder"
                required
              >
                <option value="" disabled>
                  Select Payment Method
                </option>
                <option value="Jazz">Jazz</option>
                <option value="Easy Paisa">Easy Paisa</option>
              </select>
              <label htmlFor="payment_method_choose"> Payment Method</label>
            </div>
          </div>
          <div className="addImage-container" onClick={handleAddImageIconClick}>
            {!imageAdded && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="add-image"
              />
            )}
            {!imageAdded && <RiImageLine className="add-image-icon" />}
            {paymentTimer > 0 && <p>Time Remaining: {paymentTimer} seconds</p>}
            {paymentTimer === 0 && !orderPlaced && !imageAdded && (
              <p>Order expired.</p>
            )}
            {imageAdded && (
              <label htmlFor="uploadImage" style={{ display: "none" }}>
                Upload Payment Screenshot
              </label>
            )}
          </div>

          {paymentScreenshot && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(paymentScreenshot)}
                alt="Payment Screenshot"
              />
            </div>
          )}
        </div>
        {imageAdded && !orderPlaced && (
          <div>
            <button onClick={handlePayment} className="order-btn">
              Place Order
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Cart;