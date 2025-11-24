import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { FaKey, FaArrowLeft } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");
    try {
      await api.post("/Auth/forgot-password", { email });
      setStatus("success");
      setMessage("Check your email for the reset link.");
    } catch (err) {
      if (err?.response?.status === 404) {
         setStatus("warning"); // Server endpoint missing
         setMessage("Reset feature unavailable. Contact Admin.");
      } else {
         setStatus("error");
         setMessage("Failed to send request.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div className="bg-white p-5 rounded-4 shadow-sm text-center" style={{ width: 450 }}>
        <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle d-inline-block mb-3">
           <FaKey size={24} />
        </div>
        <h3 className="fw-bold mb-2">Forgot Password?</h3>
        <p className="text-secondary mb-4 small">No worries, we'll send you reset instructions.</p>

        <form onSubmit={handleSubmit}>
          <div className="text-start mb-3">
             <label className="form-label fw-bold small">Email</label>
             <input type="email" required className="form-control bg-light border-0 py-2" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-4 rounded-3">Reset Password</button>
          
          {message && <div className={`alert alert-${status === 'success' ? 'success' : status === 'warning' ? 'warning' : 'danger'} small`}>{message}</div>}
          
          <Link to="/signin" className="text-secondary small text-decoration-none d-flex align-items-center justify-content-center gap-2">
             <FaArrowLeft /> Back to log in
          </Link>
        </form>
      </div>
    </div>
  );
}