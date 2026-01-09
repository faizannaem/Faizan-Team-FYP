import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Alerts ke liye

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [orderRes, feedbackRes] = await Promise.all([
        axios.get("http://localhost:5000/api/orders"),
        axios.get("http://localhost:5000/api/feedback")
      ]);
      setOrders(orderRes.data);
      setFeedbacks(feedbackRes.data);
    } catch (error) {
      console.error("Data load karne mein masla:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- DELETE FUNCTIONS ---
  const deleteOrder = async (id) => {
    const result = await Swal.fire({
      title: 'Kya aap sure hain?',
      text: "Ye order hamesha ke liye delete ho jayega!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Haan, delete kar dein!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        Swal.fire('Deleted!', 'Order delete ho gaya.', 'success');
        fetchData();
      } catch (err) {
        Swal.fire('Error!', 'Delete nahi ho saka.', 'error');
      }
    }
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Kya aap ye message delete karna chahte hain?")) {
      try {
        await axios.delete(`http://localhost:5000/api/feedback/${id}`);
        fetchData();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  // --- STATUS UPDATE FUNCTION ---
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status: newStatus });
      fetchData(); // UI refresh
    } catch (err) {
      console.error("Status update error", err);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Admin Panel Loading...</h2>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5", position: "absolute", top: 0, left: 0, width: "100%", zIndex: 9999 }}>
      
      {/* Sidebar Section */}
      <div style={{ width: "260px", backgroundColor: "#1a202c", color: "white", padding: "20px" }}>
        <h2 style={{ color: "#4fd1c5", marginBottom: "40px", textAlign: "center" }}>CLA ADMIN</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button onClick={() => setActiveTab("orders")} style={{ padding: "12px", border: "none", borderRadius: "8px", textAlign: "left", cursor: "pointer", backgroundColor: activeTab === "orders" ? "#4fd1c5" : "transparent", color: activeTab === "orders" ? "#1a202c" : "white", fontWeight: "bold" }}> 📦 Orders View </button>
          <button onClick={() => setActiveTab("feedback")} style={{ padding: "12px", border: "none", borderRadius: "8px", textAlign: "left", cursor: "pointer", backgroundColor: activeTab === "feedback" ? "#4fd1c5" : "transparent", color: activeTab === "feedback" ? "#1a202c" : "white", fontWeight: "bold" }}> 💬 Customer Feedback </button>
          <hr style={{ border: "0.1px solid #2d3748", margin: "20px 0" }} />
          <Link to="/" style={{ color: "#a0aec0", textDecoration: "none", padding: "10px", fontSize: "14px" }}>🏠 Back to Main Site</Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
          <h1 style={{ margin: 0, color: "#2d3748" }}>{activeTab === "orders" ? "Orders Management" : "Feedback & Messages"}</h1>
          <button onClick={fetchData} style={{ padding: "8px 15px", borderRadius: "5px", cursor: "pointer", backgroundColor: "#fff", border: "1px solid #cbd5e0" }}>🔄 Refresh Data</button>
        </header>

        <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          {activeTab === "orders" ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #edf2f7", color: "#718096" }}>
                  <th style={{ padding: "12px" }}>Customer</th>
                  <th>Amount</th>
                  <th>Proof</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: "1px solid #edf2f7" }}>
                    <td style={{ padding: "15px" }}><strong>{order.customerName}</strong><br/><small>{order.city}</small></td>
                    <td style={{ fontWeight: "bold" }}>PKR {order.total}</td>
                    <td>
                      {order.screenshot ? (
                        <a href={`http://localhost:5000/${order.screenshot.replace(/\\/g, "/")}`} target="_blank" rel="noreferrer">
                          <img src={`http://localhost:5000/${order.screenshot.replace(/\\/g, "/")}`} width="40" height="40" style={{objectFit: "cover", borderRadius: "4px"}} alt="proof"/>
                        </a>
                      ) : "N/A"}
                    </td>
                    <td>
                      <select 
                        value={order.status || "Pending"} 
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        style={{ padding: "5px", borderRadius: "5px", border: "1px solid #cbd5e0", fontSize: "12px" }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Dispatched">In process</option>
                        <option value="Delivered">Dispatched</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => deleteOrder(order._id)} style={{ border: "none", background: "none", cursor: "pointer", color: "#e53e3e" }}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #edf2f7", color: "#718096" }}>
                  <th style={{ padding: "12px" }}>Sender</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map(f => (
                  <tr key={f._id} style={{ borderBottom: "1px solid #edf2f7" }}>
                    <td style={{ padding: "15px" }}><strong>{f.name}</strong><br/><small>{f.email}</small></td>
                    <td style={{ maxWidth: "300px", fontSize: "14px" }}>{f.message}</td>
                    <td>
                      <button onClick={() => deleteFeedback(f._id)} style={{ border: "none", background: "none", cursor: "pointer", color: "#e53e3e" }}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;