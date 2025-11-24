import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api";
import { FaUserPlus, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      await register({ fullName: username, email, password });
      setMsg("success");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div className="bg-white p-5 rounded-4 shadow-sm" style={{ width: "500px", maxWidth: "95%" }}>
        <div className="text-center mb-4">
           <h3 className="fw-bold mb-1">Create Account</h3>
           <p className="text-secondary">Join Grand Hotel family today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
             <label className="form-label fw-semibold small">Full Name</label>
             <div className="input-group">
                <span className="input-group-text bg-light border-0"><FaUser className="text-muted"/></span>
                <input type="text" className="form-control bg-light border-0 py-2" placeholder="John Doe" value={username} onChange={(e) => setUsername(e.target.value)} required />
             </div>
          </div>

          <div className="mb-3">
             <label className="form-label fw-semibold small">Email Address</label>
             <div className="input-group">
                <span className="input-group-text bg-light border-0"><FaEnvelope className="text-muted"/></span>
                <input type="email" className="form-control bg-light border-0 py-2" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
             </div>
          </div>

          <div className="mb-4">
             <label className="form-label fw-semibold small">Password</label>
             <div className="input-group">
                <span className="input-group-text bg-light border-0"><FaLock className="text-muted"/></span>
                <input type="password" className="form-control bg-light border-0 py-2" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
             </div>
          </div>

          <button type="submit" className="btn w-100 text-white fw-semibold mb-3 py-2 rounded-3 shadow-sm" style={{ backgroundColor: "#7c3aed" }} disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {msg === "success" && <div className="alert alert-success text-center">Account created! Redirecting...</div>}
        {msg && msg !== "success" && <div className="alert alert-danger text-center">{msg}</div>}

        <p className="text-center small mb-0 mt-4">Already have an account? <Link to="/signin" className="text-primary fw-bold text-decoration-none">Sign in</Link></p>
      </div>
    </div>
  );
}