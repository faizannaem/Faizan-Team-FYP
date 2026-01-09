import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Navigation ke liye

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Orders load nahi ho sakay:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading Dashboard...</h2>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f7f6", position: "absolute", top: 0, left: 0, width: "100%", zIndex: 9999 }}>
      
      {/* --- Sidebar Section --- */}
      <div style={{ width: "260px", backgroundColor: "#2c3e50", color: "white", padding: "20px", display: "flex", flexDirection: "column" }}>
        <h2 style={{ color: "#00a8a8", marginBottom: "30px" }}>CLA Admin</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link to="/admin-orders" style={{ color: "white", textDecoration: "none", fontSize: "18px", padding: "10px", backgroundColor: "#34495e", borderRadius: "5px" }}>📦 Orders</Link>
          <Link to="/admin-feedback" style={{ color: "white", textDecoration: "none", fontSize: "18px", padding: "10px" }}>💬 Feedback / CRM</Link>
          <hr style={{ border: "0.5px solid #455a64", width: "100%" }} />
          <Link to="/" style={{ color: "#bdc3c7", textDecoration: "none", fontSize: "16px", padding: "10px" }}>🏠 Back to Website</Link>
        </nav>
      </div>

      {/* --- Main Content Section --- */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#333", margin: 0 }}>Orders Management</h2>
          <div style={{ backgroundColor: "#00a8a8", color: "white", padding: "10px 20px", borderRadius: "30px", fontWeight: "bold" }}>
            Total Orders: {orders.length}
          </div>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px", backgroundColor: "white", borderRadius: "10px" }}>
            <h3>No orders placed yet.</h3>
          </div>
        ) : (
          <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #eee" }}>
                  <th style={{ padding: "15px" }}>Customer Details</th>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>Payment Proof</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "15px" }}>
                      <strong style={{ display: "block" }}>{order.customerName}</strong>
                      <span style={{ fontSize: "12px", color: "#777" }}>{order.city}</span>
                    </td>
                    <td style={{ color: "#555", fontSize: "14px" }}>{order.address}</td>
                    <td style={{ fontWeight: "bold", color: "#2c3e50" }}>Rs. {order.total}</td>
                    <td style={{ padding: "10px" }}>
                      {order.screenshot ? (
                        <a href={`http://localhost:5000/${order.screenshot.replace(/\\/g, "/")}`} target="_blank" rel="noreferrer">
                          <img 
                            src={`http://localhost:5000/${order.screenshot.replace(/\\/g, "/")}`} 
                            alt="Payment" 
                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px", border: "1px solid #ddd", cursor: "zoom-in" }} 
                          />
                        </a>
                      ) : (
                        <span style={{ color: "#e74c3c", fontSize: "12px" }}>No Screenshot</span>
                      )}
                    </td>
                    <td style={{ color: "#777", fontSize: "13px" }}>
                      {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;